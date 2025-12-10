import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AgentDisplay from './AgentDisplay';
import MagneticButton from './MagneticButton';

interface AmbiguityModalProps {
  question: string;
  onAnswer: (answer: string) => void;
}

const AmbiguityModal: React.FC<AmbiguityModalProps> = ({ question, onAnswer }) => {
  const [answer, setAnswer] = useState('');

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
      {/* Dimmed Background */}
      <motion.div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <motion.div 
        className="relative z-10 bg-bg-surface w-full max-w-lg rounded-[2rem] p-8 border border-agent-listie shadow-[0_0_50px_rgba(255,51,102,0.3)]"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
           <div className="relative">
             <div className="absolute inset-0 bg-agent-listie/30 blur-xl rounded-full" />
             <AgentDisplay id="listie" state="working" scale={1.5} showLabel={false} />
           </div>
        </div>

        <h2 className="mt-12 text-center font-display text-2xl text-white mb-4">Hang on a sec...</h2>
        
        <div className="bg-bg-elevated p-4 rounded-xl text-center mb-6 relative">
          <p className="text-lg text-agent-listie font-bold">"{question}"</p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-bg-elevated rotate-45" />
        </div>

        <p className="text-center text-text-muted text-sm mb-6">
          I want to make sure the team gets this right. Can you clarify?
        </p>

        <input 
          autoFocus
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full bg-bg-deep border border-bg-elevated rounded-xl p-4 text-white placeholder-text-muted focus:border-agent-listie focus:outline-none transition-colors mb-6"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && answer.trim()) onAnswer(answer);
          }}
        />

        <div className="flex justify-center">
            <MagneticButton 
                onClick={() => { if(answer.trim()) onAnswer(answer) }}
                className="bg-agent-listie text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-white hover:text-agent-listie transition-colors"
            >
                Clarify & Continue
            </MagneticButton>
        </div>
      </motion.div>
    </div>
  );
};

export default AmbiguityModal;