
import React from 'react';
import { motion } from 'framer-motion';
import { AgentId } from '../types';
import { AGENTS } from '../constants';

interface ProcessingBackgroundProps {
  agentId: AgentId;
}

const ProcessingBackground: React.FC<ProcessingBackgroundProps> = ({ agentId }) => {
  const color = AGENTS[agentId].color;

  const renderParticles = () => {
    switch (agentId) {
      case 'listie': // Scanning / Hearing waves - FIXED FLASHING
        return (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`wave-${i}`}
                className="absolute inset-0 border-2 rounded-full"
                style={{ borderColor: color }}
                initial={{ opacity: 0.6, scale: 0.5 }}
                animate={{ opacity: 0, scale: 1.5 }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  delay: i * 0.8,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        );

      case 'linky': // Connecting nodes
        return (
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <svg className="w-full h-full">
              {[...Array(8)].map((_, i) => (
                 <motion.circle 
                    key={`node-${i}`}
                    r="4"
                    fill={color}
                    initial={{ cx: `${Math.random() * 100}%`, cy: `${Math.random() * 100}%` }}
                    animate={{ cx: `${Math.random() * 100}%`, cy: `${Math.random() * 100}%` }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror' }}
                 />
              ))}
              {/* Lines suggested connection */}
               <motion.path
                 d="M0 0" 
                 stroke={color} 
                 strokeWidth="1"
                 fill="none"
                 initial={{ pathLength: 0, opacity: 0 }}
                 animate={{ opacity: [0, 0.5, 0] }}
                 transition={{ duration: 2, repeat: Infinity }}
               />
            </svg>
          </div>
        );

      case 'wordy': // Floating letters
        const letters = ['A', '?', 'Z', '!', 'abc', '...'];
        return (
          <>
            {letters.map((char, i) => (
              <motion.div
                key={`char-${i}`}
                className="absolute font-display text-2xl"
                style={{ color: color, left: `${20 + i * 12}%`, top: '40%' }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -100, opacity: [0, 1, 0], x: (i % 2 === 0 ? 50 : -50) }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {char}
              </motion.div>
            ))}
          </>
        );

      case 'sparky': // Confusion / Challenge Symbols
        const symbols = ['?', '?!', '¿', '!!', '≠', '⚡', '🤔'];
        // Generate more particles for a chaotic cloud
        const particles = [...symbols, ...symbols, ...symbols]; 
        return (
          <>
            {particles.map((sym, i) => (
              <motion.div
                key={`sym-${i}`}
                className="absolute font-display text-3xl md:text-5xl font-bold select-none"
                style={{ 
                  color: i % 3 === 0 ? '#FFF' : color,
                  textShadow: `0 0 10px ${color}`
                }}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0.5, 1.2, 0.5],
                  x: (Math.random() - 0.5) * 500, // Wide spread
                  y: (Math.random() - 0.5) * 500,
                  rotate: (Math.random() - 0.5) * 60 // Random tilt
                }}
                transition={{ 
                  duration: 0.6 + Math.random(), 
                  repeat: Infinity, 
                  delay: Math.random() * 0.5,
                  ease: "backOut"
                }}
              >
                {sym}
              </motion.div>
            ))}
          </>
        );

      case 'blendy': // Cosmic synthesis - Suction effect
        return (
          <>
             {/* Suction Particles: Spawning from outside and rushing to center */}
             {[...Array(20)].map((_, i) => {
               const angle = Math.random() * Math.PI * 2;
               const radius = 600; // Start far out
               const startX = Math.cos(angle) * radius;
               const startY = Math.sin(angle) * radius;
               
               // Cycle through other agents' colors being absorbed
               const particleColor = i % 5 === 0 ? '#FFFFFF' : Object.values(AGENTS)[i % 5].color;

               return (
                 <motion.div
                   key={`suction-${i}`}
                   className="absolute w-2 h-2 rounded-full"
                   style={{ backgroundColor: particleColor }}
                   initial={{ x: startX, y: startY, opacity: 0, scale: 0.5 }}
                   animate={{ 
                     x: 0, 
                     y: 0, 
                     opacity: [0, 1, 0], 
                     scale: [0.5, 1.5, 0] 
                   }}
                   transition={{ 
                     duration: 0.8, 
                     repeat: Infinity, 
                     delay: Math.random(),
                     ease: "easeIn" 
                   }}
                 />
               );
             })}
             
             {/* Central Core Pulse */}
            <motion.div
              className="absolute w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: color }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        );
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
       {renderParticles()}
    </div>
  );
};

export default ProcessingBackground;
