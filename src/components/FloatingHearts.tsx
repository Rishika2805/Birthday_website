import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BackgroundHeart {
  id: number;
  xPercent: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  rotation: number;
  color: string;
  opacity: number;
}

export default function FloatingHearts() {
  const [backgroundHearts, setBackgroundHearts] = useState<BackgroundHeart[]>([]);

  useEffect(() => {
    const colors = ['#E8A5A5', '#B78BBF', '#D2B4DE']; // warm rose, plum lilac, and soft lavender
    const hearts: BackgroundHeart[] = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      xPercent: Math.random() * 100,
      size: Math.random() * 8 + 10, // 10-18px
      duration: Math.random() * 6 + 6,
      delay: Math.random() * -12,
      sway: Math.random() * 10 + 5,
      rotation: Math.random() * 360,
      color: colors[i % colors.length],
      opacity: Math.random() * 0.2 + 0.5
    }));
    setBackgroundHearts(hearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {backgroundHearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ 
            y: -20,
            opacity: 0,
            rotate: heart.rotation
          }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
            x: [0, 10, -10, 0],
            opacity: [0, 0.65, 0.65, 0],
            rotate: [heart.rotation, heart.rotation + 45, heart.rotation - 45, heart.rotation]
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: heart.delay,
          }}
          className="absolute pointer-events-none select-none flex items-center justify-center"
          style={{
            left: `${heart.xPercent}%`,
            top: "-20px",
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            color: heart.color,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
