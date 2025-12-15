import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Zap, Layers, Users, TrendingUp, ChevronRight, LayoutTemplate } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  outcome: string;
  thumbnail: string;
  icon: React.ElementType;
}

const cases: CaseStudy[] = [
  {
    id: 'resume-system',
    title: 'Resume Qualification System',
    subtitle: 'HR Automation',
    description: 'Automates resume screening, compares candidates to job descriptions, and instantly qualifies applicants with AI-driven accuracy.',
    features: [
      'Text Extraction',
      'Automated Scoring',
      'Instant Notifications',
      'Database Sync'
    ],
    outcome: '70% reduction in screening time',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop',
    icon: Users
  },
  {
    id: 'ultimate-assistant',
    title: 'Multi-Agent Assistant',
    subtitle: 'Executive Productivity',
    description: 'A unified AI orchestrator managing emails, schedules, and contacts, delivering seamless, intelligent task management.',
    features: [
      'Agent Orchestration',
      'Calendar Ops',
      'Context Memory',
      'Inbox Zero'
    ],
    outcome: '60% boost in daily productivity',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    icon: Layers
  },
  {
    id: 'hitl-review',
    title: 'Human-in-the-Loop Engine',
    subtitle: 'Quality Assurance',
    description: 'AI drafts messages while humans approve or refine, ensuring high-quality communication with efficient workflows.',
    features: [
      'Draft Generation',
      'Approval Workflow',
      'Feedback Loops',
      'Routing Logic'
    ],
    outcome: '45% increase in conversion rates',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    icon: Zap
  },
];

const CaseStudies: React.FC = () => {
  const [activeId, setActiveId] = useState(cases[0].id);
  const activeCase = cases.find(c => c.id === activeId) || cases[0];

  return (
    <section id="work" className="py-24 md:py-32 px-6 md:px-12 bg-white dark:bg-[#141414] transition-colors duration-500 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-clay/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal dark:text-cream mb-6">
            Production Architectures
          </h2>
          <p className="text-charcoal/60 dark:text-wheat/50 max-w-2xl text-lg">
            Scalable systems we've deployed to solve real-world operational bottlenecks.
          </p>
        </div>

        {/* MOBILE LAYOUT: Stacked Cards */}
        <div className="flex flex-col gap-12 lg:hidden">
          {cases.map((item) => (
             <div key={item.id} className="bg-cream dark:bg-[#1A1A1A] rounded-[2rem] p-6 shadow-xl border border-wheat/20 dark:border-white/5 overflow-hidden">
                {/* Image */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-charcoal/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 shadow-sm">
                     <div className="flex items-center gap-2">
                        <TrendingUp size={14} className="text-green-600 dark:text-green-400" />
                        <span className="text-xs font-bold text-charcoal dark:text-cream leading-tight">{item.outcome}</span>
                     </div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                     <span className="text-clay font-bold text-xs uppercase tracking-wider">{item.subtitle}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal dark:text-wheat mb-3">{item.title}</h3>
                  <p className="text-charcoal/70 dark:text-white/60 text-sm leading-relaxed mb-6">
                     {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.features.slice(0, 3).map((feature, idx) => (
                       <span key={idx} className="px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-wheat/20 dark:border-white/10 text-xs text-charcoal/80 dark:text-wheat/80 flex items-center gap-1.5">
                          <CheckCircle2 size={12} className="text-clay" />
                          {feature}
                       </span>
                    ))}
                  </div>
                </div>
             </div>
          ))}
        </div>

        {/* DESKTOP LAYOUT: Sidebar + Content */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-16">
          
          {/* Sidebar Navigation */}
          <div className="col-span-4 flex flex-col gap-3">
             {cases.map((item) => {
               const isActive = activeId === item.id;
               return (
                 <button
                   key={item.id}
                   onClick={() => setActiveId(item.id)}
                   className={`group w-full text-left p-6 rounded-2xl transition-all duration-300 border relative overflow-hidden ${
                     isActive 
                       ? 'bg-charcoal dark:bg-wheat border-charcoal dark:border-wheat shadow-lg scale-[1.02]' 
                       : 'bg-cream dark:bg-white/5 border-transparent hover:bg-wheat/20 dark:hover:bg-white/10'
                   }`}
                 >
                    <div className="flex items-start justify-between mb-4">
                       <div className={`p-3 rounded-xl transition-colors ${
                         isActive 
                           ? 'bg-wheat/20 dark:bg-charcoal/10 text-wheat dark:text-charcoal' 
                           : 'bg-white/50 dark:bg-white/5 text-charcoal/60 dark:text-wheat/60'
                       }`}>
                          <item.icon size={24} />
                       </div>
                       {isActive && (
                         <motion.div layoutId="activeIndicator">
                            <ChevronRight className="text-wheat dark:text-charcoal" />
                         </motion.div>
                       )}
                    </div>
                    
                    <h3 className={`font-serif text-xl mb-1 transition-colors ${
                       isActive ? 'text-wheat dark:text-charcoal' : 'text-charcoal dark:text-wheat'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs font-medium uppercase tracking-wider transition-colors ${
                       isActive ? 'text-wheat/60 dark:text-charcoal/60' : 'text-clay'
                    }`}>
                      {item.subtitle}
                    </p>
                 </button>
               );
             })}
          </div>

          {/* Active Content Display */}
          <div className="col-span-8 min-h-[500px]">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeCase.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="bg-cream dark:bg-[#1A1A1A] rounded-[2.5rem] p-3 shadow-2xl border border-wheat/20 dark:border-white/5 h-full flex flex-col"
                >
                   {/* Image Area */}
                   <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden mb-6 group">
                      <div className="absolute inset-0 bg-charcoal/10 dark:bg-charcoal/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      <img 
                        src={activeCase.thumbnail} 
                        alt={activeCase.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Floating Stats Card */}
                      <div className="absolute bottom-8 right-8 z-20 bg-white/90 dark:bg-charcoal/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-lg max-w-[240px]">
                         <div className="flex items-center gap-3 mb-2">
                            <div className="p-1.5 bg-green-500/10 rounded-full">
                               <TrendingUp size={16} className="text-green-600 dark:text-green-400" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wide text-charcoal/50 dark:text-white/50">Impact</span>
                         </div>
                         <p className="text-charcoal dark:text-cream font-medium leading-tight">
                            {activeCase.outcome}
                         </p>
                      </div>
                   </div>

                   {/* Text Content */}
                   <div className="px-6 pb-6 flex-1 flex flex-col">
                      <div className="mb-8">
                         <h3 className="font-serif text-3xl text-charcoal dark:text-wheat mb-4">
                            {activeCase.title}
                         </h3>
                         <p className="text-charcoal/70 dark:text-white/60 leading-relaxed text-lg">
                            {activeCase.description}
                         </p>
                      </div>

                      {/* Features Grid */}
                      <div className="mt-auto">
                         <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal/30 dark:text-white/30 mb-4 flex items-center gap-2">
                            <LayoutTemplate size={14} /> System Capabilities
                         </h4>
                         <div className="flex flex-wrap gap-3">
                            {activeCase.features.map((feature, idx) => (
                               <span 
                                 key={idx} 
                                 className="px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-wheat/20 dark:border-white/10 text-sm text-charcoal/80 dark:text-wheat/80 flex items-center gap-2"
                               >
                                  <CheckCircle2 size={14} className="text-clay" />
                                  {feature}
                               </span>
                            ))}
                         </div>
                      </div>
                   </div>
                </motion.div>
             </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CaseStudies;