import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Heart, Trophy, Sparkles, Award, ArrowDown } from 'lucide-react';

interface MissionCompleteProps {
  onContinue: () => void;
}

export default function MissionComplete({ onContinue }: MissionCompleteProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleContinue = () => {
    setIsExiting(true);
    setTimeout(() => {
      onContinue();
    }, 550);
  };

  // Setup variants for clean cinematic sequencing
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: 'easeOut' as const,
        staggerChildren: 0.18
      }
    },
    exit: {
      opacity: 0,
      scale: 0.94,
      y: -10,
      transition: { duration: 0.5, ease: 'easeInOut' as const }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: 'easeInOut' as const }
    }
  };

  const achievementVariants = {
    hidden: { opacity: 0, x: -25, scale: 0.98 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 90, damping: 14, delay: 1.1 }
    }
  };

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 1.5, duration: 0.6 }
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          id="mission-complete-root"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="max-w-2xl mx-auto w-full px-6 py-12 flex flex-col justify-center min-h-[85vh] select-none relative z-10"
        >
          {/* Subtle floating background sparkles and soft glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-rose-layer/15 rounded-full filter blur-[60px]" />
            <div className="absolute bottom-1/4 right-1/10 w-48 h-48 bg-lilac/10 rounded-full filter blur-[60px]" />
          </div>

          <div className="bg-white/55 backdrop-blur-md border border-white/30 rounded-[2rem] p-6 md:p-8 shadow-[0px_15px_45px_rgba(59,46,53,0.08)] space-y-6 relative z-10 text-center">
            
            {/* Header Section */}
            <div className="space-y-4">
              <motion.div variants={lineVariants} className="h-[1px] bg-gradient-to-r from-transparent via-[#EDC0C0] to-transparent w-full" />
              
              <motion.h2 
                variants={itemVariants}
                className="font-mono text-xs md:text-sm tracking-[0.4em] uppercase text-plum font-bold"
              >
                MISSION COMPLETE
              </motion.h2>
              
              <motion.div variants={lineVariants} className="h-[1px] bg-gradient-to-r from-transparent via-[#EDC0C0] to-transparent w-full" />
            </div>

            {/* Relationship Progression (Gaming inspired) */}
            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center py-2">
              <div className="flex items-center gap-6 md:gap-8">
                <div className="flex flex-col items-center gap-1">
                  <span className="font-sans text-[10px] uppercase tracking-wider text-plum/45">Started As</span>
                  <div className="flex items-center gap-1.5 px-4 py-2 bg-white/70 border border-plum/5 rounded-full shadow-sm text-plum/80 font-serif italic text-sm md:text-base font-semibold">
                    <Gamepad2 size={16} className="text-lilac" />
                    Teammates
                  </div>
                </div>

                <div className="flex items-center justify-center text-lilac/70 animate-bounce pt-3">
                  <ArrowDown size={18} className="rotate-270" />
                </div>

                <div className="flex flex-col items-center gap-1">
                  <span className="font-sans text-[10px] uppercase tracking-wider text-plum/45">Became</span>
                  <div className="flex items-center gap-1.5 px-4 py-2 bg-rose-layer/30 border border-rose-border/40 rounded-full shadow-sm text-plum font-serif italic text-sm md:text-base font-semibold">
                    <Heart size={15} className="text-rose-500 fill-current" />
                    Soulmates
                  </div>
                </div>
              </div>

              <p className="mt-5 font-serif italic text-[16px] text-plum/75 max-w-md mx-auto leading-relaxed">
                "Who knew one random BGMI match would become my favorite love story."
              </p>
            </motion.div>

            {/* Mission Stats Card */}
            <motion.div variants={itemVariants} className="bg-white/45 border border-[#EDC0C0]/30 rounded-2xl p-4 text-left space-y-2.5">
              {[
                { label: 'Match Started', val: 'Random BGMI Lobby', icon: <Gamepad2 size={15} className="text-[#B8A6CC]" /> },
                { label: 'Best Teammate', val: 'You', icon: <Heart size={14} className="text-rose-400 fill-current" /> },
                { label: 'Greatest Reward', val: 'Finding You', icon: <Sparkles size={14} className="text-amber-400 fill-current" /> },
                { label: 'Mission Status', val: 'Completed Successfully', icon: <Trophy size={14} className="text-yellow-500 fill-current" /> }
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between border-b border-plum/5 pb-2 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 text-plum/60 font-sans text-[11px] uppercase tracking-wider font-semibold">
                    {stat.icon}
                    <span>{stat.label}</span>
                  </div>
                  <span className="font-serif italic text-plum/90 text-sm md:text-base font-medium">{stat.val}</span>
                </div>
              ))}
            </motion.div>

            {/* Achievement Card (Slides in) */}
            <motion.div
              variants={achievementVariants}
              className="bg-gradient-to-r from-rose-layer/30 via-white/70 to-[#F6E8F2]/30 border border-rose-border/30 rounded-2xl p-4 flex gap-4 items-center shadow-[0_4px_15px_rgba(59,46,53,0.02)]"
            >
              <div className="h-11 w-11 rounded-full bg-amber-100/80 flex items-center justify-center text-amber-500 shadow-inner flex-shrink-0">
                <Award size={22} className="animate-pulse" />
              </div>
              <div className="text-left space-y-0.5">
                <span className="font-sans text-[9px] font-bold tracking-[0.2em] uppercase text-lilac block">🏅 Achievement Unlocked</span>
                <h4 className="font-serif italic text-base text-plum font-semibold leading-snug">My Favorite Person</h4>
                <p className="font-sans text-[12px] text-plum/65 leading-relaxed">
                  Unlocked after turning a random teammate into the love of my life.
                </p>
              </div>
            </motion.div>

            {/* Ending Message */}
            <motion.div variants={footerVariants} className="space-y-4 pt-2">
              <div className="space-y-1">
                <p className="font-serif text-[17px] text-plum/80 italic font-medium">
                  ✨ Mission Complete. But your birthday surprise is waiting...
                </p>
                <p className="font-['Bradley_Hand',_'Segoe_Print',_cursive] text-[14px] text-plum/50">
                  Press Continue to unlock your birthday surprise.
                </p>
              </div>

              {/* Continue Button */}
              <div className="flex justify-center">
                <motion.button
                  id="btn-mission-continue"
                  onClick={handleContinue}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -2,
                    boxShadow: '0px 8px 20px rgba(183, 139, 191, 0.35)' 
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 bg-lilac hover:bg-lilac-hover text-white font-sans text-xs font-semibold tracking-widest rounded-full uppercase transition-all duration-300 shadow-md cursor-pointer"
                >
                  Continue ❤️
                </motion.button>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
