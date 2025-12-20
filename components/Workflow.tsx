import React, { useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  ClipboardCheck, FileText, Sparkles, Rocket, TrendingUp, 
  CheckCircle2, Zap, ArrowDown, ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ShimmerButton } from './ui/shimmer-button';

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
    id: 'consult',
    stepNumber: '01',
    label: 'Consult',
    icon: ClipboardCheck,
    title: 'Audit & Analysis',
    goal: 'Find the Savings',
    description: 'We look at your manual tasks and pinpoint exactly where AI can save you the most time and money.',
    deliverable: 'Automation Map'
  },
  {
    id: 'blueprint',
    stepNumber: '02',
    label: 'Blueprint',
    icon: FileText,
    title: 'System Design',
    goal: 'Plan the Flow',
    description: 'We map out how your apps will talk to each other and how the AI will handle your data step-by-step.',
    deliverable: 'Workflow Logic'
  },
  {
    id: 'build',
    stepNumber: '03',
    label: 'Build',
    icon: Sparkles,
    title: 'Development',
    goal: 'Create the Tech',
    description: 'Our team builds your custom AI agents and integrates them directly into your current business tools.',
    deliverable: 'Working System'
  },
  {
    id: 'deploy',
    stepNumber: '04',
    label: 'Deploy',
    icon: Rocket,
    title: 'Launch Day',
    goal: 'Go Live',
    description: 'We turn the system on, train your team on how to use it, and ensure everything is running perfectly.',
    deliverable: 'Live Automation'
  },
  {
    id: 'scale',
    stepNumber: '05',
    label: 'Scale',
    icon: TrendingUp,
    title: 'Maintenance',
    goal: 'Keep it Fast',
    description: 'We monitor the performance and tweak the AI as your business grows to keep your overhead low.',
    deliverable: 'Support Plan'
  }
];

const WorkflowStep: React.FC<{ 
  step: Step; 
  index: number; 
  isEven: boolean;
}> = ({ step, index, isEven }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.35 });
  
  return (
    <div 
      ref={ref}
      className={cn(
        "workflow-step relative flex items-center w-full min-h-[300px] md:min-h-[400px] py-12 md:py-0",
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      {/* 1. Content Area with Quick Sliding Animation */}
      <div className={cn(
        "w-full md:w-1/2 pl-14 md:pl-0",
        isEven ? "md:pr-16 lg:pr-24" : "md:pl-16 lg:pl-24"
      )}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -60 : 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -60 : 60 }}
          transition={{ 
            type: "spring",
            stiffness: 280,
            damping: 28,
            mass: 0.5,
            delay: 0.05
          }}
          className={cn(
            "flex flex-col p-8 md:p-10 rounded-[2rem] transition-all duration-500",
            isInView 
              ? "bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-clay/30 shadow-2xl shadow-clay/5" 
              : "opacity-10 grayscale blur-[4px]",
            !isEven ? "md:items-start" : "md:items-end md:text-right"
          )}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-clay mb-3">
            Phase {step.stepNumber} // {step.goal}
          </span>
          <h3 className="font-serif text-2xl md:text-4xl text-charcoal dark:text-wheat mb-4 tracking-tight">
            {step.title}
          </h3>
          <p className="text-charcoal/70 dark:text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-sm font-medium">
            {step.description}
          </p>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-charcoal/5 dark:bg-white/5 border border-charcoal/10 dark:border-white/10">
             <motion.div
              animate={isInView ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } : {}}
              transition={{ repeat: isInView ? Infinity : 0, duration: 1.8 }}
             >
              <CheckCircle2 size={14} className={isInView ? "text-clay" : "text-charcoal/20"} />
             </motion.div>
             <span className="text-[10px] font-bold text-charcoal/80 dark:text-cream uppercase tracking-[0.15em]">{step.deliverable}</span>
          </div>
        </motion.div>
      </div>

      {/* 2. Interactive Node (Center) */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20">
        <motion.div
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0.2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-12 h-12 md:w-24 md:h-24 rounded-full flex items-center justify-center cursor-default"
        >
          {/* Shimmer / Glow */}
          <AnimatePresence>
            {isInView && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.3 }}
                className="absolute inset-0 z-0"
              >
                <div 
                  className="absolute inset-0 rounded-full animate-spin-continuous"
                  style={{
                    "--spread": "120deg",
                    "--shimmer-color": "#C4A484",
                    "--speed": "2.2s",
                    "background": "conic-gradient(from 0deg, transparent 0deg, var(--shimmer-color) 40deg, transparent 120deg)"
                  } as React.CSSProperties}
                />
                <div className="absolute inset-0 bg-clay/30 rounded-full blur-2xl animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Background Plate */}
          <div className={cn(
            "absolute inset-[3px] md:inset-[4px] rounded-full transition-all duration-700 z-10 shadow-lg",
            isInView 
              ? "bg-charcoal dark:bg-dark-card border border-clay/50 shadow-[inset_0_2px_15px_rgba(255,255,255,0.1)]" 
              : "bg-wheat/30 dark:bg-white/5 border border-charcoal/5 dark:border-white/5"
          )} />

          {/* Icon */}
          <div className="relative z-20">
            <motion.div
              animate={isInView ? { 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1],
                y: [0, -2, 0]
              } : {}}
              transition={{ repeat: isInView ? Infinity : 0, duration: 3, ease: "easeInOut" }}
            >
              <step.icon 
                size={isInView ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 24 : 36) : 20} 
                className={cn(
                  "transition-all duration-700",
                  isInView 
                    ? "text-wheat drop-shadow-[0_0_12px_rgba(227,213,202,0.8)]" 
                    : "text-charcoal/10 dark:text-white/10"
                )} 
              />
            </motion.div>
          </div>

          {/* Step Number Badge */}
          <div className={cn(
            "absolute -top-1 -right-1 w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center text-[8px] md:text-[10px] font-black z-30 transition-all duration-500 shadow-xl",
            isInView 
              ? "bg-clay text-white scale-110" 
              : "bg-charcoal/5 dark:bg-white/5 text-charcoal/10 dark:text-white/5"
          )}>
            {step.stepNumber}
          </div>
        </motion.div>
      </div>

      {/* 3. Empty Placeholder (Desktop) */}
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
};

