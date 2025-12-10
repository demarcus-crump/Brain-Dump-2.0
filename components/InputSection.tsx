
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import AgentDisplay from './AgentDisplay';
import MagneticButton from './MagneticButton';

interface InputSectionProps {
  onDump: (text: string) => void;
  isProcessing: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onDump, isProcessing }) => {
  const [inputText, setInputText] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const fullPlaceholder = "Just start typing... your idea doesn't need to make sense yet. That's our job!";

  // Typewriter effect for placeholder
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullPlaceholder.length) {
        setPlaceholder(fullPlaceholder.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      if (inputText.trim() && !isProcessing) {
        onDump(inputText);
      }
    }
  };

  const hasContent = inputText.length > 0;

  return (
    <section id="input-section" className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-3xl relative">
        
        {/* Peeking Agents - Listie Left */}
        <motion.div 
          className="absolute hidden lg:block z-0 pointer-events-none"
          initial={{ x: -100, rotate: -20, opacity: 0 }}
          animate={{ 
            x: hasContent ? -90 : -120, 
            y: hasContent ? 0 : 20,
            rotate: hasContent ? -10 : -20,
            opacity: 1,
            scale: hasContent ? 1.1 : 1
          }}
          transition={{ type: "spring", stiffness: 100 }}
          style={{ top: '30%', left: '-80px' }}
        >
          <AgentDisplay id="listie" state={hasContent ? "working" : "idle"} scale={1.2} showLabel={false} />
        </motion.div>

        {/* Peeking Agents - Blendy Right */}
        <motion.div 
          className="absolute hidden lg:block z-0 pointer-events-none"
          initial={{ x: 100, rotate: 20, opacity: 0 }}
          animate={{ 
            x: hasContent ? 90 : 120, 
            y: hasContent ? 0 : 20,
            rotate: hasContent ? 10 : 20,
            opacity: 1,
            scale: hasContent ? 1.1 : 1
          }}
          transition={{ type: "spring", stiffness: 100 }}
          style={{ top: '30%', right: '-80px' }}
        >
          <AgentDisplay id="blendy" state={hasContent ? "working" : "idle"} scale={1.2} showLabel={false} />
        </motion.div>

        {/* The Card */}
        <motion.div 
          className="bg-bg-surface rounded-[2rem] p-2 relative z-10"
          initial={{ rotate: 2, opacity: 0, y: 50 }}
          whileInView={{ rotate: isFocused ? 0 : 2, opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            boxShadow: isFocused 
              ? '0 20px 50px -10px rgba(123, 92, 255, 0.3)' 
              : '12px 12px 0 rgba(0,0,0,0.2)'
          }}
        >
          {/* Gradient Border Glow */}
          <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br from-agent-listie via-transparent to-agent-blendy opacity-0 transition-opacity duration-500 pointer-events-none -z-10 ${isFocused ? 'opacity-100 blur-sm' : ''}`} />

          <div className="relative bg-bg-surface rounded-[1.8rem] overflow-hidden">
             <textarea
              ref={inputRef}
              className="w-full h-80 bg-bg-elevated/50 p-8 text-xl md:text-2xl text-white placeholder-text-muted/50 resize-none focus:outline-none focus:bg-bg-elevated transition-colors interactive font-body leading-relaxed"
              placeholder={placeholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
            />
            
            <div className="absolute bottom-6 right-6 z-20">
              <MagneticButton 
                onClick={() => onDump(inputText)}
                disabled={!inputText.trim() || isProcessing}
                className="interactive px-10 py-4 bg-gradient-to-r from-agent-listie to-agent-blendy text-white font-display text-xl rounded-full shadow-lg hover:shadow-xl flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="group-hover:translate-x-1 transition-transform inline-block">DUMP IT!</span>
              </MagneticButton>
            </div>
            
            {/* Helper Text */}
            <div className="absolute bottom-6 left-8 text-text-muted text-sm font-bold opacity-50 pointer-events-none">
              Press Cmd + Enter to submit
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default InputSection;