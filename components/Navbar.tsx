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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Smooth Scroll Handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        setMobileMenuOpen(false);
        const offset = 80; // Approximate navbar height
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

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
        <div className={`relative flex items-center justify-between pl-4 pr-2 md:pl-6 py-2.5 transition-all duration-300 ease-out z-50
          ${mobileMenuOpen ? 'w-full max-w-[95%] bg-transparent' : 
          'bg-cream/90 dark:bg-[#1A1A1A]/90 shadow-2xl shadow-wheat/20 dark:shadow-black/40 backdrop-blur-xl border border-wheat/50 dark:border-white/5 rounded-full w-full max-w-5xl'}`}>
          
          {/* Logo */}
          <a href="#" onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className={`flex items-center gap-2 md:gap-3 group ${mobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden border border-wheat/20 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm shadow-inner transition-transform duration-300 group-hover:scale-105">
              {/* Light Mode Logo */}
              <img 
                src="https://drive.google.com/thumbnail?id=15bFQO3-oMeZiZW94CQNQ2NcIziwfRvMT&sz=w200" 
                alt="Loop Mafia" 
                className="w-full h-full object-cover block dark:hidden"
              />
              {/* Dark Mode Logo */}
              <img 
                src="https://drive.google.com/thumbnail?id=1YJyTiiUDxiE1ts2Zn4tKXnMmsu9GNwc0&sz=w200" 
                alt="Loop Mafia" 
                className="w-full h-full object-cover hidden dark:block"
              />
            </div>
            <span className="font-serif text-lg md:text-xl font-normal tracking-tight text-charcoal dark:text-wheat transition-colors duration-200 whitespace-nowrap">
              Loop <span className="italic text-clay">Mafia</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-charcoal/70 dark:text-wheat/70 hover:text-charcoal dark:hover:text-white transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-clay transition-all duration-200 ease-out group-hover:w-full" />
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
              className="group px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-2 border border-charcoal/10 dark:border-wheat/20 bg-transparent hover:bg-charcoal dark:hover:bg-wheat text-charcoal dark:text-wheat hover:text-wheat dark:hover:text-charcoal"
            >
              Book a Call
              <div className="group-hover:translate-x-1 transition-transform duration-200">
                <ArrowRight size={14} />
              </div>
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 rounded-full transition-colors duration-200 z-50 ${mobileMenuOpen ? 'bg-white/10 text-white' : 'text-charcoal dark:text-wheat bg-charcoal/5 dark:bg-white/10'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-charcoal dark:bg-deep-night flex flex-col items-center justify-center"
          >
             {/* Background Decoration */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
            <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-clay/20 rounded-full blur-[100px] pointer-events-none" />

            <motion.div 
               className="flex flex-col items-center space-y-8 p-6 w-full max-w-sm"
               initial="closed"
               animate="open"
               variants={{
                 open: { transition: { staggerChildren: 0.05 } },
                 closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
               }}
            >
               {navLinks.map((link) => (
                <motion.a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 }
                  }}
                  className="text-3xl font-serif text-wheat hover:text-clay transition-colors duration-200"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.div 
                variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 }
                }}
                className="w-full pt-8"
              >
                 <a 
                  href="https://cal.com/chetansharma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 text-center border border-wheat/30 text-wheat hover:bg-wheat hover:text-charcoal rounded-full font-bold text-lg transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book a Call
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;