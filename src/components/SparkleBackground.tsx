import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number; // percentage
  y: number; // percentage
  size: number; // pixels
  delay: number; // seconds
  duration: number; // seconds
  opacity: number;
  type: 'sparkle' | 'petal' | 'heart';
}

export default function SparkleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 25 floating particles
    const generated: Particle[] = Array.from({ length: 25 }).map((_, i) => {
      const types: ('sparkle' | 'petal' | 'heart')[] = ['sparkle', 'petal', 'heart'];
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 16 + 8, // 8px to 24px
        delay: Math.random() * -20, // negative delay so they start at different phases
        duration: Math.random() * 15 + 15, // 15s to 30s
        opacity: Math.random() * 0.15 + 0.05, // 5% to 20% opacity
        type: types[Math.floor(Math.random() * types.length)]
      };
    });
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Injecting CSS keyframe animations for slow drifting */}
      <style>{`
        @keyframes floatDrift {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-40px) translateX(20px) rotate(120deg);
          }
          66% {
            transform: translateY(-80px) translateX(-20px) rotate(240deg);
          }
          100% {
            transform: translateY(-120px) translateX(0px) rotate(360deg);
          }
        }
        .drifting-particle {
          animation: floatDrift linear infinite;
        }
      `}</style>
      {particles.map((p) => {
        const style = {
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
          opacity: p.opacity,
          color: '#B8A6CC'
        };

        return (
          <div
            key={p.id}
            className="absolute drifting-particle transition-opacity duration-1000"
            style={style}
          >
            {p.type === 'sparkle' && (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
              </svg>
            )}
            {p.type === 'petal' && (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm-5 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z" />
              </svg>
            )}
            {p.type === 'heart' && (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
