
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AGENTS, AGENT_ORDER } from '../constants';

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  shape: 'circle' | 'square';
}

const Confetti: React.FC = () => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    const particleCount = 50;
    const newParticles: ConfettiParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const agentId = AGENT_ORDER[Math.floor(Math.random() * AGENT_ORDER.length)];
      newParticles.push({
        id: i,
        x: window.innerWidth / 2, // Start from center
        y: window.innerHeight / 2, // Start from center
        color: AGENTS[agentId].color,
        size: Math.random() * 10 + 5, // 5px to 15px
        rotation: Math.random() * 360,
        shape: Math.random() > 0.5 ? 'circle' : 'square',
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {particles.map((p) => {
        // Random destination
        const destX = (Math.random() - 0.5) * window.innerWidth * 1.5;
        const destY = (Math.random() - 0.5) * window.innerHeight * 1.5;

        return (
          <motion.div
            key={p.id}
            initial={{ 
              x: p.x, 
              y: p.y, 
              scale: 0, 
              opacity: 1 
            }}
            animate={{ 
              x: p.x + destX, 
              y: p.y + destY + 500, // Add gravity
              rotate: p.rotation + 720,
              scale: [0, 1.5, 0], // Pop up then shrink
              opacity: [1, 1, 0]
            }}
            transition={{ 
              duration: 2 + Math.random(), 
              ease: "easeOut"
            }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.shape === 'circle' ? '50%' : '4px',
            }}
          />
        );
      })}
    </div>
  );
};

export default Confetti;
