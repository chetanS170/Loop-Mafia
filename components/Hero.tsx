import React from 'react';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroGridBackground } from './ui/hero-grid-background';

interface HeroProps {
  toggleTheme: () => void;
  isDark: boolean;
}

const Hero: React.FC<HeroProps> = ({ toggleTheme, isDark }) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-48 pb-20 md:pb-32 bg-cream dark:bg-deep-night transition-colors duration-500">
      
      {/* Background Ambience & Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft Ambient Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-clay/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-wheat/20 dark:bg-wheat/5 rounded-full blur-[120px] opacity-50" />
        
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
        
        {/* Infinite Grid System - Placed AFTER noise to pop more */}
        <HeroGridBackground />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        
        {/* Toggle Button - No Glow, Solid, Scalable */}
        <motion.button
          onClick={toggleTheme}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12 cursor-pointer"
          aria-label="Toggle dark mode"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className={`
            flex items-center gap-3 px-4 py-2.5 
            rounded-full transition-colors duration-200 border
            ${isDark 
              ? 'bg-charcoal border-white/20 text-wheat' 
              : 'bg-white border-charcoal/10 text-charcoal'
            }
          `}>
             <span className="text-xs font-bold tracking-[0.25em] uppercase px-2 transition-colors duration-200 opacity-80">
               {isDark ? 'Dark Mode' : 'Light Mode'}
             </span>
             <div className="relative w-12 h-7 bg-black/10 dark:bg-black/30 rounded-full p-1 transition-colors duration-200">
                <motion.div 
                  layout
                  transition={{ type: "spring", stiffness: 700, damping: 30 }}
                  className={`w-5 h-5 rounded-full shadow-sm flex items-center justify-center ${isDark ? 'bg-wheat ml-auto' : 'bg-charcoal'}`}
                >
                   {isDark ? <Moon size={10} className="text-charcoal" /> : <Sun size={10} className="text-wheat" />}
                </motion.div>
             </div>
          </div>
        </motion.button>

        {/* Text Container with Shadows for Grid Separation */}
        <div className={`transition-all duration-300 ${isDark ? 'drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]' : 'drop-shadow-[0_0_20px_rgba(253,251,247,1)]'}`}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-5xl sm:text-6xl md:text-8xl leading-[1.1] text-charcoal dark:text-cream mb-8 tracking-tight"
          >
            Automate today. <br className="hidden md:block" />
            <span className="italic text-clay relative inline-block">
              Accelerate tomorrow.
              <svg className="absolute w-full h-3 -bottom-2 left-0 text-wheat opacity-60" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 9.37496 90.0003 3.49996 198.001 2.49996" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-lg md:text-2xl text-charcoal/90 dark:text-wheat/90 max-w-2xl mx-auto mb-12 leading-relaxed font-medium px-4"
          >
            Loop Mafia transforms manual chaos into automated order. 
            We develop custom AI agents and software in weeks, not months.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a 
            href="#process"
            className={`
              group relative px-10 py-4 rounded-full overflow-hidden transition-all duration-200 inline-flex items-center gap-3 font-bold text-lg tracking-wide border hover:scale-105
              ${isDark 
                ? 'bg-transparent border-wheat/30 text-wheat hover:bg-wheat hover:text-charcoal' 
                : 'bg-transparent border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-wheat'
              }
            `}
          >
             <span className="relative z-20">See Our Process</span>
             <ArrowRight className="w-5 h-5 relative z-20 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;