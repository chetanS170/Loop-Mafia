import React from 'react';
import { Mic, Rocket, Zap, Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceItem {
  id: string;
  category: string;
  headline: string;
  description: string;
  features: string[];
  cta: string;
  icon: React.ElementType;
  isPopular?: boolean;
  delay: number;
}

const services: ServiceItem[] = [
  {
    id: 'mvp',
    category: 'Custom Software',
    headline: 'AI Web Apps',
    description: 'We build fast, scalable applications tailored to your business needs using the latest AI frameworks.',
    features: [
      'Launch in 3-4 Weeks',
      'Secure & Scalable',
      'Custom Dashboards',
      'Modern Tech Stack'
    ],
    cta: 'Start Building',
    icon: Rocket,
    delay: 0.2
  },
  {
    id: 'voice',
    category: '24/7 Support',
    headline: 'Voice Agents',
    description: 'Replace expensive call centers with human-like AI agents that handle bookings, support, and sales.',
    features: [
      'Instant Response Time',
      'Handles 1000+ Calls/hr',
      'Syncs with Calendar/CRM',
      'Natural Conversation'
    ],
    cta: 'Book a Demo',
    icon: Mic,
    isPopular: true,
    delay: 0
  },
  {
    id: 'automation',
    category: 'Operations',
    headline: 'Workflows',
    description: 'Stop data entry. We connect your apps (Email, Slack, CRM) to run on autopilot.',
    features: [
      'Eliminate Manual Data Entry',
      'Lead Processing',
      'Automated Reporting',
      'Error-Free Operations'
    ],
    cta: 'Get Started',
    icon: Zap,
    delay: 0.3
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 px-6 md:px-12 bg-cream dark:bg-deep-night relative overflow-hidden transition-colors duration-500">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-wheat/20 dark:bg-wheat/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-clay/10 dark:bg-clay/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-charcoal/5 dark:border-white/10 mb-6"
          >
            <Sparkles size={14} className="text-clay" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-charcoal/60 dark:text-wheat/80">
              Our Expertise
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl text-charcoal dark:text-cream mb-6"
          >
            We Solve Problems.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-charcoal/70 dark:text-wheat/50 max-w-xl mx-auto text-lg leading-relaxed font-medium"
          >
            Three core services to modernize your business and cut operational costs.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {services.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{ item: ServiceItem }> = ({ item }) => {
  const isPopular = item.isPopular;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: item.delay, duration: 0.5 }}
      className={`relative flex flex-col p-8 md:p-10 rounded-[2.5rem] transition-all duration-300 group h-full
        bg-white dark:bg-[#141414] text-charcoal dark:text-white border border-wheat/30 dark:border-white/10 shadow-xl shadow-clay/5 hover:border-clay/50 hover:shadow-2xl hover:shadow-clay/10
        ${isPopular ? 'lg:-mt-8 lg:mb-8 border-2 border-clay shadow-2xl shadow-clay/20 z-10' : ''}
      `}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-clay to-wheat rounded-full shadow-lg">
          <span className="text-xs font-bold uppercase tracking-widest text-charcoal">Most Popular</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        {/* Shimmer-style Icon Container */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 
          bg-charcoal text-wheat border border-white/10 shadow-[inset_0_-4px_4px_rgba(255,255,255,0.1)]
          ${isPopular ? 'shadow-[inset_0_-4px_8px_rgba(196,164,132,0.2)] border-clay/30' : ''}
          `}
        >
          <item.icon size={28} className="drop-shadow-md" />
        </div>
        
        <h3 className={`font-serif text-3xl mb-2 text-charcoal dark:text-wheat transition-colors`}>
          {item.headline}
        </h3>
        <p className={`text-xs font-bold uppercase tracking-widest mb-4 opacity-60`}>
          {item.category}
        </p>
        <p className={`leading-relaxed text-base text-charcoal/70 dark:text-white/60`}>
          {item.description}
        </p>
      </div>

      {/* Divider */}
      <div className={`h-px w-full mb-6 bg-charcoal/5 dark:bg-white/5`} />

      {/* Features List */}
      <ul className="space-y-3 mb-8 flex-grow">
        {item.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check size={18} className={`mt-0.5 flex-shrink-0 text-clay`} />
            <span className={`text-sm font-medium text-charcoal/80 dark:text-white/80`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <div className="mt-auto">
        <a 
          href="#booking"
          className={`w-full py-3.5 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-200 border hover:scale-105
            bg-transparent border-charcoal/10 dark:border-white/10 hover:bg-charcoal dark:hover:bg-wheat text-charcoal dark:text-white hover:text-wheat dark:hover:text-charcoal`}
        >
          {item.cta}
          <ArrowRight size={18} />
        </a>
      </div>
    </motion.div>
  );
};

export default Services;