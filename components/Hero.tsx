import React from 'react';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroGridBackground } from './ui/hero-grid-background';
import { ShimmerButton } from './ui/shimmer-button';

interface HeroProps {
  toggleTheme: () => void;
  isDark: boolean;
}

const Hero: React.FC<HeroProps> = ({ toggleTheme, isDark }) => {
  return (
    <section className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24 bg-cream dark:bg-deep-night transition-colors duration-500">
      
      {/* Background Ambience & Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft Ambient Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-clay/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-wheat/20 dark:bg-wheat/5 rounded-full blur-[120px] opacity-50" />
        
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
        
        {/* Infinite Grid System */}
        <HeroGridBackground />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        
        {/* Toggle Button - Smaller, less margin */}
        <motion.button
          onClick={toggleTheme}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 md:mb-6 cursor-pointer"
          aria-label="Toggle dark mode"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className={`
            flex items-center gap-2 px-3 py-1.5 
            rounded-full transition-colors duration-200 border
            ${isDark 
              ? 'bg-charcoal border-white/10 text-wheat' 
              : 'bg-white border-charcoal/10 text-charcoal'
            }
          `}>
             <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-1 transition-colors duration-200 opacity-60">
               {isDark ? 'Dark' : 'Light'}
             </span>
             <div className="relative w-8 h-4 bg-black/10 dark:bg-black/30 rounded-full p-0.5 transition-colors duration-200">
                <motion.div 
                  layout
                  transition={{ type: "spring", stiffness: 700, damping: 30 }}
                  className={`w-3 h-3 rounded-full shadow-sm flex items-center justify-center ${isDark ? 'bg-wheat ml-auto' : 'bg-charcoal'}`}
                >
                   {isDark ? <Moon size={8} className="text-charcoal" /> : <Sun size={8} className="text-wheat" />}
                </motion.div>
             </div>
          </div>
        </motion.button>

        {/* Text Container with Shadows for Grid Separation */}
        <div className={`transition-all duration-300 ${isDark ? 'drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]' : 'drop-shadow-[0_0_20px_rgba(253,251,247,1)]'}`}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-4xl sm:text-6xl md:text-8xl leading-[1.1] text-charcoal dark:text-cream mb-6 tracking-tight"
          >
            Automate today. <br className="hidden md:block" />
            <span className="italic text-clay relative inline-block">
              Accelerate tomorrow.
              <svg className="absolute w-full h-3 -bottom-2 left-0 text-wheat opacity-60" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7509 9.37496 90.0003 3.49996 198.001 2.49996" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-base md:text-xl text-charcoal/50 dark:text-wheat/50 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed font-medium px-4"
          >
            Loop Mafia transforms manual chaos into automated order. 
            We develop custom AI agents and software in weeks, not months.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ShimmerButton 
            className="shadow-xl hover:scale-105 hover:px-10 transition-all duration-300 ease-out" 
            shimmerColor="#C4A484"
            background={isDark ? "rgba(26, 26, 26, 1)" : "#2C2C2C"}
            onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight lg:text-lg flex items-center gap-2 text-white">
              See Our Process <ArrowRight className="w-5 h-5" />
            </span>
          </ShimmerButton>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;