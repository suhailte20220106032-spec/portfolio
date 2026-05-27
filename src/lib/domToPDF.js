/**
 * domToPDF v1.3.0
 * Client-side DOM → PDF engine using getBoundingClientRect() + jsPDF
 * No canvas, no screenshots — real text vectors, ATS-friendly output
 *
 * Usage:

  // Mark card entries for page-break protection
  // Targets elements with print:page-break-inside-avoid — only leadership/internship entries
  clone.querySelectorAll('[class*="page-break-inside-avoid"]').forEach((el, i) => {
    el.setAttribute('data-pdf-card', String(i + 1));
  });
 *   import { domToPDF } from './domtopdf.js';
 *   domToPDF(document.getElementById('cv-content'), 'MyCV.pdf');
 *
 * Requires: jsPDF (npm install jspdf)
 *
 * Changelog:
 *   v1.3.0 — Custom font embedding via @font-face scan and jsPDF addFont
 *   v1.1.0 — Theme reset before capture (fixes dark mode), tighter margins,
 *             improved text-clip guard, scrollTop offset fix, color override mode
 *   v1.0.0 — Initial release
 */

import { jsPDF } from 'jspdf';
import { svg2pdf } from 'svg2pdf.js';

// ─── Constants ────────────────────────────────────────────────────────────────

const A4 = { w: 210, h: 297 };                            // mm
const MARGIN = { top: 12, right: 12, bottom: 12, left: 12 }; // mm
const PX_TO_MM = 0.264583;                                      // 1px = 0.264583mm at 96dpi
const PAGE_CONTENT_H = A4.h - MARGIN.top - MARGIN.bottom;
const FONT_SCALE = 0.94;
const HEADING_PAGE_BUFFER = 5;
const SECTION_GAP = 4;
const fontDataCache = new Map();
const embeddedFontFamilies = new Map();
const emojiImageCache = new Map();
const LEADING_ICON_EMOJI = /^(?:\s*)(\u{1F4CD}|\u{1F4E7}|\u{1F4F1})\s*/u;

// Tags we never render
const SKIP_TAGS = new Set([
  'SCRIPT', 'STYLE', 'NOSCRIPT', 'HEAD', 'META', 'LINK',
  'CANVAS', 'VIDEO', 'AUDIO', 'IFRAME',
  'NAV', 'FOOTER', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA',
]);

// Return true for nodes that are hidden in print/PDF output.
function hasDirectText(el) {
  return Array.from(el.childNodes).some(
    n => n.nodeType === 3 && n.textContent.trim().length > 0
  );
}

// Treat common content tags as leaves so their text can be rendered directly.
function isLeaf(tag, el) {
  const staticLeafs = new Set([
    'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
    'LI', 'TD', 'TH', 'LABEL', 'TIME', 'BLOCKQUOTE',
  ]);
  if (staticLeafs.has(tag)) return true;

  const inlineLeafs = new Set(['SPAN', 'STRONG', 'EM', 'A', 'SMALL']);
  if (inlineLeafs.has(tag)) {
    const parentTag = el.parentElement?.tagName?.toUpperCase();
    return !staticLeafs.has(parentTag) && !inlineLeafs.has(parentTag);
  }

  return false;
}

function shouldSkipBackground(el, hasBorder) {
  if (!hasBorder) return false;
  const className = typeof el.className === 'string' ? el.className : '';
  return /(?:^|\s)bg-(card|primary)(?:\/\d+)?(?:\s|$)/.test(className);
}

// Screen-only utilities are ignored so the PDF mirrors the print layout.
function isPrintHidden(el) {
  if (!el || el.nodeType !== 1) return false;
  if (el.classList?.contains('print:hidden') || el.classList?.contains('no-print')) {
    return true;
  }
  const className = typeof el.className === 'string' ? el.className : '';
  return className.includes('print:hidden') || className.includes('no-print');
}

// ─── Theme reset helpers ──────────────────────────────────────────────────────

