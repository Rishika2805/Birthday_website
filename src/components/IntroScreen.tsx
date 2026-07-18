import { motion } from 'motion/react';
import { BookOpen, Heart } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div id="intro-screen-container" className="flex flex-col min-h-[85vh] justify-between relative px-6 md:px-12 py-8 z-10 max-w-lg mx-auto select-none">
      {/* Decorative Sparkle - Left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
        className="absolute top-[15%] left-[5%] text-[#B8A6CC]"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-40">
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
        </svg>
      </motion.div>

      {/* Decorative Sparkle - Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
        className="absolute bottom-[25%] right-[5%] text-[#B8A6CC]"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 opacity-30">
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
        </svg>
      </motion.div>

      {/* Top Banner Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex items-center justify-between w-full border-b border-[#EDC0C0]/30 pb-4 mb-8"
      >
        <div className="flex items-center gap-2 text-plum">
          <BookOpen size={22} className="stroke-[1.5]" />
          <h1 className="font-serif text-2xl font-medium italic tracking-wide">A Birthday Storybook</h1>
        </div>
        <Heart size={20} className="text-plum stroke-[1.5] hover:fill-rose-300 hover:text-rose-500 transition-colors cursor-pointer" />
      </motion.header>

      {/* Main Hero Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center gap-6 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="space-y-4"
        >
          <h2 className="font-serif text-[42px] sm:text-[48px] md:text-[54px] text-plum font-normal italic leading-tight tracking-tight">
            Happy Birthday
          </h2>
          <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-plum/60 block mt-1">
            For my long-distance boyfriend
          </span>
        </motion.div>

        {/* Big Pulsing Heart Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.08, 1], opacity: 1 }}
          transition={{
            scale: {
              repeat: Infinity,
              duration: 2.2,
              ease: 'easeInOut'
            },
            opacity: { duration: 1 }
          }}
          className="my-6 cursor-pointer"
        >
          {/* A gorgeous glossy Red Heart Emoji/Icon */}
          <span className="text-[72px] sm:text-[84px] drop-shadow-[0_10px_15px_rgba(219,39,119,0.25)] block">
            ❤️
          </span>
        </motion.div>

        {/* Romantic intro blurb */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          className="font-sans text-[15px] sm:text-[16px] text-plum/80 leading-relaxed max-w-[360px] mx-auto font-normal"
        >
          Welcome to a soft little storybook built to feel warm, romantic, and personal. Each page is a small surprise made to celebrate you.
        </motion.p>

        {/* Start Button */}
        <motion.button
          id="btn-start-celebration"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          whileHover={{ 
            scale: 1.03,
            boxShadow: '0px 0px 15px rgba(183, 139, 191, 0.4)' 
          }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="mt-8 px-8 py-3.5 bg-lilac hover:bg-lilac-hover text-white font-sans text-xs font-semibold tracking-widest rounded-full uppercase transition-colors duration-300 cursor-pointer shadow-md"
        >
          Start the Celebration
        </motion.button>
      </div>

      {/* Footer Branding (Hidden or minimal to fit) */}
      <div className="w-full text-center pt-8 border-t border-[#EDC0C0]/10">
        <p className="font-serif text-[13px] text-plum/40 italic">With love, forever.</p>
      </div>
    </div>
  );
}
