# HOMEPAGE REDESIGN IMPLEMENTATION PLAN

**Date:** May 26, 2026  
**Target Audience:** Elite Engineering Professors & Academic Researchers  
**Goal:** Secure fully-funded Master's research position through portfolio website

---

## 📋 IMPLEMENTATION OVERVIEW

### **Core Strategy**
Transform homepage from **tech startup positioning** to **academic research positioning** by reframing narrative around hardware-software integration, systems architecture, and Smart Manufacturing research.

### **Key Changes**
1. Adjust Hero section TypeAnimation to academic terminology
2. Create new "About" section (3-card bridge narrative)
3. Redesign "Featured Projects" section (2-card research-focused layout)
4. Update Quick Stats to research credibility metrics
5. Create new `/resume` route for academic CV download
6. Restructure CTA from "Get In Touch" to "View Academic CV"

---

## 🔧 FILES TO CREATE

### **1. HomeAboutSection.tsx** (NEW)
**Path:** `src/components/home/HomeAboutSection.tsx`

**Purpose:** Display 3-card bridge narrative connecting textile engineering → systems architecture → research mindset

**Features:**
- 3 equal cards in responsive grid (1 col mobile, 3 cols desktop)
- Card 1: "Material Science → Digital Infrastructure"
- Card 2: "Hardware + Software + Data = Smart Systems"
- Card 3: "Research-Ready Mindset"
- Icons for visual hierarchy
- Dark mode support
- Tailwind styling with shadcn/ui Card component

---

### **2. HomeFeaturedProjects.tsx** (NEW)
**Path:** `src/components/home/HomeFeaturedProjects.tsx`

**Purpose:** Showcase NFC system and Event Management ecosystem as research-relevant projects

**Features:**
- 2-card grid layout (responsive)
- Project 1: "NFC Card Activation System" (hardware-software integration focus)
- Project 2: "Event Management Ecosystem" (scalable architecture focus)
- Each card includes:
  - Project image/placeholder
  - Category tag (badge)
  - Headline
  - 3-4 sentence technical description
  - Key insights (bullets)
  - "Learn More" button → /portfolio
- Dark mode support
- Tailwind styling with shadcn/ui components

---

### **3. HomeAcademicCTA.tsx** (NEW)
**Path:** `src/components/home/HomeAcademicCTA.tsx`

**Purpose:** Academic-focused call-to-action section

**Features:**
- Primary CTA: "View Academic CV & Resume" → `/resume`
- Secondary CTA: "View Full Portfolio" → `/portfolio`
- Tertiary CTA: "Get In Touch" → `/contact`
- Clear hierarchy
- Emphasis on academic readiness
- Tailwind styling

---

### **4. ResumePage.tsx** (NEW ROUTE)
**Path:** `src/app/resume/page.tsx`

**Purpose:** Clean, printable academic CV/Resume page

**Features:**
- Print-friendly styling
- No animations
- Professional academic layout
- Content sections:
  - Header (name, contact, tagline)
  - Professional Summary
  - Education
  - Technical Skills
  - Projects (focused on research relevance)
  - Leadership
  - Certifications/Achievements
- "Download PDF" button (future enhancement)
- Dark mode support but print-friendly

---

## ✏️ FILES TO MODIFY

### **1. src/app/page.tsx** (HOMEPAGE)
**Changes:**
- Update Hero TypeAnimation words:
  - Remove: "Sustainable Developer"
  - Add: "Hardware-Software Integrator" or "Systems Architect"
  - Update: "AI & Tech Enthusiast" → "AI & Research Enthusiast"
- Import new HomeAboutSection component
- Import new HomeFeaturedProjects component
- Import new HomeAcademicCTA component
- Add sections below Hero in this order:
  1. HomeAboutSection
  2. Quick Stats section (enhanced)
  3. HomeFeaturedProjects
  4. Skills section (reworded)
  5. HomeAcademicCTA
- Keep Footer as-is

---

### **2. src/components/home/ (NEW DIRECTORY)**
**Purpose:** Organize new homepage components

**Contents:**
- HomeAboutSection.tsx
- HomeFeaturedProjects.tsx
- HomeAcademicCTA.tsx
- (Optional) HomeSkillsSnapshot.tsx (if extracted)
- (Optional) HomeStatsSection.tsx (if extracted)