// Clone the target into a hidden wrapper and force light theme values for capture.
function prepareOffscreenClone(rootEl) {
  const clone = rootEl.cloneNode(true);

  const wrapper = document.createElement('div');
  wrapper.style.cssText = [
    'position:fixed',
    'top:0',
    'left:0',
    'width:' + rootEl.offsetWidth + 'px',
    'opacity:0',
    'pointer-events:none',
    'z-index:-9999',
    'color-scheme:light',
    'background:#ffffff',
  ].join(';');

  // Force light mode on the clone
  clone.classList.remove('dark');
  clone.style.colorScheme = 'light';
  clone.removeAttribute('data-theme');

  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);
  wrapper.classList.add('pdf-exporting');

  return {
    el: clone,
    cleanup: () => document.body.removeChild(wrapper),
  };
}

// ─── Colour helpers ───────────────────────────────────────────────────────────

// Convert CSS color strings into RGB objects so jsPDF can paint them.
function parseCSSColor(cssColor) {
  if (!cssColor || cssColor === 'transparent' || cssColor === 'rgba(0, 0, 0, 0)') return null;
  const c = document.createElement('canvas');
  c.width = c.height = 1;
  const ctx = c.getContext('2d');
  ctx.fillStyle = cssColor;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  if (a < 10) return null; // nearly transparent — skip
  return { r, g, b };
}

function isNearWhite({ r, g, b }) {
  return r > 240 && g > 240 && b > 240;
}

function isNearBlack({ r, g, b }) {
  return r < 30 && g < 30 && b < 30;
}

