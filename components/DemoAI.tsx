import React, { useState } from 'react';
import { generateCreativeContent } from '../services/geminiService';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const DemoAI: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');
    
    // Simulate "thinking" visuals
    const result = await generateCreativeContent(input);
    
    setLoading(false);
    setResponse(result);
  };

  return (
    <section id="demo" className="py-24 px-6 bg-gradient-to-b from-white to-cream dark:from-soft-black dark:to-deep-night transition-colors duration-500">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-clay/10 rounded-full mb-6">
             <Sparkles className="w-6 h-6 text-clay" />
          </div>
          <h2 className="font-serif text-4xl text-charcoal dark:text-cream mb-4 transition-colors">Experience Loop Mafia Intelligence</h2>
          <p className="text-charcoal/60 dark:text-white/50 transition-colors">
            Interact with our Gemini-powered engine. Ask it to draft an email, summarize a concept, or brainstorm an automation idea.
          </p>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-[2rem] shadow-2xl border border-sand/40 dark:border-white/5 overflow-hidden p-2 md:p-4 transition-colors duration-500">
          <div className="bg-sand/10 dark:bg-white/5 rounded-[1.5rem] p-6 min-h-[200px] flex flex-col justify-center items-center text-center relative transition-colors">
             {loading ? (
                <div className="flex flex-col items-center animate-pulse">
                   <Loader2 className="w-8 h-8 text-clay animate-spin mb-4" />
                   <span className="text-charcoal/50 dark:text-white/50 text-sm font-medium">Processing your request...</span>
                </div>
             ) : response ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="prose prose-lg text-charcoal dark:text-cream"
                >
                  "{response}"
                </motion.div>
             ) : (
                <span className="text-charcoal/30 dark:text-white/20 font-serif italic text-xl transition-colors">
                  "How can I help you automate your day?"
                </span>
             )}
          </div>

          <div className="mt-4 flex items-center bg-white dark:bg-black/20 border border-sand dark:border-white/10 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-clay/20 transition-all">
             <input 
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="E.g., Write a polite rejection email for a vendor..."
               className="flex-1 bg-transparent border-none outline-none text-charcoal dark:text-white placeholder-charcoal/30 dark:placeholder-white/30 py-3 px-2 font-medium"
               onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
             />
             <button 
               onClick={handleGenerate}
               disabled={loading || !input.trim()}
               className="bg-charcoal dark:bg-cream text-cream dark:text-charcoal p-3 rounded-full hover:bg-clay dark:hover:bg-clay hover:scale-110 transition-all disabled:opacity-50 disabled:hover:scale-100"
             >
                <Send className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoAI;