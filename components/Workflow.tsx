import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardCheck, FileText, Sparkles, Rocket, TrendingUp, 
  ArrowRight, ArrowLeft, Zap, CheckCircle2 
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
  tags: string[];
}

const steps: Step[] = [
  {
    id: 'validate',
    stepNumber: '01',
    label: 'Validate',
    icon: ClipboardCheck,
    title: 'We Validate First',
    goal: 'Clarify before coding',
    description: 'We don’t just build; we strategize. We define the problem, the user, and the core features to ensure we build exactly what you need.',
    deliverable: 'Strategy Blueprint',
    tags: ['Strategy', 'Scope', 'Validation']
  },
  {
    id: 'brief',
    stepNumber: '02',
    label: 'Briefing',
    icon: FileText,
    title: 'The Blueprint',
    goal: 'Context for the AI',
    description: 'We create a detailed technical and design brief. This ensures the AI models we use generate high-quality, on-brand code.',
    deliverable: 'Technical Spec',
    tags: ['Architecture', 'Design', 'Planning']
  },
  {
    id: 'generate',
    stepNumber: '03',
    label: 'Generate',
    icon: Sparkles,
    title: 'Rapid Build',
    goal: 'Functional Prototype',
    description: 'Using advanced AI, we generate 80% of the code instantly. Our engineers then refine and perfect the functionality.',
    deliverable: 'Working Prototype',
    tags: ['AI Coding', 'Fast Dev', 'Testing']
  },
  {
    id: 'deploy',
    stepNumber: '04',
    label: 'Deploy',
    icon: Rocket,
    title: 'Go Live',
    goal: 'Production Ready',
    description: 'We polish the UI, optimize for mobile, secure the database, and launch your product to the world.',
    deliverable: 'Live Website',
    tags: ['Hosting', 'Security', 'Launch']
  },
  {
    id: 'feedback',
    stepNumber: '05',
    label: 'Evolve',
    icon: TrendingUp,
    title: 'Grow & Scale',
    goal: 'Data-Driven Growth',
    description: 'We analyze user behavior and iterate. Software is never finished; it evolves with your business.',
    deliverable: 'Growth Plan',
    tags: ['Analytics', 'Updates', 'Scaling']
  }
];

