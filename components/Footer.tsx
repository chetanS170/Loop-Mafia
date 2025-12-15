import React from 'react';
import { Linkedin, Twitter, Instagram, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal dark:bg-[#050505] text-cream pt-24 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Background Text Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
         <span className="text-[20vw] font-serif font-bold leading-none text-white whitespace-nowrap absolute -top-10 -left-10 select-none">
            AUTOMATE
         </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-5 pr-8">
             <a href="#" className="inline-block mb-6 group">
                <span className="font-serif text-3xl md:text-4xl font-semibold text-wheat">Loop <span className="italic text-clay">Mafia.</span></span>
             </a>
             <p className="text-white/50 text-base leading-relaxed mb-8 max-w-sm">
               Engineering the future of work with custom AI agents and automation infrastructures.
             </p>
             <div className="flex gap-4">
                <SocialLink icon={Linkedin} href="#" />
                <SocialLink icon={Twitter} href="#" />
                <SocialLink icon={Instagram} href="#" />
             </div>
          </div>
          
          {/* Links Column 1 */}
          <div className="col-span-1 md:col-span-2 md:col-start-7">
            <h4 className="font-sans font-bold text-sm tracking-widest uppercase text-clay mb-6">Explore</h4>
            <ul className="space-y-4">
              <FooterLink href="#services">Services</FooterLink>
              <FooterLink href="#process">Our Process</FooterLink>
              <FooterLink href="#work">Case Studies</FooterLink>
              <FooterLink href="#testimonials">Testimonials</FooterLink>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-sans font-bold text-sm tracking-widest uppercase text-clay mb-6">Company</h4>
            <ul className="space-y-4">
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms</FooterLink>
            </ul>
          </div>

          {/* CTA Column */}
          <div className="col-span-1 md:col-span-2">
             <h4 className="font-sans font-bold text-sm tracking-widest uppercase text-clay mb-6">Start Now</h4>
             <a href="#booking" className="group flex items-center gap-2 text-wheat hover:text-white transition-colors">
                <span className="text-lg font-medium border-b border-wheat/30 group-hover:border-white pb-0.5">Book a Call</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
             </a>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20 font-medium tracking-wide">
          <p>© 2024 Loop Mafia Inc.</p>
          <div className="flex items-center gap-6">
             <span>San Francisco, CA</span>
             <span className="w-1 h-1 rounded-full bg-white/20" />
             <span>Designed with Intelligence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <li>
    <a href={href} className="text-white/60 hover:text-wheat transition-colors text-sm font-medium">
      {children}
    </a>
  </li>
);

const SocialLink: React.FC<{ icon: React.ElementType; href: string }> = ({ icon: Icon, href }) => (
  <a href={href} className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-wheat hover:text-charcoal hover:border-wheat transition-all duration-300">
    <Icon size={18} />
  </a>
);

export default Footer;