---

## 📊 SECTION-BY-SECTION CHANGES

### **HERO SECTION** (Minor Update)
**Current TypeAnimation:**
```typescript
sequence={[
  'Textile Engineer',
  2000,
  'Sustainable Developer',
  2000,
  'Learner',
  2000,
  'AI & Tech Enthusiast',
  2000,
]}
```

**Updated TypeAnimation:**
```typescript
sequence={[
  'Textile Engineer',
  2000,
  'Hardware-Software Integrator',
  2000,
  'Systems Architect',
  2000,
  'AI & Research Enthusiast',
  2000,
]}
```

---

### **ABOUT SECTION** (New Component)
**Location:** Below Hero, above Stats

**Component Structure:**
```
Card 1: Material Science Foundation
├─ Icon: 🔬
├─ Title: "Material Science → Digital Infrastructure"
├─ Content: Bridges textile understanding with digital systems

Card 2: Systems Integration
├─ Icon: ⚙️
├─ Title: "Hardware + Software + Data = Smart Systems"
├─ Content: Proves hardware-software integration capability

Card 3: Research Mindset
├─ Icon: 🎓
├─ Title: "Research-Ready Problem Solving"
├─ Content: Systems thinking, validation approach, research orientation
```

---

### **QUICK STATS SECTION** (Reworded)
**Current Stats → Updated Stats**

```
BEFORE:
- 2+ Years Leadership
- 40+ Student Delegates
- 200+ Users
- 10+ Technical Skills

AFTER:
- 200+ User Integration | NFC hardware-software system
- End-to-End Systems | ESP32 → Next.js → Supabase
- Manufacturing Focus | Real-world textile problems
- Multi-domain Expertise | Hardware, software, data
```

---

### **FEATURED PROJECTS SECTION** (New Component)
**Location:** Below Stats

**Project 1: NFC Card Activation System** (PRIMARY)
- Headline: "Physical-Digital Bridge: Real-time Hardware Integration at Scale"
- Key elements:
  - 200+ users managed
  - ESP32 hardware prototyping
  - Next.js + Supabase backend
  - Real-time data sync
  - Scalability validation

**Project 2: Event Management Ecosystem** (SECONDARY)
- Headline: "Scalable Digital Infrastructure Built for Complex Organizational Operations"
- Key elements:
  - 40+ organizations supported
  - Modular architecture
  - Budget-constrained optimization
  - Operational validation

---

### **SKILLS SECTION** (Language Update)
**Before:**
```
Web Development
Backend & Databases
Hardware & IoT
Design
```

**After:**
```
Systems & Architecture
Hardware-Software Integration
Data Infrastructure
AI & Automation
```

---

### **CTA SECTION** (Major Change)
**Before:**
```
[View My Work] → /portfolio
[Get In Touch] → /contact
```

**After:**
```
[View Academic CV & Resume] → /resume (PRIMARY)
[View Full Portfolio] → /portfolio (SECONDARY)
[Get In Touch] → /contact (TERTIARY)
```

---

### **NEW ROUTE: /resume**
**Path:** `src/app/resume/page.tsx`

**Content Structure:**
```
Header
├─ Name: Md. Suhail Mujtabir
├─ Tagline: Hardware-Software Integrator | Systems Architect
├─ Contact: Email, Phone, LinkedIn, GitHub

Professional Summary
├─ 3-4 sentences on systems architecture + textile engineering

Education
├─ AUST, BS Textile Engineering (Expected 2026)
├─ GPA/Honors

Technical Skills (By Domain)
├─ Systems & Architecture: Next.js, React, TypeScript, Scalable DBs
├─ Hardware-Software Integration: ESP32, NFC, Real-time Protocols
├─ Data Infrastructure: Supabase, PostgreSQL, API Design
├─ AI & Automation: ML Concepts, Python, Data Processing

Featured Projects
├─ NFC Card Activation System (hardware-software focus)
├─ Event Management Ecosystem (architecture focus)

Leadership & Academic Engagement
├─ AUST MUN Cell VP
├─ AATCC Student Chapter Chairperson

Certifications & Achievements
├─ [As applicable]
```

---

