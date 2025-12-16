import React from 'react';
import { Calendar, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Booking: React.FC = () => {
  const expectations = [
    "Understand your current challenges and goals",
    "Identify automation opportunities in your workflow",
    "Discuss MVP validation strategies for your market",
    "Outline potential solutions and realistic timelines",
    "Define success metrics and ROI expectations"
  ];

  return (
    <section id="booking" className="py-32 px-6 md:px-12 bg-deep-night relative overflow-hidden text-cream border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-clay/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-wheat/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* Left Column: Expectations List */}
        <div className="space-y-10">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-cream leading-tight">
              What to Expect <br/>
              <span className="text-wheat italic">in Your Call</span>
            </h2>
            <p className="text-white/50 text-lg max-w-md">
              No sales pressure. Just a clear roadmap for your automation journey.
            </p>
          </div>

          <div className="space-y-6">
            {expectations.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 group"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-clay group-hover:border-clay transition-colors duration-200">
                  <Check className="w-4 h-4 text-wheat group-hover:text-charcoal transition-colors duration-200" />
                </div>
                <span className="text-lg text-white/80 font-light pt-0.5 group-hover:text-white transition-colors duration-200">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Booking Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Card Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-wheat/20 to-clay/5 blur-2xl -z-10 transform scale-105 opacity-50" />
          
          <div className="bg-[#141414] border border-white/10 rounded-[2.5rem] p-10 md:p-12 text-center shadow-2xl relative overflow-hidden">
             
             {/* Card Highlight */}
             <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

             <div className="mb-8 relative inline-block">
                <div className="w-20 h-20 bg-gradient-to-tr from-wheat to-clay rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(196,164,132,0.3)] mb-2 mx-auto">
                   <Calendar className="w-8 h-8 text-charcoal" strokeWidth={2.5} />
                </div>
             </div>

             <h3 className="font-serif text-3xl text-white mb-3">Discovery Call</h3>
             <p className="text-white/50 mb-10 tracking-wide text-sm font-medium uppercase">
               30 Minutes • Free Consultation
             </p>

             <a 
               href="https://cal.com/chetansharma"
               target="_blank"
               rel="noopener noreferrer"
               className="group relative w-full flex items-center justify-center gap-3 py-4 px-8 rounded-full bg-transparent border border-wheat/30 text-wheat hover:bg-wheat hover:text-charcoal transition-all duration-200 overflow-hidden hover:scale-105"
             >
                <span className="font-bold tracking-wide z-10">Book Discovery Call</span>
                <ArrowRight className="w-5 h-5 z-10 group-hover:translate-x-1 transition-transform duration-200" />
                
                {/* Subtle fill effect on hover if desired, or rely on simple bg change */}
             </a>

             <p className="mt-6 text-xs text-white/30">
               Limited slots available for new clients.
             </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Booking;