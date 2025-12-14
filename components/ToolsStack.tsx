import React from 'react';
import { Cpu } from 'lucide-react';

interface Tool {
  name: string;
  type: 'svg' | 'img' | 'icon';
  src?: string; // For images/svgs
  slug?: string; // For SimpleIcons
  domain?: string; // For Favicons
  icon?: React.ElementType; // For Lucide icons
}

const tools: Tool[] = [
  { name: 'n8n', type: 'svg', slug: 'n8n' },
  { name: 'Vapi', type: 'img', domain: 'vapi.ai' },
  { name: 'Google Cloud', type: 'svg', slug: 'googlecloud' },
  { name: 'ChatGPT', type: 'svg', slug: 'openai' },
  { name: 'Gemini', type: 'svg', slug: 'googlegemini' },
  { name: 'Nano Banana', type: 'icon', icon: Cpu }, // Placeholder for custom tool
  { name: 'OpenRouter', type: 'img', domain: 'openrouter.ai' },
  { name: 'Apify', type: 'img', domain: 'apify.com' },
  { name: 'Apollo', type: 'img', domain: 'apollo.io' }, 
  { name: 'Supabase', type: 'svg', slug: 'supabase' },
];

const ToolsStack: React.FC = () => {
  // Helper to get image source
  const getSource = (tool: Tool) => {
    if (tool.type === 'svg' && tool.slug) {
      // Return original brand color URL (no hex code appended)
      return `https://cdn.simpleicons.org/${tool.slug}`;
    }
    if (tool.type === 'img') {
      if (tool.domain) {
        return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${tool.domain}&size=256`;
      }
      return tool.src;
    }
    return '';
  };

  return (
    <section className="py-24 bg-deep-night border-t border-white/5 border-b border-white/5 relative overflow-hidden">
      {/* Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-clay/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
        <h3 className="font-serif text-2xl md:text-3xl text-wheat opacity-90 mb-3">Powered By</h3>
        <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-medium">The architectural backbone of our intelligence</p>
      </div>

      <div className="relative w-full overflow-hidden py-4">
        {/* Fade Masks */}
        <div className="absolute top-0 left-0 h-full w-24 md:w-64 bg-gradient-to-r from-deep-night to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-24 md:w-64 bg-gradient-to-l from-deep-night to-transparent z-20 pointer-events-none" />

        {/* Scrolling Container */}
        <div className="flex w-fit animate-scroll-x hover:[animation-play-state:paused] items-center">
          {/* Triple list for seamless loop */}
          {[...tools, ...tools, ...tools].map((tool, index) => (
            <div 
              key={`${tool.name}-${index}`} 
              className="flex-shrink-0 mx-8 md:mx-12 group"
            >
              <div className="flex flex-col items-center gap-4 transition-all duration-500 group-hover:scale-110 cursor-default">
                
                {/* Logo Rendering */}
                <div className="h-12 w-12 md:h-16 md:w-16 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-wheat/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {tool.type === 'icon' && tool.icon ? (
                    <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-xl border border-white/10 group-hover:border-wheat/50 transition-colors">
                       <tool.icon className="w-8 h-8 text-wheat" />
                    </div>
                  ) : (
                    <img 
                      src={getSource(tool)}
                      alt={tool.name}
                      className={`w-full h-full object-contain drop-shadow-[0_0_15px_rgba(227,213,202,0.1)] transition-all duration-500 
                        grayscale brightness-[200%] contrast-[0.5] opacity-70 
                        group-hover:opacity-100 group-hover:brightness-100 group-hover:grayscale-0 group-hover:contrast-100
                      `}
                    />
                  )}
                </div>

                <span className="text-wheat/60 font-sans font-medium text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 transform">
                  {tool.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsStack;