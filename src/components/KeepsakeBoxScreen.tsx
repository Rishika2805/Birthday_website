import { useState } from 'react';
import { motion } from 'motion/react';
import { StoryFrame } from '../types';
import StoryViewer from './StoryViewer';
import { ArrowRight } from 'lucide-react';

interface KeepsakeBoxScreenProps {
  storyFrames: StoryFrame[];
  storyPassword: string;
  videoUrl: string;
  onComplete?: () => void;
}

export default function KeepsakeBoxScreen({ storyFrames, storyPassword, videoUrl, onComplete }: KeepsakeBoxScreenProps) {
  const [started, setStarted] = useState(false);

  return (
    <div id="keepsake-box-container" className="max-w-4xl mx-auto px-6 py-12 select-none relative z-10">
      {!started ? (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center space-y-6"
        >
          <div className="space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-lilac block">Our Story</span>
            <h2 className="font-serif text-3xl md:text-4xl italic text-plum font-normal">Our Story</h2>
            <p className="font-sans text-[15px] text-plum/60 max-w-md mx-auto leading-relaxed">
              A little chapter book for a very big heart.
            </p>
          </div>

          <motion.button
            onClick={() => setStarted(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-lilac hover:bg-lilac-hover text-white font-sans text-xs font-semibold tracking-widest rounded-full uppercase transition-colors duration-300 shadow-md"
          >
            Begin Story
            <ArrowRight size={14} />
          </motion.button>
        </motion.div>
      ) : (
        <StoryViewer
          frames={storyFrames}
          password={storyPassword}
          videoUrl={videoUrl}
          onComplete={onComplete}
        />
      )}
    </div>
  );
}
