import React from 'react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Eleanor P.',
    role: 'CEO',
    company: 'Vanguard Logistics',
    quote: "Loop Mafia didn't just automate our systems; they gave us our weekends back. The AI agents are indistinguishable from human staff.",
    avatar: 'https://picsum.photos/100/100?random=10',
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Director of Sales',
    company: 'Apex Solutions',
    quote: "Our lead response time went from 4 hours to 4 seconds. The ROI was evident within the first week of deployment.",
    avatar: 'https://picsum.photos/100/100?random=11',
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    role: 'Founder',
    company: 'Botique Studios',
    quote: "Elegant, robust, and incredibly effective. The team at Loop Mafia understands that technology should serve people, not the other way around.",
    avatar: 'https://picsum.photos/100/100?random=12',
  },
  {
    id: '4',
    name: 'David Ross',
    role: 'CTO',
    company: 'FinTech Flow',
    quote: "Security was our main concern. Loop Mafia's implementation was enterprise-grade from day one. Truly impressive engineering.",
    avatar: 'https://picsum.photos/100/100?random=13',
  },
  {
    id: '5',
    name: 'Elena Rodriguez',
    role: 'VP Operations',
    company: 'ScaleUp Inc',
    quote: "We replaced three disparate tools with one Loop Mafia custom bot. The efficiency gains are mathematically impossible to ignore.",
    avatar: 'https://picsum.photos/100/100?random=14',
  },
  {
    id: '6',
    name: 'James Foster',
    role: 'Head of Growth',
    company: 'Novus Media',
    quote: "Content production used to be our bottleneck. Now it's our competitive advantage. Loop Mafia's content engine is pure magic.",
    avatar: 'https://picsum.photos/100/100?random=15',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-cream dark:bg-deep-night relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-charcoal dark:text-cream mb-4 transition-colors">Trusted by Visionaries</h2>
        <p className="text-charcoal/60 dark:text-wheat/50">Partners who redefined their industries with Loop Mafia.</p>
      </div>

      {/* Scroll Container with Fade Masks */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Gradients for fade effect */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cream dark:from-deep-night to-transparent z-10 pointer-events-none transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cream dark:from-deep-night to-transparent z-10 pointer-events-none transition-colors duration-500" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
          
          {/* Column 1 - Scroll Down */}
          <div className="flex flex-col gap-8 animate-scroll hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, idx) => (
               <TestimonialCard key={`col1-${t.id}-${idx}`} testimonial={t} />
            ))}
          </div>

          {/* Column 2 - Scroll Up (Reverse) */}
          <div className="hidden md:flex flex-col gap-8 animate-scroll-reverse hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].reverse().map((t, idx) => (
               <TestimonialCard key={`col2-${t.id}-${idx}`} testimonial={t} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-white dark:bg-soft-black p-8 rounded-[2rem] border border-wheat/30 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-clay/30 transition-all duration-300">
    <div className="flex items-center space-x-4 mb-6">
      <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover border-2 border-wheat/50" />
      <div>
        <h4 className="font-serif text-lg text-charcoal dark:text-wheat font-medium">{testimonial.name}</h4>
        <p className="text-xs text-charcoal/40 dark:text-white/40 uppercase tracking-wider">{testimonial.role}, {testimonial.company}</p>
      </div>
    </div>
    <p className="text-charcoal/80 dark:text-white/70 leading-relaxed italic">
      "{testimonial.quote}"
    </p>
  </div>
);

export default Testimonials;