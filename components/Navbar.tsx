import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Work', href: '#work' },
    { name: 'Contact', href: '#booking' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 inset-x-0 z-50 flex justify-center px-4"
      >
        <div className={`relative flex items-center justify-between pl-6 pr-2 py-2.5 transition-all duration-500 ease-out 
          ${mobileMenuOpen ? 'bg-charcoal rounded-[2rem] w-full max-w-[95%]' : 
          'bg-cream/90 dark:bg-[#1A1A1A]/90 shadow-2xl shadow-wheat/20 dark:shadow-black/40 backdrop-blur-xl border border-wheat/50 dark:border-white/5 rounded-full w-full max-w-5xl'}`}>
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
             <span className="font-serif text-2xl font-semibold tracking-tight text-charcoal dark:text-wheat group-hover:text-clay transition-colors duration-300">
               Loop Mafia.
             </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-charcoal/70 dark:text-wheat/70 hover:text-charcoal dark:hover:text-white transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-clay transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a 
              href="https://cal.com/chetansharma"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-6 py-2.5 bg-charcoal dark:bg-wheat text-wheat dark:text-charcoal text-sm font-semibold rounded-full hover:shadow-[0_0_20px_rgba(196,164,132,0.3)] transition-all duration-300 flex items-center gap-2"
            >
              Book a Call
              <div className="bg-white/20 dark:bg-black/10 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                <ArrowRight size={12} className="text-white dark:text-charcoal" />
              </div>
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-charcoal dark:text-wheat p-2 bg-charcoal/5 dark:bg-white/10 rounded-full hover:bg-charcoal/10 dark:hover:bg-white/20 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} className="text-white" /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[5.5rem] left-1/2 -translate-x-1/2 w-[90%] max-w-[95%] bg-charcoal rounded-[2rem] p-6 z-40 border border-white/5 shadow-2xl md:hidden flex flex-col space-y-2 origin-top"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-lg font-medium text-wheat p-4 hover:bg-white/5 rounded-xl transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a 
                href="https://cal.com/chetansharma"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 text-center bg-wheat text-charcoal rounded-xl font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;