## 🎨 STYLING & DESIGN NOTES

### **Tailwind Classes Used**
- `grid grid-cols-1 md:grid-cols-3` - Responsive 3-column grid
- `rounded-lg border border-border/50` - Card styling
- `text-muted-foreground` - Secondary text color
- `font-semibold text-lg` - Card headlines
- `dark:` prefix for dark mode support
- `p-6 md:p-8` - Responsive padding
- `space-y-4` - Vertical spacing between elements

### **shadcn/ui Components Used**
- `Card` - Container for sections
- `Button` - CTA buttons
- `Badge` - Category tags on projects
- `Separator` - Visual dividers

### **Icons (lucide-react)**
- `Settings2` or `Zap` - Hardware icon
- `Database` - Data/backend icon
- `BookOpen` or `GraduationCap` - Research/academic icon
- `ArrowRight` - CTA button arrows
- `ExternalLink` - "Learn More" links

---

## 📱 RESPONSIVE DESIGN

### **Mobile (< 768px)**
- All grids stack to 1 column
- Reduced padding on cards
- Font sizes scale down
- CTAs stack vertically

### **Tablet (768px - 1024px)**
- 2-column grids where applicable
- Normal padding
- Full font sizes

### **Desktop (> 1024px)**
- 3-column grids (About section)
- 2-column grids (Projects section)
- Generous spacing
- Hover effects active

---

## 🎯 TONE & MESSAGING SUMMARY

| Section | Old Tone | New Tone |
|---------|----------|----------|
| **Hero** | "Sustainable Developer" | "Hardware-Software Integrator" |
| **About** | Business opportunity focus | Research capability focus |
| **Projects** | Tech portfolio showcase | Systems architecture validation |
| **Stats** | Business metrics | Credibility indicators |
| **CTA** | "Get In Touch" | "View Academic CV" |
| **Overall** | Startup positioning | Academic research positioning |

---

## ✅ IMPLEMENTATION CHECKLIST

- [x] Create `src/components/home/` directory
- [x] Build `HomeAboutSection.tsx` component
- [x] Build `HomeFeaturedProjects.tsx` component
- [x] Build `HomeAcademicCTA.tsx` component
- [x] Update `src/app/page.tsx` (Hero + import components + integrate sections)
- [x] Create `src/app/resume/page.tsx` (new route)
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test dark mode functionality
- [ ] Verify all links work (`/portfolio`, `/contact`, `/resume`)
- [ ] Review print styling for `/resume` page
- [ ] Quality assurance & final review

---

## 🔗 COMPONENT DEPENDENCIES

```
page.tsx (Homepage)
├─ Hero (existing, updated)
├─ HomeAboutSection (NEW)
├─ HomeStatsSection (existing, reworded)
├─ HomeFeaturedProjects (NEW)
├─ HomeSkillsSection (existing, reworded)
├─ HomeAcademicCTA (NEW)
└─ Footer (existing, unchanged)

resume/page.tsx (NEW ROUTE)
└─ Clean, printable layout
```

---

## 📝 FILES SUMMARY

**New Files Created:** 4
- `src/components/home/HomeAboutSection.tsx`
- `src/components/home/HomeFeaturedProjects.tsx`
- `src/components/home/HomeAcademicCTA.tsx`
- `src/app/resume/page.tsx`

**New Directories Created:** 1
- `src/components/home/`

**Files Modified:** 1
- `src/app/page.tsx`

**Total Changes:** 6 files (4 new, 1 modified, 1 directory created)

---

## 🚀 NEXT STEPS

1. ✅ Review this implementation plan
2. ✅ Proceed with code generation
3. ✅ Build components with Tailwind + shadcn/ui
4. ✅ Integrate into homepage
5. ⏳ Test across devices and browsers
6. ⏳ Deploy to production

---

---

## 🎯 IMPLEMENTATION SUMMARY

### ✅ COMPLETED DELIVERABLES

#### **New Components Created**
1. **HomeAboutSection.tsx** (`src/components/home/HomeAboutSection.tsx`)
   - 3-card responsive grid layout
   - Icons: Microscope, Zap, GraduationCap (lucide-react)
   - Bridge narrative: Material Science → Systems → Research
   - Dark mode support with hover effects

