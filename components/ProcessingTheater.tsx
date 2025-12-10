
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AGENT_ORDER, AGENTS } from '../constants';
import { AgentId } from '../types';
import AgentDisplay from './AgentDisplay';
import ProcessingBackground from './ProcessingBackground';
import { Check } from 'lucide-react';

interface ProcessingTheaterProps {
  currentAgentId: AgentId;
}

const ProcessingTheater: React.FC<ProcessingTheaterProps> = ({ currentAgentId }) => {
  
  const currentStepIndex = AGENT_ORDER.indexOf(currentAgentId);

  return (
    <div className="fixed inset-0 z-50 bg-bg-deep flex flex-col items-center justify-center p-8 overflow-hidden" role="status" aria-modal="true" aria-label="Processing your thoughts">
      {/* Hidden live region for screen readers */}
      <div className="sr-only" aria-live="polite">
        {AGENTS[currentAgentId].role} is processing: {AGENTS[currentAgentId].catchphrase}
      </div>

      {/* Background Dimmer */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Atmospheric Background for Active Agent */}
      <ProcessingBackground agentId={currentAgentId} />

      {/* Progress Header (Relay Race) */}
      <div className="relative z-20 flex gap-4 md:gap-8 mb-12 md:mb-24 w-full justify-center max-w-2xl px-4" aria-hidden="true">
        {AGENT_ORDER.map((id, idx) => {
          const isPast = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          
          return (
            <div key={id} className="relative flex flex-col items-center gap-2 flex-1">
               {/* Connecting Line */}
               {idx < AGENT_ORDER.length - 1 && (
                 <div className={`absolute top-1/2 left-[60%] w-[80%] h-1 -translate-y-1/2 transition-colors duration-500 z-0 ${isPast ? 'bg-white' : 'bg-bg-elevated'}`} />
               )}

               <motion.div 
                 className={`relative z-10 transition-all duration-500 flex items-center justify-center ${isCurrent ? 'scale-125 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'scale-100'}`}
                 animate={isCurrent ? { y: [0, -5, 0], transition: { repeat: Infinity } } : {}}
               >
                 <AgentDisplay 
                   id={id} 
                   state={isPast ? 'complete' : isCurrent ? 'working' : 'idle'} 
                   scale={isCurrent ? 1.2 : 0.9} 
                   showLabel={false}
                   className={`transition-all duration-500 ${!isPast && !isCurrent ? 'opacity-30 grayscale' : 'opacity-100'}`}
                 />
                 
                 {/* Checkmark Badge */}
                 {isPast && (
                   <motion.div 
                     initial={{ scale: 0 }} 
                     animate={{ scale: 1 }}
                     className="absolute -top-2 -right-2 bg-green-400 text-bg-deep rounded-full p-1 border-2 border-bg-deep"
                   >
                     <Check size={14} strokeWidth={4} />
                   </motion.div>
                 )}
               </motion.div>
            </div>
          );
        })}
      </div>

      {/* Main Stage */}
      <div className="relative z-20 h-80 w-full max-w-4xl flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAgentId}
            initial={{ opacity: 0, scale: 0.5, x: 100, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: -100, rotate: -10 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Speech Bubble */}
            <motion.div 
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: -30 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="bg-white text-bg-deep font-display text-xl md:text-3xl px-8 py-6 rounded-[2rem] shadow-2xl relative mb-4 max-w-md text-center"
              aria-hidden="true"
            >
              "{AGENTS[currentAgentId].catchphrase}"
              {/* Bubble Tail */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-0 h-0 border-l-[15px] border-r-[15px] border-t-[20px] border-l-transparent border-r-transparent border-t-white" />
            </motion.div>

            {/* Large Active Agent */}
            <div className="relative">
              {/* Halo glow */}
              <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150 animate-pulse" style={{ backgroundColor: AGENTS[currentAgentId].color }} />
              
              <AgentDisplay 
                id={currentAgentId} 
                state="working" 
                scale={2.5} 
                showLabel={true} 
              />
            </div>
            
            <motion.h2 
              className="mt-12 text-xl md:text-2xl font-body text-text-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              aria-hidden="true" // Already announced via live region
            >
              {AGENTS[currentAgentId].role} is processing...
            </motion.h2>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProcessingTheater;
