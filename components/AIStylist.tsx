
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFashionAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIStylist: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Workaround for framer-motion type mismatch in the environment
  const MotionDiv = motion.div as any;
  const MotionButton = motion.button as any;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const aiResponse = await getFashionAdvice(input);
    const aiMsg: ChatMessage = { role: 'model', text: aiResponse || 'My apologies, I am unable to assist at this moment.' };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <MotionDiv 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-80 md:w-96 h-[550px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-3xl border border-zinc-100 flex flex-col overflow-hidden mb-4"
          >
            <div className="bg-zinc-900 p-6 flex justify-between items-center">
              <div>
                <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold">Arbaz Concierge</h3>
                <div className="flex items-center mt-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>
                  <span className="text-[9px] text-zinc-400 uppercase">Always Active</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-white no-scrollbar">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  </div>
                  <p className="text-zinc-400 text-[11px] uppercase tracking-widest leading-loose">
                    Welcome to the Arbaz Atelier.<br/>How may I curate your look today?
                  </p>
                </div>
              )}
              {messages.map((m, i) => (
                <MotionDiv 
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-[13px] leading-relaxed ${
                    m.role === 'user' 
                    ? 'bg-zinc-900 text-white rounded-tr-none shadow-lg' 
                    : 'bg-zinc-50 border border-zinc-100 text-zinc-700 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </MotionDiv>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-50 px-4 py-3 rounded-2xl rounded-tl-none border border-zinc-100">
                    <div className="flex space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-white border-t border-zinc-50 flex space-x-3">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Style query..."
                className="flex-1 bg-zinc-50 border-none rounded-xl px-5 py-3 text-[13px] focus:ring-1 focus:ring-zinc-900 outline-none transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-zinc-900 text-white w-11 h-11 rounded-xl flex items-center justify-center hover:bg-zinc-800 disabled:opacity-50 transition-all shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
      
      <MotionButton 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-900 text-white w-16 h-16 rounded-full shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] flex items-center justify-center group relative overflow-hidden"
      >
        <span className="absolute inset-0 bg-zinc-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
        <svg className="relative z-10 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
      </MotionButton>
    </div>
  );
};

export default AIStylist;