const Workflow: React.FC<{ isDark?: boolean }> = ({ isDark = true }) => {
  return (
    <section 
      id="process" 
      className="py-24 md:py-48 bg-cream dark:bg-deep-night relative transition-colors duration-500 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-4 md:left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-clay/20 to-transparent pointer-events-none" />
      
      {/* Enhanced Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-clay/5 rounded-full blur-[80px] md:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-wheat/5 rounded-full blur-[80px] md:blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        
        {/* Header Section */}
        <div className="text-center mb-24 md:mb-40">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal/5 dark:bg-white/5 border border-charcoal/10 dark:border-white/10 mb-6"
          >
             <Zap size={14} className="text-clay fill-clay" />
             <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-charcoal/60 dark:text-wheat/80">
               Operational Lifecycle
             </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-6xl text-charcoal dark:text-cream mb-6 tracking-tight"
          >
            How we <span className="text-clay italic">Work</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-2.5 text-charcoal/30 dark:text-white/20"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll to witness the flow</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            >
              <ArrowDown size={14} />
            </motion.div>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative space-y-16 md:space-y-32">
          {/* Central Connecting Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 z-0">
             <div className="absolute inset-0 bg-gradient-to-b from-clay/40 via-clay/10 to-transparent" />
          </div>

          {/* Mapping Steps */}
          {steps.map((step, index) => (
            <WorkflowStep 
              key={step.id} 
              step={step} 
              index={index} 
              isEven={index % 2 === 0} 
            />
          ))}
        </div>

        {/* Footer Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-40 md:mt-56 text-center flex flex-col items-center"
        >
          <div className="w-16 md:w-24 h-px bg-clay mx-auto mb-10 md:mb-14 opacity-40" />
          <p className="text-charcoal/70 dark:text-white/50 text-xl md:text-2xl font-serif tracking-wide italic max-w-3xl mx-auto leading-relaxed px-6 mb-16">
            "If you’re ready to replace friction with leverage, let’s design automation that works harder than any team ever could."
          </p>
          
          <ShimmerButton 
            className="shadow-xl hover:scale-105 hover:px-10 transition-all duration-300 ease-out" 
            shimmerColor="#C4A484"
            background={isDark ? "rgba(26, 26, 26, 1)" : "#2C2C2C"}
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="whitespace-pre-wrap text-center text-sm font-semibold leading-none tracking-tight md:text-lg flex items-center gap-2.5 text-white">
              Start Your Automation Journey <ArrowRight className="w-5 h-5" />
            </span>
          </ShimmerButton>
        </motion.div>
      </div>
    </section>
  );
};

export default Workflow;