const Workflow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const getPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  const handleNext = () => setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  const handlePrev = () => setActiveStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));

  return (
    <section id="process" className="py-24 md:py-32 px-6 bg-cream dark:bg-[#0A0A0A] relative overflow-hidden transition-colors duration-500">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-wheat/20 dark:bg-clay/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 opacity-60 dark:opacity-100" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-clay/10 dark:bg-wheat/5 rounded-full blur-[100px] pointer-events-none opacity-60 dark:opacity-100" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal/5 dark:bg-white/5 border border-charcoal/10 dark:border-white/10 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-clay animate-pulse" />
            <span className="text-clay font-bold tracking-[0.2em] text-[10px] uppercase">
              Our Process
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-charcoal dark:text-cream mb-6"
          >
            How We <span className="text-clay italic">Build Fast</span>
          </motion.h2>
          <p className="text-charcoal/60 dark:text-white/40 max-w-lg mx-auto font-medium">
            From idea to deployment in 5 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Radial Engine */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center select-none origin-center scale-[0.85] sm:scale-100 lg:scale-110">
            
            {/* Center Core */}
            <motion.div 
              animate={{ 
                boxShadow: ['0 0 20px rgba(196,164,132,0.2)', '0 0 60px rgba(196,164,132,0.4)', '0 0 20px rgba(196,164,132,0.2)'] 
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute z-20 w-32 h-32 md:w-40 md:h-40 rounded-full bg-white dark:bg-[#141414] border border-wheat/40 dark:border-wheat/20 flex items-center justify-center shadow-2xl"
            >
               <div className="absolute inset-0 rounded-full border border-clay/30 animate-ping opacity-20" />
               <Zap className="w-10 h-10 md:w-14 md:h-14 text-clay" fill="currentColor" fillOpacity={0.2} />
            </motion.div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
               {steps.map((step, index) => {
                 // Responsive radius calculation roughly handled by CSS scaling, but base logic remains
                 const radius = 180; 
                 const pos = getPosition(index, steps.length, radius);
                 const isActive = activeStep === index;
                 return (
                   <g key={`connection-${index}`}>
                     <line 
                       x1="50%" 
                       y1="50%" 
                       x2={`calc(50% + ${pos.x}px)`} 
                       y2={`calc(50% + ${pos.y}px)`} 
                       className="stroke-charcoal/10 dark:stroke-white/5"
                       strokeWidth="2"
                     />
                     <motion.line 
                       x1="50%" 
                       y1="50%" 
                       x2={`calc(50% + ${pos.x}px)`} 
                       y2={`calc(50% + ${pos.y}px)`} 
                       stroke="#C4A484"
                       strokeWidth={isActive ? 3 : 0}
                       strokeLinecap="round"
                       initial={{ pathLength: 0, opacity: 0 }}
                       animate={{ 
                         pathLength: isActive ? 1 : 0, 
                         opacity: isActive ? 1 : 0 
                       }}
                       transition={{ duration: 0.6, ease: "easeInOut" }}
                     />
                   </g>
                 );
               })}
            </svg>

            {/* Nodes */}
            {steps.map((step, index) => {
              const radius = 180; 
              const pos = getPosition(index, steps.length, radius);
              const isActive = activeStep === index;

              return (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  className={`absolute z-30 w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center transition-all duration-500 cursor-pointer border outline-none
                    ${isActive 
                      ? 'bg-wheat text-charcoal border-wheat scale-110 shadow-[0_0_30px_rgba(227,213,202,0.4)] z-40' 
                      : 'bg-white dark:bg-[#1A1A1A] text-charcoal/40 dark:text-white/30 border-charcoal/10 dark:border-white/10 hover:border-clay/50 hover:text-clay hover:scale-105'
                    }
                  `}
                  style={{ 
                    left: `calc(50% + ${pos.x}px)`, 
                    top: `calc(50% + ${pos.y}px)`,
                    marginLeft: activeStep === index ? '-3rem' : '-2.5rem', // Adjust offsets based on active size vs normal size if needed, mostly handled by w/h classes + flex centering
                    marginTop: activeStep === index ? '-3rem' : '-2.5rem',
                    transform: 'translate(-50%, -50%)' // Ensure centering
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <step.icon size={28} strokeWidth={isActive ? 2.5 : 2} className="mb-1 md:w-8 md:h-8" />
                  {isActive && (
                    <motion.span 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-[10px] md:text-xs font-bold uppercase tracking-wider"
                    >
                      {step.stepNumber}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right: Details Card */}
          <div className="relative min-h-[450px] flex items-center">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeStep}
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -50 }}
                 transition={{ duration: 0.4, ease: "circOut" }}
                 className="w-full bg-white dark:bg-[#141414]/80 backdrop-blur-xl border border-charcoal/5 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group"
               >
                  {/* Step Number Background */}
                  <div className="absolute -bottom-10 -right-4 text-[12rem] font-serif text-charcoal/[0.03] dark:text-white/[0.02] pointer-events-none leading-none select-none">
                    {steps[activeStep].stepNumber}
                  </div>

                  <div className="flex justify-between items-start mb-8 relative z-10">
                     <div>
                        <div className="flex items-center gap-3 mb-4">
                           <span className="text-clay font-bold tracking-widest text-xs uppercase">
                             Step {steps[activeStep].stepNumber}
                           </span>
                           <span className="w-1 h-1 rounded-full bg-charcoal/20 dark:bg-white/20" />
                           <span className="text-charcoal/40 dark:text-white/40 text-xs font-medium uppercase tracking-wider">
                             {steps[activeStep].goal}
                           </span>
                        </div>
                        <h3 className="font-serif text-3xl md:text-5xl text-charcoal dark:text-cream leading-tight">
                           {steps[activeStep].title}
                        </h3>
                     </div>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-clay/30 to-transparent mb-8" />

                  <div className="relative z-10 space-y-8">
                    <p className="text-charcoal/70 dark:text-white/70 text-lg md:text-xl leading-relaxed font-medium">
                      {steps[activeStep].description}
                    </p>

                    <div className="bg-charcoal/5 dark:bg-white/5 border border-charcoal/5 dark:border-white/5 rounded-2xl p-6 flex items-start gap-4">
                      <div className="mt-1 p-1.5 bg-green-500/20 rounded-full">
                         <CheckCircle2 size={18} className="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <span className="block text-xs uppercase text-charcoal/40 dark:text-white/30 font-bold tracking-wider mb-1">Deliverable</span>
                        <span className="text-charcoal dark:text-cream font-bold text-lg">{steps[activeStep].deliverable}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-10 relative z-10">
                     {steps[activeStep].tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-charcoal/5 dark:bg-black/40 border border-charcoal/5 dark:border-white/10 text-xs text-charcoal/60 dark:text-wheat/60 font-bold">
                           # {tag}
                        </span>
                     ))}
                  </div>

                  <div className="absolute bottom-0 right-0 p-8 flex gap-3 z-20">
                     <button 
                       onClick={handlePrev}
                       className="w-12 h-12 rounded-full border border-charcoal/10 dark:border-white/10 flex items-center justify-center text-charcoal/40 dark:text-white/40 hover:bg-charcoal/5 dark:hover:bg-white/10 transition-all"
                     >
                        <ArrowLeft size={20} />
                     </button>
                     <button 
                       onClick={handleNext}
                       className="w-12 h-12 rounded-full bg-wheat text-charcoal flex items-center justify-center hover:bg-clay transition-all shadow-md hover:scale-105"
                     >
                        <ArrowRight size={20} />
                     </button>
                  </div>
               </motion.div>
             </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Workflow;