// Map CSS font-family stacks to fonts that jsPDF can actually use.
function mapFontFamily(fontFamily) {
  const families = (fontFamily || '').split(',');
  for (const raw of families) {
    const name = raw.trim().replace(/^['"]|['"]$/g, '');
    if (!name) continue;
    const lower = name.toLowerCase();
    if (embeddedFontFamilies.has(lower)) return embeddedFontFamilies.get(lower);
    if (lower.includes('serif')) return 'times';
    if (lower.includes('mono')) return 'courier';
    if (lower.includes('sans')) return 'helvetica';
  }
  return 'helvetica';
}

function applyTextTransform(text, transform) {
  if (!transform || transform === 'none') return text;
  if (transform === 'uppercase') return text.toUpperCase();
  if (transform === 'lowercase') return text.toLowerCase();
  if (transform === 'capitalize') {
    return text.replace(/\b(\p{L})/gu, (m) => m.toUpperCase());
  }
  return text;
}

// Detect leading location/email/phone emojis so they can be rendered separately.
function extractLeadingEmoji(text) {
  const match = text.match(LEADING_ICON_EMOJI);
  if (!match) return null;
  return {
    emoji: match[1],
    text: text.slice(match[0].length),
  };
}

function buildCanvasFont(cs, sizePx) {
  const style = cs.fontStyle || 'normal';
  const weight = cs.fontWeight || 'normal';
  const family = cs.fontFamily || 'sans-serif';
  return `${style} ${weight} ${sizePx}px ${family}`;
}

let measureCtx;
// Shared canvas context used only for measuring text and emoji widths.
function getMeasureContext() {
  if (!measureCtx) {
    const canvas = document.createElement('canvas');
    measureCtx = canvas.getContext('2d');
  }
  return measureCtx;
}

function getEmojiDataUrl(icon) {
  const key = `${icon.char}|${icon.font}|${icon.sizePx}`;
  if (emojiImageCache.has(key)) return emojiImageCache.get(key);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = icon.font;
  const metrics = ctx.measureText(icon.char);
  const width = Math.max(1, Math.ceil(metrics.width || icon.sizePx));
  const height = Math.max(1, Math.ceil(icon.sizePx * 1.2));

  canvas.width = width;
  canvas.height = height;

  ctx.font = icon.font;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(icon.char, 0, icon.sizePx);

  const dataUrl = canvas.toDataURL('image/png');
  emojiImageCache.set(key, dataUrl);
  return dataUrl;
}

// Assign stable section IDs so all nodes inside the same <section> can move together.
function createSectionIdTracker() {
  const sectionIds = new WeakMap();
  let counter = 0;

  return (el) => {
    const sectionEl = el.closest ? el.closest('section') : null;
    if (!sectionEl) return null;
    if (!sectionIds.has(sectionEl)) {
      counter += 1;
      sectionIds.set(sectionEl, counter);
    }
    return sectionIds.get(sectionEl);
  };
}

// Keep a section heading from landing at the very bottom of a page.
function applyHeadingBreaks(nodes) {
  const sectionHeadings = new Map();

  for (const node of nodes) {
    if (!node.sectionId || !node.isHeading) continue;
    const prev = sectionHeadings.get(node.sectionId);
    if (!prev || node.y < prev.y) {
      sectionHeadings.set(node.sectionId, node);
    }
  }

  if (sectionHeadings.size === 0) return;

  const shifts = new Map();
  for (const [sectionId, headingNode] of sectionHeadings) {
    const pageIndex = Math.floor((headingNode.y - MARGIN.top) / PAGE_CONTENT_H);
    const pageStart = MARGIN.top + pageIndex * PAGE_CONTENT_H;
    const offset = headingNode.y - pageStart;

    if (offset > PAGE_CONTENT_H - HEADING_PAGE_BUFFER) {
      // Push to next page top — full remaining distance to page bottom,
      // plus MARGIN.top so heading starts cleanly at the top of the new page
      const distToPageBottom = PAGE_CONTENT_H - offset;
      const shift = distToPageBottom + MARGIN.top;
      shifts.set(sectionId, shift);
    }
  }

  if (shifts.size === 0) return;

  for (const node of nodes) {
    if (node.sectionId === null || node.sectionId === undefined) continue;
    const shift = shifts.get(node.sectionId);
    if (shift) {
      node.y += shift;
    }
  }
}

// Keep each section block together and move it as one unit when needed.
function applyCardBreaks(nodes) {
  const sectionGroups = new Map();

  for (const node of nodes) {
    if (node.sectionId === null || node.sectionId === undefined) continue;

    if (!sectionGroups.has(node.sectionId)) {
      sectionGroups.set(node.sectionId, []);
    }

    sectionGroups.get(node.sectionId).push(node);
  }

  if (sectionGroups.size === 0) return;

  const shifts = new Map();

  for (const [sectionId, sectionNodes] of sectionGroups) {
    const top = Math.min(...sectionNodes.map((node) => node.y));
    const bottom = Math.max(...sectionNodes.map((node) => node.y + (node.h || 0)));
    const height = bottom - top;

    if (height > PAGE_CONTENT_H) continue;

    const pageIndex = Math.floor((top - MARGIN.top) / PAGE_CONTENT_H);
    const pageStart = MARGIN.top + pageIndex * PAGE_CONTENT_H;
    const pageEnd = pageStart + PAGE_CONTENT_H;
    const offset = top - pageStart;

    if (bottom > pageEnd || offset > PAGE_CONTENT_H - HEADING_PAGE_BUFFER) {
      const shift = pageEnd - top;
      shifts.set(sectionId, shift);
    }
  }

  if (shifts.size === 0) return;

  for (const node of nodes) {
    const shift = shifts.get(node.sectionId);
    if (shift) {
      node.y += shift;
    }
  }
}

// Resolve accidental collisions after all section shifting is finished.
function resolveOverlaps(nodes) {
  const groups = new Map();

  nodes.forEach((node, index) => {
    const key = node.sectionId === null || node.sectionId === undefined
      ? `node:${index}`
      : `section:${node.sectionId}`;

    if (!groups.has(key)) {
      groups.set(key, {
        key,
        nodes: [],
        top: Infinity,
        bottom: -Infinity,
        order: index,
      });
    }

    const group = groups.get(key);
    group.nodes.push(node);
    group.top = Math.min(group.top, node.y);
    group.bottom = Math.max(group.bottom, node.y + (node.h || 0));
    group.order = Math.min(group.order, index);
  });

  const orderedGroups = Array.from(groups.values()).sort((a, b) => {
    if (a.top !== b.top) return a.top - b.top;
    return a.order - b.order;
  });

  let cursor = MARGIN.top;

  for (const group of orderedGroups) {
    const pageStart = MARGIN.top + Math.floor((group.top - MARGIN.top) / PAGE_CONTENT_H) * PAGE_CONTENT_H;
    const needsSectionGap = group.top > pageStart + 0.1;

    if (needsSectionGap && cursor > pageStart + 0.1) {
      const gapTarget = cursor + SECTION_GAP;
      if (group.top < gapTarget) {
        const gapShift = gapTarget - group.top;
        for (const node of group.nodes) {
          node.y += gapShift;
        }
        group.top += gapShift;
        group.bottom += gapShift;
      }
    }

    if (group.top < cursor) {
      const shift = cursor - group.top;
      for (const node of group.nodes) {
        node.y += shift;
      }
      group.bottom += shift;
      group.top += shift;
    }

    cursor = Math.max(cursor, group.bottom);
  }
}

function normalizeFontFamilyName(value) {
  return (value || '').trim().replace(/^['"]|['"]$/g, '');
}

function getFontExt(url) {
  if (!url || url.startsWith('data:')) return '';
  const clean = url.split('?')[0].split('#')[0];
  const idx = clean.lastIndexOf('.');
  return idx >= 0 ? clean.slice(idx + 1).toLowerCase() : '';
}

function isSupportedFont(format, url) {
  const ext = getFontExt(url);
  if (ext === 'ttf' || ext === 'otf') return true;
  if (format === 'truetype' || format === 'opentype') return true;
  return false;
}

function parseFontFaceSrc(src) {
  if (!src) return null;
  const parts = src.split(',');
  let fallback = null;

  for (const part of parts) {
    const urlMatch = part.match(/url\(([^)]+)\)/i);
    if (!urlMatch) continue;

    const rawUrl = urlMatch[1].trim().replace(/^['"]|['"]$/g, '');
    const formatMatch = part.match(/format\(['"]?([^'"\)]+)['"]?\)/i);
    const format = formatMatch ? formatMatch[1].toLowerCase() : '';
    const candidate = { url: rawUrl, format };

    if (!fallback) fallback = candidate;
    if (isSupportedFont(format, rawUrl)) return candidate;
  }

  return fallback;
}

function getFontStyleKey(weight, style) {
  const weightNum = parseInt(weight, 10);
  const isBold = !Number.isNaN(weightNum)
    ? weightNum >= 600
    : /bold/i.test(weight || '');
  const isItalic = /italic/i.test(style || '');

  if (isBold && isItalic) return 'bolditalic';
  if (isBold) return 'bold';
  if (isItalic) return 'italic';
  return 'normal';
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = '';

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }

  return btoa(binary);
}

// Fetch a font file, normalize it to base64, and cache the result.
async function loadFontData(url, format) {
  if (!url) return null;
  if (fontDataCache.has(url)) return fontDataCache.get(url);

  if (url.startsWith('data:')) {
    const base64Index = url.indexOf('base64,');
    if (base64Index === -1) return null;
    const base64 = url.slice(base64Index + 7);
    const mime = url.slice(5, url.indexOf(';'));
    const ext = mime.includes('opentype')
      ? 'otf'
      : mime.includes('truetype')
        ? 'ttf'
        : '';
    const data = { base64, ext };
    fontDataCache.set(url, data);
    return data;
  }

  const res = await fetch(url);
  if (!res.ok) return null;
  const buffer = await res.arrayBuffer();
  const base64 = arrayBufferToBase64(buffer);
  const ext = getFontExt(url) || (format === 'opentype' ? 'otf' : 'ttf');
  const data = { base64, ext };
  fontDataCache.set(url, data);
  return data;
}

// Scan all stylesheets for @font-face rules so local fonts can be embedded.
function collectFontFaces() {
  const faces = [];
  const sheets = Array.from(document.styleSheets || []);
  const fontFaceRuleType = typeof CSSRule !== 'undefined' ? CSSRule.FONT_FACE_RULE : 5;

  for (const sheet of sheets) {
    let rules = [];
    try {
      rules = sheet.cssRules || [];
    } catch (err) {
      continue;
    }

    for (const rule of Array.from(rules)) {
      if (rule.type !== fontFaceRuleType) continue;
      const style = rule.style;
      if (!style) continue;

      const family = normalizeFontFamilyName(style.getPropertyValue('font-family'));
      const src = style.getPropertyValue('src');
      const weight = style.getPropertyValue('font-weight') || '400';
      const fontStyle = style.getPropertyValue('font-style') || 'normal';
      const parsed = parseFontFaceSrc(src);
      if (!family || !parsed) continue;

      faces.push({
        family,
        weight,
        style: fontStyle,
        url: parsed.url,
        format: parsed.format,
      });
    }
  }

  return faces;
}

// Load each discovered font into jsPDF before rendering starts.
async function embedFonts(doc) {
  const faces = collectFontFaces();

  await Promise.all(faces.map(async (face) => {
    if (!isSupportedFont(face.format, face.url)) return;

    const data = await loadFontData(face.url, face.format);
    if (!data || !data.base64) return;

    const styleKey = getFontStyleKey(face.weight, face.style);
    const fileName = `${face.family}-${styleKey}.${data.ext || 'ttf'}`;
    const fontList = doc.getFontList();
    const familyEntry = fontList[face.family] || [];

    if (!familyEntry.includes(styleKey)) {
      doc.addFileToVFS(fileName, data.base64);
      doc.addFont(fileName, face.family, styleKey);
    }

    embeddedFontFamilies.set(face.family.toLowerCase(), face.family);
  }));
}

// ─── Unit helpers ─────────────────────────────────────────────────────────────

// Convert px to mm using the document scale.
function pxToMm(px) {
  return px * PX_TO_MM;
}

// ─── Core walker ──────────────────────────────────────────────────────────────

/**
 * Walk the cloned DOM and convert it into draw commands for jsPDF.
 * The walker records boxes, borders, text, icons, section IDs, and card IDs.
 */
function collectNodes(rootEl) {
  const rootRect = rootEl.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const nodes = [];
  const contentW = A4.w - MARGIN.left - MARGIN.right;
  const rootWmm = rootRect.width * PX_TO_MM;
  const scale = rootWmm > 0 ? contentW / rootWmm : 1;
  const pxToMmScaled = (px) => px * PX_TO_MM * scale;
  const getSectionId = createSectionIdTracker();

  // Recursively walk the DOM tree and emit renderable nodes.
  function walk(el, inCard, inheritedCardId = null) {
    if (!el || el.nodeType !== 1) return;

    const tag = el.tagName.toUpperCase();
    if (SKIP_TAGS.has(tag)) return;
    if (isPrintHidden(el)) return;

    const sectionId = getSectionId(el);
    const cardId = el.getAttribute?.('data-pdf-card') ?? inheritedCardId;

    // Guard: some elements (SVG children etc.) don't support getComputedStyle
    if (!('style' in el)) return;

    const cs = window.getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return;

    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return;

    // Convert to document-relative mm coordinates
    const x = pxToMmScaled(rect.left - rootRect.left) + MARGIN.left;
    const absY = pxToMmScaled(rect.top - rootRect.top) + MARGIN.top;
    const w = pxToMmScaled(rect.width);
    const h = pxToMmScaled(rect.height);

    if (tag === 'SVG') {
      nodes.push({ type: 'svg', el, x, y: absY, w, h, sectionId, cardId });
      return;
    }

    const radius = parseBorderRadius(cs);

    const borders = parseBorders(cs);
    const hasBorder = !!borders;
    const skipBackground = shouldSkipBackground(el, hasBorder);

    // ── Background ────────────────────────────────────────────────────────────
    const bgColor = parseCSSColor(cs.backgroundColor);
    const className = typeof el.className === 'string' ? el.className : '';
    const isInline = cs.display === 'inline' || cs.display === 'inline-flex' || cs.display === 'inline-block';
    const isCardLike = radius > 0.5 && (hasBorder || (bgColor && !isNearWhite(bgColor)));
    const isBadgeLike = /(?:^|\s)bg-\w+(?:\/\d+)?(?:\s|$)/.test(className) && /(?:^|\s)rounded/.test(className);
    const suppressBox = isBadgeLike || (inCard && (isCardLike || isBadgeLike || (isInline && bgColor)));

    if (bgColor && !isNearWhite(bgColor) && (hasBorder || hasDirectText(el)) && !skipBackground && !suppressBox) {
      // Only draw non-white backgrounds — avoids flooding the page with white rects
      nodes.push({ type: 'rect', x, y: absY, w, h, color: bgColor, radius, sectionId, cardId });
    }

    // ── Borders ───────────────────────────────────────────────────────────────
    if (borders && !suppressBox) {
      nodes.push({ type: 'border', x, y: absY, w, h, borders, radius, sectionId, cardId });
    }

    // ── Text (leaf nodes only) ────────────────────────────────────────────────
    if (isLeaf(tag, el)) {
      const rawText = el.innerText || '';
      const trimmedText = rawText.trim();
      if (trimmedText) {
        const iconMatch = extractLeadingEmoji(trimmedText);
        const textWithoutIcon = iconMatch ? iconMatch.text : trimmedText;
        let color = parseCSSColor(cs.color) || { r: 0, g: 0, b: 0 };

        // Dark mode guard: if text color is near-white, override to black
        // (means dark theme wasn't fully stripped — safe fallback)
        if (isNearWhite(color)) color = { r: 17, g: 17, b: 17 };

        const fontSizePx = parseFloat(cs.fontSize) || 0;
        const fontSize = pxToMmScaled(fontSizePx) * 2.835 * FONT_SCALE; // px → pt
        const fontWeight = parseInt(cs.fontWeight) >= 600 ? 'bold' : 'normal';
        const fontStyle = cs.fontStyle === 'italic' ? 'italic' : 'normal';
        const align = cs.textAlign === 'center' ? 'center'
          : cs.textAlign === 'right' ? 'right'
            : 'left';
        const fontFamily = mapFontFamily(cs.fontFamily);
        const isHeading = /^H[1-6]$/.test(tag);
        const noWrap = isHeading || cs.whiteSpace === 'nowrap' || isBadgeLike;

        const padL = pxToMmScaled(parseFloat(cs.paddingLeft) || 0);
        const padT = pxToMmScaled(parseFloat(cs.paddingTop) || 0);
        const padR = pxToMmScaled(parseFloat(cs.paddingRight) || 0);

        // lineHeight: prefer computed px value, fall back to 1.2× fontSize
        const rawLH = parseFloat(cs.lineHeight);
        const lineHeightPx = isNaN(rawLH)
          ? parseFloat(cs.fontSize) * 1.2
          : rawLH;
        const lineHeight = pxToMmScaled(lineHeightPx);

        // Clamp text maxW to page right edge
        const rightEdge = A4.w - MARGIN.right;
        const clampedMaxW = Math.min(w - padL - padR, rightEdge - (x + padL));

        let icon = null;
        let iconOffset = 0;
        if (iconMatch) {
          const ctx = getMeasureContext();
          const font = buildCanvasFont(cs, fontSizePx);
          ctx.font = font;
          const emojiWidthPx = ctx.measureText(iconMatch.emoji).width || fontSizePx;
          const spaceWidthPx = ctx.measureText(' ').width || fontSizePx * 0.25;
          const iconWidthMm = pxToMmScaled(emojiWidthPx);
          const iconHeightMm = pxToMmScaled(fontSizePx);
          const iconGapMm = pxToMmScaled(spaceWidthPx);

          icon = {
            char: iconMatch.emoji,
            font,
            sizePx: fontSizePx,
            widthMm: iconWidthMm,
            heightMm: iconHeightMm,
            gapMm: iconGapMm,
            x: x + padL,
          };

          iconOffset = iconWidthMm + iconGapMm;
        }

        const textX = x + padL + iconOffset;
        const textMaxW = Math.max(clampedMaxW - iconOffset, 10);

        nodes.push({
          type: 'text',
          text: applyTextTransform(textWithoutIcon, cs.textTransform),
          x: textX,
          y: absY + padT,
          maxW: textMaxW, // floor at 10mm to prevent zero-width wrap
          fontSize: Math.max(fontSize, 7),         // floor at 7pt
          fontWeight,
          fontStyle,
          fontFamily,
          noWrap,
          isHeading,
          icon,
          color,
          align,
          lineHeight,
          sectionId,
          cardId,
        });
      }
      return; // don't recurse — innerText already covers all children
    }

    // ── Recurse into containers ───────────────────────────────────────────────
    const nextInCard = inCard || isCardLike;
    Array.from(el.childNodes).forEach(child => walk(child, nextInCard, cardId));
  }

  walk(rootEl, false);
  return nodes;
}

// ─── CSS parsers ──────────────────────────────────────────────────────────────

// Convert CSS border-radius into mm so rounded boxes match the DOM.
function parseBorderRadius(cs) {
  const r = parseFloat(cs.borderTopLeftRadius) || 0;
  return pxToMm(r);
}

// Read the four border sides and convert them into jsPDF draw instructions.
function parseBorders(cs) {
  const sides = ['Top', 'Right', 'Bottom', 'Left'];
  let hasBorder = false;
  const result = {};

  for (const side of sides) {
    const width = parseFloat(cs[`border${side}Width`]) || 0;
    const style = cs[`border${side}Style`];
    const color = parseCSSColor(cs[`border${side}Color`]);

    if (width > 0 && style !== 'none' && color) {
      result[side.toLowerCase()] = { width: pxToMm(width), color };
      hasBorder = true;
    }
  }

  return hasBorder ? result : null;
}

// ─── PDF renderer ─────────────────────────────────────────────────────────────

// Render the collected nodes page by page onto a jsPDF document.
async function renderToPDF(nodes, filename, docInstance) {
  const doc = docInstance || new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  const totalH = Math.max(...nodes.map(n => n.y + (n.h || 0)), A4.h);
  const pageCount = Math.ceil((totalH - MARGIN.top) / PAGE_CONTENT_H);

  for (let page = 0; page < Math.max(pageCount, 1); page++) {
    if (page > 0) doc.addPage();

    const pageYOffset = page * PAGE_CONTENT_H;
    const pageYMin = MARGIN.top + pageYOffset;
    const pageYMax = pageYMin + PAGE_CONTENT_H;

    for (const node of nodes) {
      const nodeBottom = node.y + (node.h || 0);

      // Skip nodes entirely outside this page
      if (nodeBottom < pageYMin || node.y >= pageYMax) continue;

      // Y relative to this page's top
      const y = node.y - pageYOffset;

      switch (node.type) {

        case 'svg': {
          try {
            await svg2pdf(node.el, doc, {
              x: node.x,
              y,
              width: node.w,
              height: node.h,
            });
          } catch (err) {
            console.error('[domToPDF] SVG render failed:', err);
          }
          break;
        }

        case 'rect': {
          const { r, g, b } = node.color;
          doc.setFillColor(r, g, b);
          doc.setDrawColor(r, g, b);
          if (node.radius > 0.5) {
            doc.roundedRect(node.x, y, node.w, node.h, node.radius, node.radius, 'F');
          } else {
            doc.rect(node.x, y, node.w, node.h, 'F');
          }
          break;
        }

        case 'border': {
          const b = node.borders;
          const sample = b.top || b.right || b.bottom || b.left;
          if (!sample) break;

          if (node.radius > 0.5) {
            // Uniform rounded stroke
            const { r, g, b: blue } = sample.color;
            doc.setDrawColor(r, g, blue);
            doc.setLineWidth(Math.max(sample.width, 0.1));
            doc.roundedRect(node.x, y, node.w, node.h, node.radius, node.radius, 'S');
          } else {
            // Per-side lines
            const drawLine = (side, x1, y1, x2, y2) => {
              if (!b[side]) return;
              const { r, g, b: blue } = b[side].color;
              doc.setDrawColor(r, g, blue);
              doc.setLineWidth(Math.max(b[side].width, 0.1));
              doc.line(x1, y1, x2, y2);
            };
            drawLine('top', node.x, y, node.x + node.w, y);
            drawLine('bottom', node.x, y + node.h, node.x + node.w, y + node.h);
            drawLine('left', node.x, y, node.x, y + node.h);
            drawLine('right', node.x + node.w, y, node.x + node.w, y + node.h);
          }
          break;
        }

        case 'text': {
          const { r, g, b: blue } = node.color;
          doc.setTextColor(r, g, blue);
          doc.setFontSize(node.fontSize);

          const style =
            node.fontWeight === 'bold' && node.fontStyle === 'italic' ? 'bolditalic' :
              node.fontWeight === 'bold' ? 'bold' :
                node.fontStyle === 'italic' ? 'italic' :
                  'normal';

          doc.setFont(node.fontFamily || 'helvetica', style);

          const fontSizeMm = node.fontSize * 0.352778;
          const baseY = y + fontSizeMm * 0.8;

          if (node.icon) {
            try {
              const iconY = baseY - node.icon.heightMm * 0.8;
              const iconDataUrl = getEmojiDataUrl(node.icon);
              doc.addImage(iconDataUrl, 'PNG', node.icon.x, iconY, node.icon.widthMm, node.icon.heightMm);
            } catch (err) {
              console.error('[domToPDF] Emoji render failed:', err);
            }
          }

          if (node.noWrap) {
            let fontSize = node.fontSize;
            let textWidth = doc.getTextWidth(node.text);
            if (textWidth > node.maxW) {
              const scale = node.maxW / textWidth;
              fontSize = Math.max(fontSize * scale, 7);
              doc.setFontSize(fontSize);
              textWidth = doc.getTextWidth(node.text);
            }

            const fontSizeMm = fontSize * 0.352778;
            const baseY = y + fontSizeMm * 0.8;
            const xPos =
              node.align === 'center' ? node.x + node.maxW / 2 :
                node.align === 'right' ? node.x + node.maxW :
                  node.x;

            doc.text(node.text, xPos, baseY, { align: node.align });
            break;
          }

          const lines = doc.splitTextToSize(node.text, node.maxW);
          const lineHeightMm = Math.max(node.lineHeight, fontSizeMm * 1.2);

          lines.forEach((line, i) => {
            const lineY = baseY + i * lineHeightMm;

            // Don't draw below page boundary
            if (lineY > pageYMax - pageYOffset + 2) return;

            const xPos =
              node.align === 'center' ? node.x + node.maxW / 2 :
                node.align === 'right' ? node.x + node.maxW :
                  node.x;

            doc.text(line, xPos, lineY, { align: node.align });
          });
          break;
        }
      }
    }
  }

  doc.save(filename || 'document.pdf');
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * domToPDF(element, filename, options)
 *
 * @param {HTMLElement} element   - The DOM node to render
 * @param {string}      filename  - Output filename (default: 'document.pdf')
 * @param {object}      options
 *   @param {boolean}   options.resetTheme  - Force light mode before capture (default: true)
 *   @param {Function}  options.onDone      - Callback after save
 *   @param {Function}  options.onError     - Callback on error
 */
export function domToPDF(element, filename = 'document.pdf', options = {}) {
  const { onDone, onError } = options;

  if (!element) {
    const err = new Error('[domToPDF] Element not found');
    console.error(err.message);
    if (onError) onError(err);
    return;
  }

  const { el: cloneEl, cleanup } = prepareOffscreenClone(element);
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  // Pipeline: embed fonts -> wait for layout -> capture nodes -> render -> cleanup.
  // Step 1 — embed fonts before touching theme.
  embedFonts(doc).then(() => {
    // Step 2 — enter rAF so layout is stable.
    requestAnimationFrame(() => {
      const htmlEl = document.documentElement;
      const prevClass = htmlEl.className;
      const prevScheme = htmlEl.style.colorScheme;
      const prevTheme = htmlEl.getAttribute('data-theme');

      // Step 3 — strip dark mode (synchronous).
      htmlEl.classList.remove('dark');
      htmlEl.style.colorScheme = 'light';
      if (prevTheme === 'dark') htmlEl.setAttribute('data-theme', 'light');

      // Step 4 — read layout (synchronous).
      let nodes;
      try {
        nodes = collectNodes(cloneEl);
      } finally {
        // Step 5 — restore dark mode immediately, before any paint.
        htmlEl.className = prevClass;
        htmlEl.style.colorScheme = prevScheme;
        if (prevTheme !== null) htmlEl.setAttribute('data-theme', prevTheme);
        else htmlEl.removeAttribute('data-theme');
      }

      // Step 6 — render and save.
      applyHeadingBreaks(nodes);
      applyCardBreaks(nodes);
      resolveOverlaps(nodes);
      renderToPDF(nodes, filename, doc)
        .then(() => {
          embeddedFontFamilies.clear();
          cleanup();
          if (onDone) onDone();
        })
        .catch((err) => {
          embeddedFontFamilies.clear();
          cleanup();
          console.error('[domToPDF] Render failed:', err);
          if (onError) onError(err);
        });
    });

  }).catch((err) => {
    cleanup();
    console.error('[domToPDF] Font embed failed:', err);
    if (onError) onError(err);
  });
}

export default domToPDF;