2. **HomeFeaturedProjects.tsx** (`src/components/home/HomeFeaturedProjects.tsx`)
   - 2-card responsive grid layout
   - Project 1: NFC Card Activation System (hardware-software focus)
   - Project 2: Event Management Ecosystem (scalable architecture focus)
   - Category badges, key insights, project descriptions
   - "Learn More" CTAs linking to /portfolio

3. **HomeAcademicCTA.tsx** (`src/components/home/HomeAcademicCTA.tsx`)
   - 3-card CTA hierarchy
   - Primary CTA: "View Academic CV & Resume" → /resume
   - Secondary CTA: "View Full Portfolio" → /portfolio
   - Tertiary CTA: "Get In Touch" → /contact
   - Research positioning footer message

#### **New Route Created**
4. **ResumePage.tsx** (`src/app/resume/page.tsx`)
   - Clean, print-friendly academic CV layout
   - Sections: Header, Summary, Education, Skills, Projects, Leadership, Internships, Research Interests
   - Print stylesheet included
   - Dark mode support with print optimization
   - Print button for easy paper output

#### **Files Modified**
5. **src/app/page.tsx** (Homepage)
   - Updated TypeAnimation with academic terminology:
     - "Textile Engineer" → kept
     - "Sustainable Developer" → "Hardware-Software Integrator"
     - "Learner" → "Systems Architect"
     - "AI & Tech Enthusiast" → "AI & Research Enthusiast"
   - Imported all three new components
   - Added HomeAboutSection below Hero
   - Added HomeFeaturedProjects below About
   - Added HomeAcademicCTA as CTA section
   - Updated Hero CTA buttons:
     - Primary: "View Academic CV" → /resume
     - Secondary: "View My Work" → /portfolio

#### **Directory Created**
- `src/components/home/` (new component directory)

---

## 📊 IMPLEMENTATION METRICS

| Item | Status | Notes |
|------|--------|-------|
| Components | 3 created | HomeAbout, HomeFeaturedProjects, HomeAcademicCTA |
| Routes | 1 created | /resume with print support |
| Files Modified | 1 modified | Homepage with integrated sections |
| Responsive Design | ✅ Implemented | Mobile (1 col), Tablet (auto), Desktop (3/2 cols) |
| Dark Mode | ✅ Implemented | Full theme support across all sections |
| Tailwind CSS | ✅ Used | Grid, spacing, typography, colors, gradients |
| shadcn/ui Components | ✅ Used | Card, Button, Badge, Separator |
| Academic Tone | ✅ Applied | All text reframed for research positioning |

---

## 🧪 TESTING CHECKLIST (Next Phase)

- [ ] **Desktop Testing**: Verify responsive grid layouts at 1920px, 1024px widths
- [ ] **Tablet Testing**: Verify layouts at 768px and 834px widths
- [ ] **Mobile Testing**: Verify single-column layouts at 375px and 480px widths
- [ ] **Dark Mode**: Toggle dark/light theme, verify contrast and visibility
- [ ] **Navigation Links**: Test all CTAs:
  - `/resume` - loads ResumePage properly
  - `/portfolio` - navigates to portfolio
  - `/contact` - navigates to contact page
- [ ] **Print Styling**: Test print preview for `/resume` page (no animations, clean layout)
- [ ] **Hover Effects**: Verify card hover states and button animations
- [ ] **Icons**: Confirm all lucide-react icons render properly
- [ ] **Typography**: Verify font sizes and spacing across all breakpoints
- [ ] **Performance**: Check page load performance and rendering speed
- [ ] **Accessibility**: Test keyboard navigation and screen reader compatibility

---

## 📁 FILES SUMMARY (FINAL)

**New Files:**
- `src/components/home/HomeAboutSection.tsx` (280 lines)
- `src/components/home/HomeFeaturedProjects.tsx` (210 lines)
- `src/components/home/HomeAcademicCTA.tsx` (200 lines)
- `src/app/resume/page.tsx` (450 lines)
- `src/components/home/` (directory)

**Modified Files:**
- `src/app/page.tsx` (updated imports, Hero animation, CTA buttons, added sections)

**Total New Code:** ~1,140 lines of TypeScript/React/Tailwind CSS


