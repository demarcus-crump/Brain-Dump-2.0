
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { BrainDumpResult, ConversationMessage } from '../types';
import AgentDisplay from './AgentDisplay';
import { AGENT_ORDER, AGENTS } from '../constants';
import { Sparkles, RefreshCw, CheckCircle, Send, MessageCircle, ThumbsUp, RotateCcw, Trophy, Target, Award } from 'lucide-react';
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
  const [score, setScore] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isRefining]);

  // Score Counting Animation
  useEffect(() => {
    if (result.clarityScore) {
        let start = 0;
        const end = result.clarityScore;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);
            
            setScore(Math.floor(start + (end - start) * ease));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }
  }, [result.clarityScore]);

  const handleSend = () => {
    if (!chatInput.trim() || isRefining) return;
    onRefine(chatInput);
    setChatInput('');
  };

  const triggerCelebration = () => {
    setConfettiKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 pt-24 pb-12 w-full max-w-5xl mx-auto relative z-10">
      
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        
        {/* LEFT COLUMN: The Report Card */}
        <div className="md:col-span-2 space-y-6">
            <LayoutGroup>
                <motion.div 
                layout 
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="w-full bg-bg-surface rounded-[2rem] p-8 shadow-2xl border border-bg-elevated relative overflow-hidden"
                >
                {isRefining && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-20 flex items-center justify-center transition-all duration-300">
                        <div className="bg-bg-deep px-6 py-3 rounded-full border border-agent-blendy text-agent-blendy flex items-center gap-2 animate-pulse shadow-lg">
                            <Sparkles size={16} />
                            <span className="font-bold tracking-wide">Refining Plan...</span>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="bg-agent-linky/10 p-2 rounded-full"
                    >
                       <Target className="w-6 h-6 text-agent-linky" />
                    </motion.div>
                    <h2 className="font-display text-2xl text-white">Mission Report</h2>
                </div>

                {/* Interpretation */}
                <div className="text-xl font-body leading-relaxed mb-8 text-text-primary border-b border-bg-elevated pb-8">
                    <TypewriterText text={result.interpretation} />
                </div>

                {/* Action Items */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-4">Key Directives</h3>
                    <AnimatePresence mode="popLayout">
                        {result.keyPoints.map((point, idx) => (
                        <motion.div
                            layout
                            key={`${idx}-${point.substring(0, 10)}`} 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className="bg-bg-elevated/50 p-4 rounded-xl border-l-4 font-body text-text-secondary flex gap-4 items-start hover:bg-bg-elevated transition-colors"
                            style={{ borderLeftColor: AGENTS[AGENT_ORDER[idx % AGENT_ORDER.length]].color }}
                        >
                            <span className="font-display opacity-50 text-xl" style={{ color: AGENTS[AGENT_ORDER[idx % AGENT_ORDER.length]].color }}>0{idx + 1}</span>
                            <span>{point}</span>
                        </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                </motion.div>
            </LayoutGroup>
        </div>

        {/* RIGHT COLUMN: Gamification Stats */}
        <div className="md:col-span-1 space-y-6">
            
            {/* Clarity Score Card */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-bg-elevated rounded-[2rem] p-6 text-center border border-white/5 relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-agent-blendy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-text-muted text-sm font-bold uppercase tracking-widest mb-2">Clarity Score</h3>
                <div className="relative flex items-center justify-center py-4">
                    {/* Radial Background */}
                    <div className="absolute inset-0 bg-agent-blendy/20 blur-2xl rounded-full scale-75 animate-pulse" />
                    <div className="font-display text-6xl md:text-7xl text-white z-10 relative">
                        {score}<span className="text-3xl align-top">%</span>
                    </div>
                </div>
                <div className="w-full bg-bg-deep h-2 rounded-full overflow-hidden mt-2">
                    <motion.div 
                        className="h-full bg-gradient-to-r from-agent-listie to-agent-blendy"
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    />
                </div>
            </motion.div>

            {/* Badges Card */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-bg-elevated rounded-[2rem] p-6 border border-white/5"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Award className="text-agent-wordy" size={20} />
                    <h3 className="text-text-muted text-sm font-bold uppercase tracking-widest">Badges Unlocked</h3>
                </div>
                
                <div className="flex flex-col gap-3">
                    {result.badges?.map((badge, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1 + (idx * 0.2), type: "spring" }}
                            className="bg-bg-deep p-3 rounded-xl border border-white/10 flex items-center gap-3 shadow-sm"
                        >
                            <div className="bg-gradient-to-br from-agent-sparky to-agent-listie w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md">
                                <Trophy size={16} />
                            </div>
                            <span className="font-bold text-white tracking-wide">{badge}</span>
                        </motion.div>
                    )) || (
                        <p className="text-text-muted text-xs">No badges awarded.</p>
                    )}
                </div>
            </motion.div>

            {/* Actions */}
             <div className="flex flex-col gap-3">
                <MagneticButton 
                onClick={triggerCelebration}
                className="w-full py-4 bg-[#00E5B8] text-bg-deep font-display text-lg tracking-wide rounded-2xl shadow-lg hover:-translate-y-1 transition-transform flex items-center justify-center gap-2"
                >
                <ThumbsUp size={20} strokeWidth={3} />
                ACCEPT
                </MagneticButton>

                <MagneticButton 
                onClick={onReset}
                className="w-full py-4 bg-transparent border-2 border-white/20 text-white font-display text-lg tracking-wide rounded-2xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                <RotateCcw size={20} strokeWidth={3} />
                RESET
                </MagneticButton>
             </div>
        </div>

      </div>

        {/* BOTTOM: Conversation Stream */}
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-4 mt-12 border-t border-bg-elevated pt-8">
            <div className="flex items-center justify-center gap-2 mb-4">
                 <div className="h-[1px] bg-bg-elevated w-12" />
                 <span className="text-text-muted text-xs font-bold uppercase tracking-widest">Refine with Blendy</span>
                 <div className="h-[1px] bg-bg-elevated w-12" />
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto px-2 custom-scrollbar">
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
            <div className="relative group mt-2">
                <div className="absolute inset-0 bg-gradient-to-r from-agent-listie to-agent-blendy rounded-full opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-500" />
                <div className="relative bg-bg-surface/90 backdrop-blur-md border border-bg-elevated rounded-full flex items-center p-2 shadow-xl">
                    <input 
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Refine the plan... (e.g. 'Make step 3 simpler')"
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
  );
};

export default ResultReveal;
