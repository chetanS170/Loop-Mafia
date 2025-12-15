import React from 'react';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  toggleTheme: () => void;
  isDark: boolean;
}

const Hero: React.FC<HeroProps> = ({ toggleTheme, isDark }) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-48 pb-20 md:pb-32 bg-cream dark:bg-deep-night transition-colors duration-500">
      {/* Background Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-wheat/30 dark:bg-wheat/5 rounded-full blur-[80px] md:blur-[120px] animate-float transition-colors duration-500" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-clay/10 dark:bg-clay/5 rounded-full blur-[60px] md:blur-[100px] transition-colors duration-500" />
      
      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light dark:mix-blend-overlay"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        
        {/* Toggle Button UI */}
        <motion.div
          onClick={toggleTheme}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer mb-8 md:mb-10 group"
          role="button"
          aria-label="Toggle dark mode"
        >
          <div className="flex items-center gap-3 px-2 py-2 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-charcoal/10 dark:border-white/10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
             <div className="px-4">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-charcoal/80 dark:text-wheat">
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </span>
             </div>
             
             {/* The Switch Track */}
             <div className="relative w-14 h-8 bg-wheat/40 dark:bg-black/40 rounded-full p-1 transition-colors duration-300 box-border border border-transparent dark:border-white/10">
                <div className="absolute inset-0 flex justify-between items-center px-2">
                   <Sun size={12} className="text-charcoal/60 dark:text-clay opacity-80" />
                   <Moon size={12} className="text-charcoal/60 dark:text-wheat opacity-80" />
                </div>
                
                {/* The Sliding Knob */}
                <motion.div 
                  layout
                  transition={{ type: "spring", stiffness: 700, damping: 30 }}
                  className={`w-6 h-6 bg-charcoal dark:bg-wheat rounded-full shadow-md flex items-center justify-center relative z-10 ${isDark ? 'ml-auto' : ''}`}
                >
                   {isDark ? (
                     <Moon size={12} className="text-charcoal" />
                   ) : (
                     <Sun size={12} className="text-wheat" />
                   )}
                </motion.div>
             </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] md:leading-[1.05] text-charcoal dark:text-cream mb-6 md:mb-8 tracking-tight transition-colors duration-500 break-words w-full"
        >
          Automate today. <br className="hidden md:block" />
          <span className="italic text-clay relative inline-block transition-colors duration-500 pr-4 mt-2 md:mt-0">
            Accelerate tomorrow.
            <svg className="absolute w-full h-2 md:h-3 -bottom-1 left-0 text-wheat opacity-80 dark:opacity-40" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7509 9.37496 90.0003 3.49996 198.001 2.49996" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="font-sans text-base md:text-xl text-charcoal/80 dark:text-wheat/70 max-w-2xl mb-10 md:mb-12 leading-relaxed transition-colors duration-500 font-medium px-4"
        >
          Loop Mafia transforms manual chaos into automated order. 
          We develop custom AI agents and software in weeks, not months.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center w-full justify-center px-6"
        >
          <motion.a 
            href="#process"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto relative px-10 py-4 md:py-5 bg-charcoal dark:bg-wheat text-wheat dark:text-charcoal rounded-full shadow-[0_10px_40px_-10px_rgba(44,44,44,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(196,164,132,0.2)] hover:shadow-[0_20px_40px_-10px_rgba(196,164,132,0.4)] transition-all duration-300 flex items-center justify-center font-bold text-base md:text-lg"
          >
            See Our Process
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;