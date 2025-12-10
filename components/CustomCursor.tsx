
import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Optimization: Use transforms instead of top/left to avoid layout thrashing
    const onMouseMove = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%)`;
      }

      // Slightly delayed follow for outline using WAAPI for performance
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.animate({
          transform: `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%)`
        }, { duration: 500, fill: 'forwards' });
      }
    };

    const onMouseDown = () => {
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.style.transform += ' scale(0.8)';
      }
    };

    const onMouseUp = () => {
       // Reset scale handled by next animation frame implicitly or standard CSS if needed, 
       // but here we rely on the animate loop. 
       // Actually, direct style manipulation alongside animate() can be tricky.
       // Let's keep it simple: just toggle a class or update the scale directly if needed.
       // For this simple cursor, just letting it flow is fine.
    };

    // Optimization: Event delegation instead of checking every element interval
    const onMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const interactive = target.closest('button, a, input, textarea, .interactive');
        
        if (interactive && cursorOutlineRef.current) {
            cursorOutlineRef.current.classList.add('cursor-hover');
        } else if (cursorOutlineRef.current) {
            cursorOutlineRef.current.classList.remove('cursor-hover');
        }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot, .cursor-outline {
          position: fixed;
          top: 0; 
          left: 0;
          pointer-events: none;
          z-index: 9999;
          will-change: transform; /* Hint to browser to promote to layer */
        }
        .cursor-dot {
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
          /* Initial hide offscreen */
          transform: translate3d(-100px, -100px, 0);
        }
        .cursor-outline {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transform: translate3d(-100px, -100px, 0);
          transition: width 0.2s, height 0.2s, background-color 0.2s, border-color 0.2s;
        }
        .cursor-hover {
          width: 60px !important;
          height: 60px !important;
          background-color: rgba(255, 255, 255, 0.1);
          border-color: transparent;
        }
      `}</style>
      <div ref={cursorDotRef} className="cursor-dot hidden md:block" />
      <div ref={cursorOutlineRef} className="cursor-outline hidden md:block" />
    </>
  );
};

export default CustomCursor;
