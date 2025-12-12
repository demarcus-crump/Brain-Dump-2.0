
import React from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.03, 
        delayChildren: 0.1 
      }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 10, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15 
      } 
    }
  };

  return (
    <motion.div 
      key={text} 
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap gap-x-2 gap-y-1"
      aria-label={text} /* Screen readers read the full sentence here */
    >
      {words.map((word, index) => (
        <motion.span 
          key={index} 
          variants={child} 
          className="inline-block relative"
          aria-hidden="true" /* Hide individual animated chunks from screen readers to prevent stuttering */
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TypewriterText;
