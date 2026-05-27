'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    $: any;
  }
}

export default function RipplesScript() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize ripples when component mounts
    const initRipples = () => {
      if (window.innerWidth < 1024) return;
      if (window.$ && window.$.fn.ripples) {
        try {
          window.$(".water").ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.04,
          });
        } catch {
          // Ignore errors
        }
      }
    };

    // Try to initialize immediately
    if (window.$ && window.$.fn.ripples) {
      initRipples();
    } else {
      // Wait for jQuery and ripples library to load
      const interval = setInterval(() => {
        if (window.$ && window.$.fn.ripples) {
          clearInterval(interval);
          initRipples();
        }
      }, 50);

      // Cleanup interval after 5 seconds
      const timeout = setTimeout(() => clearInterval(interval), 5000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [pathname]);

  // Load ripples library
  useEffect(() => {
    if (window.innerWidth < 1024) return;
    
    if (window.$ && !window.$.fn.ripples) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/jquery.ripples@0.5.3/jquery.ripples.min.js';
      script.onload = () => {
        // Trigger reinit after ripples library loads
        const event = new Event('ripplesLoaded');
        window.dispatchEvent(event);
      };
      document.head.appendChild(script);
    }
  }, []);

  return null;
}