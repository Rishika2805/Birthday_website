import { motion } from 'framer-motion';
import { Heart, Play, Mail } from 'lucide-react';

interface VideoTransitionProps {
  onWatchAgain: () => void;
  onReadLetter: () => void;
}

export default function VideoTransition({ onWatchAgain, onReadLetter }: VideoTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: 'easeInOut' as const }}
      className="max-w-md mx-auto text-center px-6 py-12 flex flex-col justify-center min-h-[75vh]"
    >
      <div className="bg-white/55 backdrop-blur-md border border-white/30 rounded-[2rem] p-8 shadow-[0px_15px_45px_rgba(59,46,53,0.08)] space-y-6">
        <div className="flex justify-center text-rose-500 animate-pulse">
          <Heart size={40} className="fill-current" />
        </div>
        
        <div className="space-y-2">
          <h2 className="font-serif text-2xl md:text-3xl italic text-plum font-normal leading-snug">I hope you enjoyed watching it.</h2>
          <p className="font-sans text-[14px] text-plum/60 leading-relaxed">
            Would you like to watch it again or continue to my final letter?
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <motion.button
            onClick={onWatchAgain}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-rose-layer/30 text-plum font-sans text-xs font-semibold tracking-widest rounded-full uppercase transition-colors duration-300 border border-[#EDC0C0]/40 shadow-sm cursor-pointer"
          >
            <Play size={14} className="fill-plum text-plum" />
            Watch Again
          </motion.button>

          <motion.button
            onClick={onReadLetter}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-lilac hover:bg-lilac-hover text-white font-sans text-xs font-semibold tracking-widest rounded-full uppercase transition-colors duration-300 shadow-md cursor-pointer"
          >
            <Mail size={14} />
            Read My Letter
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
