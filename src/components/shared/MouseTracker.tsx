import React, { useEffect, useRef } from 'react';

export const MouseTracker: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices with fine control
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number;
    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        currentX = targetX;
        currentY = targetY;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      // 0ms delay: Precision center dot directly tracks cursor with zero latency
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer'))
      ) {
        ring.classList.add('scale-150', 'border-[#128341]', 'bg-[#128341]/15');
        ring.classList.remove('scale-100', 'border-[#128341]/60');
      } else {
        ring.classList.remove('scale-150', 'border-[#128341]', 'bg-[#128341]/15');
        ring.classList.add('scale-100', 'border-[#128341]/60');
      }
    };

    const onMouseDown = () => {
      ring.classList.add('scale-90', 'border-[#0c6b34]', 'bg-[#128341]/30');
    };

    const onMouseUp = () => {
      ring.classList.remove('scale-90', 'border-[#0c6b34]', 'bg-[#128341]/30');
    };

    const onMouseLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onMouseEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    // Ultra-snappy 120Hz-144Hz follower loop with high responsiveness (0.75 ease)
    const animate = () => {
      // Snappy ease (0.75) completely removes lag while keeping it silky smooth
      currentX += (targetX - currentX) * 0.75;
      currentY += (targetY - currentY) * 0.75;

      ring.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* 1. Precision Center Dot (0ms instant hardware-accelerated response) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#128341] opacity-0 transition-opacity duration-150 hidden md:block will-change-transform"
        style={{
          width: '6px',
          height: '6px',
          boxShadow: '0 0 8px rgba(18, 131, 65, 0.9)',
        }}
      />

      {/* 2. Snappy Outer Ring (Instant response with zero lag) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-[#128341]/60 bg-transparent opacity-0 transition-transform duration-100 ease-out hidden md:block will-change-transform"
        style={{
          width: '32px',
          height: '32px',
        }}
      />
    </>
  );
};

export default MouseTracker;
