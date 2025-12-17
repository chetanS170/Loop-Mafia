import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardCheck, FileText, Sparkles, Rocket, TrendingUp, 
  CheckCircle2, ArrowRight
} from 'lucide-react';

interface Step {
  id: string;
  stepNumber: string;
  label: string;
  icon: React.ElementType;
  title: string;
  goal: string;
  description: string;
  deliverable: string;
}

const steps: Step[] = [
  {
    id: 'validate',
    stepNumber: '01',
    label: 'Validate',
    icon: ClipboardCheck,
    title: 'Validation First',
    goal: 'Clarify before coding',
    description: 'We don’t just build; we strategize. We define the problem, the user, and the core features to ensure we build exactly what you need.',
    deliverable: 'Strategy Blueprint'
  },
  {
    id: 'brief',
    stepNumber: '02',
    label: 'Briefing',
    icon: FileText,
    title: 'The Blueprint',
    goal: 'Context for the AI',
    description: 'We create a detailed technical and design brief. This ensures the AI models we use generate high-quality, on-brand code.',
    deliverable: 'Technical Spec'
  },
  {
    id: 'generate',
    stepNumber: '03',
    label: 'Generate',
    icon: Sparkles,
    title: 'Rapid Build',
    goal: 'Functional Prototype',
    description: 'Using advanced AI, we generate 80% of the code instantly. Our engineers then refine and perfect the functionality.',
    deliverable: 'Working Prototype'
  },
  {
    id: 'deploy',
    stepNumber: '04',
    label: 'Deploy',
    icon: Rocket,
    title: 'Go Live',
    goal: 'Production Ready',
    description: 'We polish the UI, optimize for mobile, secure the database, and launch your product to the world.',
    deliverable: 'Live Website'
  },
  {
    id: 'feedback',
    stepNumber: '05',
    label: 'Evolve',
    icon: TrendingUp,
    title: 'Grow & Scale',
    goal: 'Data-Driven Growth',
    description: 'We analyze user behavior and iterate. Software is never finished; it evolves with your business.',
    deliverable: 'Growth Plan'
  }
];

