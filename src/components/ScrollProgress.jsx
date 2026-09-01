import React, { useEffect, useRef } from 'react';
import '../styles/ScrollProgress.css';

const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const scrollable = scrollHeight - clientHeight;
      const progress = scrollable > 0 ? scrollTop / scrollable : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress-track">
      <div className="scroll-progress-bar" ref={barRef} />
    </div>
  );
};

export default ScrollProgress;
