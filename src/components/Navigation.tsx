'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion'; // Import Variants type
import { NavLink } from './NavLink';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from './ui/button';
import Image from 'next/image';
import SnowToggle from "./SnowToggle";

export const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); 

  const NAV_HEIGHT_INCREASE_PX = 15;
  const NAV_BASE_HEIGHT_PX = 64;

  const cycleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const ThemeIcon = theme === 'dark' ? Moon : Sun;

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/about', label: 'ABOUT ME' },
    { to: '/portfolio', label: 'PORTFOLIO' },
    { to: '/blog', label: 'MY BLOG' },
    { to: '/contact', label: 'CONTACT' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined' && window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const navbarClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out flex items-center
    ${isScrolled 
      ? 'backdrop-blur shadow-lg dark:bg-gray-800/50 '
      : 'bg-transparent'
    }
  `;

  const navHeightStyle = {
    height: isScrolled 
      ? `${NAV_BASE_HEIGHT_PX + NAV_HEIGHT_INCREASE_PX}px` 
      : `${NAV_BASE_HEIGHT_PX}px`,
    transition: 'height 0.5s ease-in-out, background-color 0.5s ease-in-out, box-shadow 0.5s ease-in-out, backdrop-filter 0.5s ease-in-out'
  };
  
  // Define animation variants for smooth drawer from top
  const menuVariants: Variants = {
    hidden: { 
      y: '-100%',
      opacity: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.43, 0.13, 0.23, 0.96]
      } 
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.4, 
        ease: [0.43, 0.13, 0.23, 0.96]
      } 
    }
  };

  return (
    <>
      <nav className={navbarClasses} style={navHeightStyle}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
          
          <NavLink href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center border-2 border-black dark:border-gray-100 justify-center overflow-hidden">
              <Image src="/img/fuad.jpg" height={200} width={200} alt='S' objectFit='cover'></Image>
            </div>
          </NavLink>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                href={link.to}
                end
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative py-2"
                activeClassName="text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
            
          <div className="flex items-center space-x-2">
            <SnowToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={cycleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              <ThemeIcon className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-xl"
              variants={menuVariants}
              style={{ 
                paddingTop: isScrolled 
                  ? `${NAV_BASE_HEIGHT_PX + NAV_HEIGHT_INCREASE_PX}px` 
                  : `${NAV_BASE_HEIGHT_PX}px`
              }}
            >
              <div className="px-6 py-8 flex flex-col items-start space-y-6">
                {navLinks.map(link => (
                  <NavLink
                    key={link.to}
                    href={link.to}
                    end
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                    activeClassName="text-foreground font-bold"
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
