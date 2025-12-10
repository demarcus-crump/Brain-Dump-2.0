
import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { AGENTS } from '../constants';
import { AgentId } from '../types';

interface AgentDisplayProps {
  id: AgentId;
  state: 'idle' | 'working' | 'complete' | 'hidden';
  scale?: number;
  showLabel?: boolean;
  className?: string;
}

const AgentDisplay: React.FC<AgentDisplayProps> = ({ id, state, scale = 1, showLabel = true, className = "" }) => {
  const agent = AGENTS[id];
  const containerRef = useRef<HTMLDivElement>(null);
  
  // OPTIMIZATION: Use MotionValues instead of useState to prevent re-renders on mousemove
  const pupilX = useMotionValue(0);
  const pupilY = useMotionValue(0);

  // UPDATED PATHS: Larger, bolder shapes to ensure they are clearly visible
  const paths: Record<AgentId, string> = {
    listie: "M20 35 C20 15 35 5 50 10 C65 5 80 15 80 35 C85 50 90 65 85 85 C80 95 20 95 15 85 C10 65 15 50 20 35 Z",
    linky: "M15 45 C15 25 30 15 50 15 C70 15 85 25 85 45 C90 65 80 85 50 85 C20 85 10 65 15 45 Z",
    wordy: "M20 25 C20 15 30 15 50 12 C70 15 80 15 80 25 C85 45 85 75 80 85 C75 92 25 92 20 85 C15 75 15 45 20 25 Z",
    sparky: "M50 10 L65 30 L85 25 L75 50 L95 60 L70 75 L80 95 L50 80 L20 95 L30 75 L5 60 L25 50 L15 25 L35 30 Z",
    blendy: "M50 10 C30 10 10 30 15 55 C10 85 35 95 50 95 C65 95 90 85 85 55 C90 30 70 10 50 10 Z"
  };

  const variants = {
    idle: {
      y: [0, -10, 0],
      scale: [1, 1.02, 1],
      opacity: 1,
      transition: {
        y: { duration: 3 + Math.random(), repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 4 + Math.random(), repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 0.5 } 
      }
    },
    working: {
      scale: [1, 1.05, 1],
      opacity: 1,
      transition: {
        scale: { duration: 0.5, repeat: Infinity },
        opacity: { duration: 0.5 }
      }
    },
    complete: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        opacity: { duration: 0.5 }
      }
    },
    hidden: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  // Agent-specific body animations for "working" state
  const getBodyAnimation = () => {
    if (state !== 'working') return variants.working;

    switch (id) {
      case 'sparky': // Jittery
        return {
          x: [-2, 2, -2, 1, -1],
          y: [-2, 2, -1, 1],
          opacity: 1,
          transition: { duration: 0.2, repeat: Infinity }
        };
      case 'blendy': // Rotating/Swirling
        return {
          rotate: [0, 5, 0, -5, 0],
          scale: [1, 1.1, 1],
          opacity: 1,
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        };
      case 'listie': // Bouncing rhythmically (listening)
        return {
          y: [0, -10, 0],
          scale: [1, 0.95, 1],
          opacity: 1,
          transition: { duration: 0.6, repeat: Infinity }
        };
      default:
        return variants.working;
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate angle and distance
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx);
      // Limit movement radius to keep pupil inside eye
      const maxDist = 4;
      const distance = Math.min(maxDist, Math.hypot(dx, dy) / 15);

      // Update MotionValues directly - NO REACT RENDER TRIGGERED
      pupilX.set(Math.cos(angle) * distance);
      pupilY.set(Math.sin(angle) * distance);
    };

    if (state !== 'hidden') {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [state, pupilX, pupilY]);

  // Special eye animations based on personality
  const getEyeAnimation = () => {
    if (state !== 'working') return {};
    
    switch (id) {
      case 'listie': // Scans reading left to right
        return {
          x: [-5, 5, -5],
          transition: { repeat: Infinity, duration: 1.5, ease: "linear" }
        };
      case 'linky': // Moves in a grid/network pattern
        return {
          x: [-3, 3, 3, -3, -3],
          y: [-3, -3, 3, 3, -3],
          transition: { repeat: Infinity, duration: 2, times: [0, 0.25, 0.5, 0.75, 1] }
        };
      case 'wordy': // Squinting/focusing
        return {
          scaleY: [1, 0.3, 1],
          transition: { repeat: Infinity, duration: 2, repeatDelay: 0.5 }
        };
      case 'sparky': // Darting around frantically
        return {
          x: [0, 4, -3, 2, 0],
          y: [0, -2, 3, -4, 0],
          transition: { repeat: Infinity, duration: 0.5 }
        };
      default:
        return {};
    }
  };

  // Combine manual pupil tracking with automatic animations
  // When working, we override manual tracking with the animation
  const activePupilX = state === 'working' ? undefined : pupilX;
  const activePupilY = state === 'working' ? undefined : pupilY;

  return (
    <motion.div 
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center group ${className}`}
      initial="hidden"
      animate={state === 'working' ? getBodyAnimation() : state}
      variants={variants}
      style={{ scale }}
      role="img"
      aria-label={`${agent.name} (${state === 'working' ? 'Processing' : state})`}
    >
      {/* Agent Body */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-24 h-24 drop-shadow-2xl interactive overflow-visible"
        style={{ filter: `drop-shadow(0 0 15px ${agent.color}66)` }}
        aria-hidden="true"
      >
        <path d={paths[id]} fill={agent.color} />
        
        {/* Eyes Group */}
        <g transform="translate(0, 5)">
            {/* White Sclera */}
            {id === 'sparky' ? (
                <>
                    <circle cx="35" cy="40" r="7" fill="white" />
                    <circle cx="65" cy="40" r="5" fill="white" />
                </>
            ) : (
                <>
                    <circle cx="35" cy="40" r="6" fill="white" />
                    <circle cx="65" cy="40" r="6" fill="white" />
                </>
            )}
            
            {/* Pupils - Tracking or Animating */}
            <motion.g animate={getEyeAnimation()}>
                <motion.circle 
                    cx={35} 
                    cy={40} 
                    r={id === 'sparky' ? 2.5 : 3} 
                    fill={state === 'working' ? agent.color : "#0D0D1A"}
                    style={{ x: activePupilX, y: activePupilY }}
                />
                <motion.circle 
                    cx={65} 
                    cy={40} 
                    r={id === 'sparky' ? 2 : 3} 
                    fill={state === 'working' ? agent.color : "#0D0D1A"}
                    style={{ x: activePupilX, y: activePupilY }} 
                />
            </motion.g>
        </g>

        {/* Mouth (Morphs based on state) */}
        <g transform="translate(0, 5)">
            {state === 'working' ? (
                <path d="M35 65 Q50 75 65 65" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                    <animate attributeName="d" values="M35 65 Q50 75 65 65;M35 60 Q50 50 65 60;M35 65 Q50 75 65 65" dur="0.2s" repeatCount="indefinite" />
                </path>
            ) : state === 'complete' ? (
                <path d="M30 60 Q50 75 70 60" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
            ) : (
                id === 'sparky' ? (
                    <path d="M35 65 L45 60 L55 65 L65 60" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
                ) : (
                    <path d="M35 60 Q50 65 65 60" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
                )
            )}
        </g>
      </svg>
      
      {/* Label */}
      {showLabel && (
        <motion.div 
          className="absolute -bottom-8 bg-bg-surface px-3 py-1 rounded-full border border-bg-elevated text-xs font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none"
          style={{ color: agent.color }}
          aria-hidden="true"
        >
          {agent.name.toUpperCase()}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AgentDisplay;
