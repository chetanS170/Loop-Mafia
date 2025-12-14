import React from 'react';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-cream pt-20 pb-10 px-6 border-t border-wheat/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
           <span className="font-serif text-2xl font-semibold text-wheat">Loop Mafia.</span>
           <p className="mt-4 text-white/40 text-sm leading-relaxed">
             Premium automation solutions for forward-thinking enterprises.
           </p>
        </div>
        
        <div>
          <h4 className="font-serif text-lg mb-6 text-clay">Explore</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li><a href="#services" className="hover:text-wheat transition-colors">Services</a></li>
            <li><a href="#work" className="hover:text-wheat transition-colors">Case Studies</a></li>
            <li><a href="#about" className="hover:text-wheat transition-colors">About Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6 text-clay">Legal</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li><a href="#" className="hover:text-wheat transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-wheat transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        <div>
           <h4 className="font-serif text-lg mb-6 text-clay">Connect</h4>
           <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-clay hover:text-charcoal transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-clay hover:text-charcoal transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-clay hover:text-charcoal transition-all">
                <Instagram size={18} />
              </a>
           </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
        <p>© 2024 Loop Mafia. All rights reserved.</p>
        <p>Designed with Intelligence.</p>
      </div>
    </footer>
  );
};

export default Footer;