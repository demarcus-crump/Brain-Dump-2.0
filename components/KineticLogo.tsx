
import React from 'react';
import { motion } from 'framer-motion';

const KineticLogo: React.FC = () => {
  const line1 = "BRAIN";
  const line2 = "DUMP";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      y: 100, 
      opacity: 0, 
      rotate: -10, 
      scale: 0.5 
    },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotate: 0, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      }
    },
  };

  const renderLine = (text: string) => (
    <div className="flex justify-center overflow-hidden">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block origin-bottom"
          // Add slight random rotation to final state for "messy" feel
          whileHover={{ 
            scale: 1.1, 
            rotate: Math.random() * 10 - 5,
            color: index % 2 === 0 ? '#FF3366' : '#7B5CFF',
            transition: { duration: 0.2 } 
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );

  return (
    <motion.div
      className="relative z-10 font-display text-[clamp(4rem,15vw,10rem)] leading-[0.85] text-white drop-shadow-[8px_8px_0_#FF3366] cursor-default select-none"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {renderLine(line1)}
      {renderLine(line2)}
    </motion.div>
  );
};

export default KineticLogo;
