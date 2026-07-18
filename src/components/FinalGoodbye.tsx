import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Gift } from 'lucide-react';

interface FinalGoodbyeProps {
  onFinish: () => void;
}

interface FloatingItem {
  id: number;
  x: number; // percentage
  y: number; // percentage
  size: number; // pixels
  delay: number; // seconds
  duration: number; // seconds
  type: 'heart' | 'sparkle';
}

export default function FinalGoodbye({ onFinish }: FinalGoodbyeProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [floatingItems, setFloatingItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    // Generate 12 subtle floating elements
    const items: FloatingItem[] = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 8, // 8px to 18px
      delay: Math.random() * -15,
      duration: Math.random() * 10 + 15, // 15s to 25s
      type: i % 2 === 0 ? 'heart' : 'sparkle'
    }));
    setFloatingItems(items);
  }, []);

  const handleFinish = () => {
    setIsExiting(true);
    setTimeout(() => {
      onFinish();
    }, 550);
  };

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      y: -10,
      transition: { duration: 0.5, ease: 'easeInOut' }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' }
    }
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const endingLine1Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 0.65,
      y: 0,
      transition: { delay: 1.8, duration: 0.6 }
    }
  };

  const endingLine2Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 2.3, duration: 0.6, type: 'spring', stiffness: 90 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 2.8, type: 'spring', stiffness: 100 }
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          id="final-goodbye-root"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="max-w-2xl mx-auto w-full px-6 py-12 flex flex-col justify-center min-h-[90vh] select-none relative z-10"
        >
          {/* Subtle floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {floatingItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: '100%' }}
                animate={{
                  opacity: [0, 0.15, 0.15, 0],
                  y: ['100%', '-20%'],
                  x: [`${item.x}%`, `${item.x + (Math.sin(item.id) * 10)}%`]
                }}
                transition={{
                  duration: item.duration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: item.delay
                }}
                className="absolute text-plum"
                style={{
                  width: `${item.size}px`,
                  height: `${item.size}px`,
                  left: `${item.x}%`
                }}
              >
                {item.type === 'heart' ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-lilac/30">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-rose-500/20">
                    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
                  </svg>
                )
                }
              </motion.div>
            ))}
            {/* Glowing background shapes */}
            <div className="absolute top-1/3 left-1/4 w-52 h-52 bg-rose-layer/15 rounded-full filter blur-[70px]" />
            <div className="absolute bottom-1/3 right-1/4 w-52 h-52 bg-lilac/10 rounded-full filter blur-[70px]" />
          </div>

          <div className="flex flex-col items-center justify-center space-y-6 relative z-10 text-center">
            
            {/* Header */}
            <motion.h2 
              variants={titleVariants}
              className="font-serif text-[42px] sm:text-[48px] text-plum font-normal italic leading-none tracking-tight flex items-center gap-2 justify-center"
            >
              For You <span className="text-rose-500 fill-current">❤️</span>
            </motion.h2>

            {/* Glassmorphic Handwritten Letter */}
            <motion.div 
              variants={letterVariants}
              className="bg-white/55 backdrop-blur-md border border-white/30 rounded-[2rem] p-6 md:p-8 shadow-[0px_15px_45px_rgba(59,46,53,0.08)] w-full text-left"
            >
              <div className="font-['Bradley_Hand',_'Segoe_Print',_cursive] text-[16px] md:text-[18px] text-plum/85 space-y-5 leading-relaxed">
                
                {/* Salutation */}
                <motion.p variants={paragraphVariants} className="font-bold">
                  To my favorite teammate and favorite person,
                </motion.p>

                {/* Paragraph 1 */}
                <motion.p variants={paragraphVariants}>
                  This is the space where you can write your personal letter to him later. 
                  Share a special memory of how you met, what you felt during your first 
                  match together, or some words about the distance and how much he means 
                  to you. Make this section as emotional and heartfelt as you want.
                </motion.p>

                {/* Paragraph 2 */}
                <motion.p variants={paragraphVariants}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum 
                  placerat rhoncus. Mauris et mi congue, iaculis erat non, bibendum ipsum. 
                  Fusce sodales, ex vel vulputate consequat, arcu magna tempor purus, ut 
                  pretium leo magna quis urna.
                </motion.p>

                {/* Paragraph 3 */}
                <motion.p variants={paragraphVariants}>
                  Nullam euismod, nisl ac aliquet eleifend, magna diam ultrices nibh, 
                  id rhoncus sapien libero ut elit. Curabitur vitae egestas risus. Mauris 
                  cursus sit amet leo at sollicitudin. Proin feugiat, justo quis sodales 
                  mattis, eros diam egestas turpis, a commodo ipsum erat ut metus.
                </motion.p>

                {/* Sign-off */}
                <div className="pt-4 space-y-2">
                  <motion.p 
                    variants={endingLine1Variants} 
                    className="font-sans text-[11px] uppercase tracking-[0.25em] font-semibold text-plum/50 text-center"
                  >
                    Thank you for being part of my story.
                  </motion.p>
                  
                  <motion.p 
                    variants={endingLine2Variants}
                    className="font-serif italic text-2xl font-semibold text-plum text-center leading-none mt-1"
                  >
                    I love you.
                  </motion.p>
                </div>

              </div>
            </motion.div>

            {/* Bottom Button */}
            <motion.div variants={buttonVariants} className="pt-2 flex justify-center">
              <button
                id="btn-final-surprise"
                onClick={handleFinish}
                className="px-8 py-3.5 bg-lilac hover:bg-lilac-hover text-white font-sans text-xs font-semibold tracking-widest rounded-full uppercase transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2"
                style={{
                  boxShadow: '0px 4px 15px rgba(183, 139, 191, 0.25)'
                }}
              >
                One Last Surprise <Gift size={15} />
              </button>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
