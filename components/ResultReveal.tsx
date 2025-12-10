
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { BrainDumpResult, ConversationMessage } from '../types';
import AgentDisplay from './AgentDisplay';
import { AGENT_ORDER, AGENTS } from '../constants';
import { Sparkles, RefreshCw, CheckCircle, Send, MessageCircle, ThumbsUp, RotateCcw } from 'lucide-react';
import MagneticButton from './MagneticButton';
import Confetti from './Confetti';
import TypewriterText from './TypewriterText';

interface ResultRevealProps {
  result: BrainDumpResult;
  onReset: () => void;
  onRefine: (msg: string) => void;
  chatHistory: ConversationMessage[];
  isRefining: boolean;
}

const ResultReveal: React.FC<ResultRevealProps> = ({ result, onReset, onRefine, chatHistory, isRefining }) => {
  const [chatInput, setChatInput] = useState('');
  const [confettiKey, setConfettiKey] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isRefining]);

  const handleSend = () => {
    if (!chatInput.trim() || isRefining) return;
    onRefine(chatInput);
    setChatInput('');
  };

  const triggerCelebration = () => {
    setConfettiKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 pt-24 pb-12 w-full max-w-4xl mx-auto relative z-10">
      
      <Confetti key={confettiKey} />

      {/* Celebration Header - Agents Dancing */}
      <div className="flex justify-center gap-4 mb-8">
        {AGENT_ORDER.map((id, index) => (
          <motion.div
            key={id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: isRefining ? [0, -10, 0] : [0, -20, 0], 
              opacity: 1,
              rotate: isRefining ? 0 : [0, -10, 10, 0]
            }}
            transition={{ 
              delay: index * 0.1,
              y: { repeat: Infinity, duration: isRefining ? 0.5 : 2, repeatDelay: isRefining ? 0 : 1 },
              rotate: { repeat: Infinity, duration: 2, repeatDelay: 1 }
            }}
          >
            <AgentDisplay id={id} state={isRefining ? 'working' : 'complete'} scale={0.8} showLabel={false} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 w-full">
        {/* LEFT/TOP: The Living Result Card */}
        <LayoutGroup>
        <motion.div 
          layout // Enables smooth resizing when content changes
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="w-full bg-bg-surface rounded-[2rem] p-8 md:p-12 shadow-2xl border border-bg-elevated relative overflow-hidden"
        >
          {isRefining && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-20 flex items-center justify-center transition-all duration-300">
                <div className="bg-bg-deep px-6 py-3 rounded-full border border-agent-blendy text-agent-blendy flex items-center gap-2 animate-pulse shadow-lg">
                    <Sparkles size={16} />
                    <span className="font-bold tracking-wide">Refining Plan...</span>
                </div>
            </div>
          )}

          {/* Glow effect */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-agent-blendy/20 blur-3xl rounded-full pointer-events-none" />

          <div className="flex items-center gap-4 mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <CheckCircle className="w-8 h-8 text-agent-linky" />
            </motion.div>
            <h2 className="font-display text-2xl md:text-3xl text-white">Here's the plan...</h2>
          </div>

          {/* Kinetic Typography Interpretation */}
          <div className="text-lg md:text-2xl font-body leading-loose mb-12 text-text-primary">
            <TypewriterText text={result.interpretation} />
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
                {result.keyPoints.map((point, idx) => (
                <motion.div
                    layout
                    key={`${idx}-${point.substring(0, 10)}`} // Unique key per change
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="bg-bg-elevated p-6 rounded-xl border-l-4 font-body text-text-secondary shadow-md hover:translate-x-1 transition-transform leading-relaxed"
                    style={{ borderLeftColor: AGENTS[AGENT_ORDER[idx % AGENT_ORDER.length]].color }}
                >
                    {point}
                </motion.div>
                ))}
            </AnimatePresence>
          </div>

          {/* PRD Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-16 justify-center items-center">
             <MagneticButton 
               onClick={triggerCelebration}
               className="px-8 py-4 bg-[#00E5B8] text-bg-deep font-display text-lg tracking-wide rounded-full shadow-[4px_4px_0_rgba(0,0,0,0.2)] hover:shadow-[8px_8px_0_rgba(0,0,0,0.25)] hover:-translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.2)] active:translate-y-1 transition-all flex items-center gap-2"
             >
               <ThumbsUp size={24} strokeWidth={2.5} />
               YES! NAILED IT
             </MagneticButton>

             <MagneticButton 
               onClick={onReset}
               className="px-8 py-4 bg-transparent border-[3px] border-white text-white font-display text-lg tracking-wide rounded-full shadow-[4px_4px_0_rgba(0,0,0,0.2)] hover:bg-white hover:text-bg-deep hover:shadow-[8px_8px_0_rgba(255,255,255,0.25)] hover:-translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.2)] active:translate-y-1 transition-all flex items-center gap-2"
             >
               <RotateCcw size={24} strokeWidth={2.5} />
               TRY AGAIN
             </MagneticButton>
          </div>

        </motion.div>
        </LayoutGroup>

        {/* BOTTOM: Conversation Stream */}
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-4 mt-8">
            {/* Validation Text */}
            <div className="text-center text-text-muted text-sm font-bold uppercase tracking-widest mb-2 opacity-60">
              Collaborate with the crew
            </div>

            <div className="space-y-4 max-h-[350px] overflow-y-auto px-2 custom-scrollbar">
                {chatHistory.map((msg, idx) => {
                    if (msg.type === 'update') {
                        return (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex justify-center my-4"
                            >
                                <span className="bg-agent-blendy/20 text-agent-blendy text-xs font-bold px-4 py-1.5 rounded-full border border-agent-blendy/50 flex items-center gap-2 shadow-[0_0_15px_rgba(123,92,255,0.2)]">
                                    <Sparkles size={12} /> PLAN UPDATED
                                </span>
                            </motion.div>
                        );
                    }
                    
                    return (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.role === 'agent' && (
                                <div className="w-8 h-8 rounded-full bg-agent-blendy flex items-center justify-center shrink-0 shadow-lg border border-white/10">
                                    <MessageCircle size={14} className="text-white" />
                                </div>
                            )}
                            <div className={`p-4 rounded-2xl max-w-[85%] text-base shadow-sm ${
                                msg.role === 'user' 
                                ? 'bg-[#3A3A5E] text-white rounded-tr-none border border-white/5' 
                                : 'bg-agent-blendy/10 border border-agent-blendy/30 text-text-secondary rounded-tl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </motion.div>
                    );
                })}
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-agent-listie to-agent-blendy rounded-full opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-500" />
                <div className="relative bg-bg-surface/80 backdrop-blur-md border border-bg-elevated rounded-full flex items-center p-2 shadow-xl">
                    <input 
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask for changes... (e.g. 'Make it shorter', 'Focus on marketing')"
                        className="flex-1 bg-transparent border-none focus:outline-none text-white px-6 py-2 placeholder-text-muted"
                        disabled={isRefining}
                    />
                    <MagneticButton 
                        onClick={handleSend}
                        disabled={isRefining || !chatInput.trim()}
                        className="w-10 h-10 rounded-full bg-white text-bg-deep flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-agent-blendy hover:text-white transition-colors"
                    >
                        {isRefining ? <RefreshCw className="animate-spin" size={18} /> : <Send size={18} />}
                    </MagneticButton>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResultReveal;
