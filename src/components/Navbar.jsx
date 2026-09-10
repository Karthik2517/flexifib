import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Navbar.css';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Why Switch?', href: '#why' },
  { label: 'Shop', href: '#shop' },
  { label: 'Our Story', href: '#story' },
  // { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleLinkClick = useCallback((sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  }, []);

  // Throttled scroll handler with rAF
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver scrollspy — highlights the section currently in view
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push({ observer, el });
    });

    return () => {
      observers.forEach(({ observer, el }) => observer.unobserve(el));
    };
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}>
      <a href="#home" className="logo-link" onClick={() => handleLinkClick('home')}>
        <div className="logo">FlexiFib</div>
      </a>

      <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => {
          const sectionId = item.href.slice(1);
          return (
            <li key={sectionId}>
              <a
                href={item.href}
                className={activeSection === sectionId ? 'active' : ''}
                onClick={() => handleLinkClick(sectionId)}
                aria-current={activeSection === sectionId ? 'true' : undefined}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>

      <button
        className={`mobile-menu-icon ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      {isMobileMenuOpen && <div className="mobile-menu-backdrop" onClick={closeMobileMenu}></div>}
    </nav>
  );
};

export default Navbar;