const Workflow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate steps if user hasn't interacted recently
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id="process" className="py-24 md:py-32 px-4 md:px-6 bg-cream dark:bg-[#0A0A0A] relative overflow-hidden transition-colors duration-500">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-wheat/10 dark:bg-wheat/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal/5 dark:bg-white/5 border border-charcoal/10 dark:border-white/10 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-clay animate-pulse" />
            <span className="text-clay font-bold tracking-[0.2em] text-[10px] uppercase">
              The Engine
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-6xl text-charcoal dark:text-cream mb-6"
          >
            How We <span className="text-clay italic">Build Fast</span>
          </motion.h2>
          <p className="text-charcoal/60 dark:text-white/40 max-w-lg mx-auto font-medium">
            A cyclical process of rapid iteration and deployment.
          </p>
        </div>

        {/* --- DESKTOP CIRCULAR LAYOUT --- */}
        {/* Scaled for responsiveness on laptops (lg) and restored on larger screens (xl) */}
        <div className="hidden lg:flex justify-center items-center relative h-[650px] lg:scale-90 xl:scale-100 transition-transform duration-500">
           {/* The Orbit Container */}
           <div className="relative w-[600px] h-[600px]">
              
              {/* Connecting Ring (SVG) */}
              <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-charcoal/20 dark:text-white/10" />
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="text-charcoal/10 dark:text-white/20" />
              </svg>

              {/* Central Content Hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 flex flex-col items-center justify-center text-center p-8 shadow-2xl z-10 overflow-hidden">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center w-full"
                    >
                       <div className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-clay mb-2 lg:mb-3">{steps[activeStep].goal}</div>
                       <h3 className="font-serif text-2xl lg:text-3xl xl:text-4xl text-charcoal dark:text-wheat mb-2 lg:mb-4 leading-tight">{steps[activeStep].title}</h3>
                       <p className="text-charcoal/70 dark:text-white/60 text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6 max-w-[260px] lg:max-w-[280px]">
                          {steps[activeStep].description}
                       </p>
                       <div className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-charcoal/5 dark:bg-white/5 border border-charcoal/5 dark:border-white/10">
                          <CheckCircle2 size={12} className="text-clay lg:w-[14px] lg:h-[14px]" />
                          <span className="text-[10px] lg:text-xs font-bold text-charcoal dark:text-cream">{steps[activeStep].deliverable}</span>
                       </div>
                    </motion.div>
                 </AnimatePresence>
              </div>

              {/* Orbiting Nodes */}
              {steps.map((step, index) => {
                 const angle = (index * 360) / steps.length - 90; // -90 to start at top
                 const radius = 280; // Distance from center
                 const isActive = index === activeStep;
                 
                 // Convert angle to radians for positioning
                 const radian = (angle * Math.PI) / 180;
                 const x = Math.cos(radian) * radius;
                 const y = Math.sin(radian) * radius;

                 return (
                    <motion.button
                       key={step.id}
                       onClick={() => handleStepClick(index)}
                       className={`absolute w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-500 z-20 group outline-none
                         ${isActive 
                           ? 'bg-clay border-clay text-white shadow-[0_0_30px_rgba(196,164,132,0.4)] scale-110' 
                           : 'bg-charcoal border-white/10 text-wheat shadow-[inset_0_-2px_4px_rgba(255,255,255,0.1)] hover:border-clay hover:text-clay'
                         }
                       `}
                       style={{
                          left: `calc(50% + ${x}px - 32px)`, // 32px is half width
                          top: `calc(50% + ${y}px - 32px)`,
                       }}
                       whileHover={{ scale: 1.1 }}
                    >
                       <step.icon size={24} />
                       
                       {/* Label Floating Outside */}
                       <div 
                         className={`absolute whitespace-nowrap text-sm font-bold tracking-wider transition-all duration-300
                           ${isActive ? 'opacity-100 text-charcoal dark:text-wheat translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 text-charcoal/60 dark:text-white/60'}
                         `}
                         style={{
                            top: y < 0 ? '-30px' : 'auto',
                            bottom: y > 0 ? '-30px' : 'auto',
                            left: x < 0 ? 'auto' : '50%',
                            right: x > 0 ? 'auto' : '50%',
                            transform: `translateX(${x === 0 ? '-50%' : x > 0 ? '0' : '0'})` // Simplify label placement logic or just standard center
                         }}
                       >
                          {/* Simplified positioning for labels to avoid complex logic */}
                          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white dark:bg-charcoal px-2 py-1 rounded shadow-sm">
                             {step.label}
                          </span>
                       </div>
                    </motion.button>
                 );
              })}
           </div>
        </div>

        {/* --- MOBILE/TABLET VERTICAL LAYOUT --- */}
        <div className="lg:hidden flex flex-col gap-8 relative">
           {/* Vertical Line */}
           <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-charcoal/10 dark:via-white/10 to-transparent" />

           {steps.map((step, index) => {
             const isActive = activeStep === index;
             return (
               <div 
                  key={step.id} 
                  className={`relative pl-24 pr-4 py-4 rounded-3xl transition-all duration-500
                    ${isActive ? 'bg-white/50 dark:bg-white/5 border border-white/20 shadow-lg' : 'opacity-70'}
                  `}
                  onClick={() => handleStepClick(index)}
               >
                  {/* Node on Line - Updated to match premium dark style */}
                  <div className={`absolute left-4 top-8 w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-300 z-10
                     ${isActive 
                       ? 'bg-clay border-clay text-white shadow-lg' 
                       : 'bg-charcoal border-white/10 text-wheat shadow-[inset_0_-2px_4px_rgba(255,255,255,0.1)]'}
                  `}>
                     <span className="text-xs font-bold">{step.stepNumber}</span>
                  </div>

                  <div className="mb-2 flex items-center gap-3">
                     <h3 className={`font-serif text-2xl ${isActive ? 'text-charcoal dark:text-wheat' : 'text-charcoal/60 dark:text-white/50'}`}>
                       {step.title}
                     </h3>
                     {isActive && <div className="h-px flex-grow bg-clay/30" />}
                  </div>

                  <p className="text-charcoal/70 dark:text-white/60 text-sm leading-relaxed mb-4">
                     {step.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-clay">
                     <CheckCircle2 size={14} />
                     {step.deliverable}
                  </div>
               </div>
             );
           })}
        </div>

      </div>
    </section>
  );
};

export default Workflow;