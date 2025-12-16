import React from 'react';
import { Banana } from 'lucide-react';

interface Tool {
  name: string;
  type: 'svg' | 'img' | 'icon';
  src?: string; // For images/svgs
  slug?: string; // For SimpleIcons
  domain?: string; // For Favicons
  icon?: React.ElementType; // For Lucide icons
  color: string; // Brand color for glow
}

const tools: Tool[] = [
  { name: 'n8n', type: 'svg', slug: 'n8n', color: '#EA4B71' },
  { name: 'Vapi', type: 'img', domain: 'vapi.ai', color: '#7C3AED' }, // Assuming purple/violet
  { name: 'Google Cloud', type: 'svg', slug: 'googlecloud', color: '#4285F4' },
  { name: 'Gemini', type: 'svg', slug: 'googlegemini', color: '#4E8EF7' },
  { name: 'Nano Banana', type: 'icon', icon: Banana, color: '#FFE135' }, 
  { name: 'OpenRouter', type: 'img', domain: 'openrouter.ai', color: '#3B82F6' },
  { name: 'Apify', type: 'img', domain: 'apify.com', color: '#95D0F5' },
  { name: 'Apollo', type: 'img', domain: 'apollo.io', color: '#FF9A3C' }, 
  { name: 'Supabase', type: 'svg', slug: 'supabase', color: '#3ECF8E' },
];

const ToolsStack: React.FC = () => {
  // Helper to get image source
  const getSource = (tool: Tool) => {
    if (tool.type === 'svg' && tool.slug) {
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
        <div className="absolute top-0 left-0 h-full w-12 md:w-48 bg-gradient-to-r from-deep-night to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-12 md:w-48 bg-gradient-to-l from-deep-night to-transparent z-20 pointer-events-none" />

        {/* Scrolling Container */}
        <div className="flex w-fit animate-scroll-x hover:[animation-play-state:paused] items-center">
          {/* Triple list for seamless loop */}
          {[...tools, ...tools, ...tools].map((tool, index) => (
            <div 
              key={`${tool.name}-${index}`} 
              className="flex-shrink-0 mx-12 md:mx-20 group"
            >
              <div className="flex flex-col items-center gap-4 transition-all duration-500 hover:scale-110 cursor-default">
                
                {/* Logo Rendering */}
                <div className="h-12 w-12 md:h-16 md:w-16 flex items-center justify-center relative">
                  
                  {/* Dynamic Glow for ALL icons - always visible but stronger on hover */}
                  <div 
                    className="absolute inset-0 blur-xl rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ backgroundColor: tool.color }}
                  />

                  {tool.type === 'icon' && tool.icon ? (
                    <div className="relative z-10">
                       <tool.icon 
                        className="w-10 h-10 md:w-12 md:h-12 drop-shadow-lg" 
                        style={{ color: tool.color }}
                        fill="currentColor" 
                        strokeWidth={1.5}
                       />
                    </div>
                  ) : (
                    <div className="relative z-10 w-full h-full p-1">
                      <img 
                        src={getSource(tool)}
                        alt={tool.name}
                        className="w-full h-full object-contain drop-shadow-md transition-all duration-500"
                      />
                    </div>
                  )}
                </div>

                <span 
                  className="text-wheat/60 font-sans font-medium text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0"
                >
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