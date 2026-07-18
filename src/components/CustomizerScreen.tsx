import { useRef } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Sparkles } from 'lucide-react';

interface CustomizerScreenProps {
  videoUrl: string;
}

export default function CustomizerScreen({ videoUrl }: CustomizerScreenProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const replayVideo = () => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = 0;
    void videoRef.current.play();
  };

  return (
    <div id="birthday-video-container" className="max-w-4xl mx-auto px-6 py-12 select-none relative z-10">
      <div className="text-center mb-8 space-y-3">
        <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-lilac block">Birthday Video</span>
        <h2 className="font-serif text-3xl md:text-4xl italic text-plum font-normal">Happy Birthday ❤️</h2>
        <p className="font-sans text-[15px] text-plum/60 max-w-md mx-auto leading-relaxed">
          Thank you for being my favorite person.
        </p>
      </div>

      <div className="bg-white/55 backdrop-blur-md rounded-[2rem] border border-white/30 p-4 md:p-6 shadow-[0px_15px_45px_rgba(59,46,53,0.08)]">
        <div className="aspect-video rounded-[1.35rem] overflow-hidden bg-plum/5 border border-[#EDC0C0]/40 relative">
          <video
            ref={videoRef}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            src={videoUrl}
          />

          <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-md px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-plum/70">
            <Sparkles size={12} className="text-lilac" />
            Press replay anytime
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.button
            onClick={replayVideo}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-7 py-3 bg-lilac hover:bg-lilac-hover text-white font-sans text-xs font-semibold tracking-widest rounded-full uppercase transition-colors duration-300 shadow-md"
          >
            <RotateCcw size={14} />
            Replay
          </motion.button>
        </div>
      </div>
    </div>
  );
}
