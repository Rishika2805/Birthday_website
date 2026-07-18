import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { galleryItems, storyFrames, birthdayVideoUrl } from '../data';

// @ts-ignore
import songKaiseHua from '../../assets/song/Kaise_hua.mpeg';
// @ts-ignore
import songUntilFoundYou from '../../assets/song/Until_I_Found_You.mpeg';
// @ts-ignore
import songPerfect from '../../assets/song/Perfect.mpeg';

const playlist = [songKaiseHua, songUntilFoundYou, songPerfect];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const images = [
      ...galleryItems.map(item => item.image),
      ...storyFrames.map(frame => frame.illustrationSrc)
    ];

    let loadedCount = 0;
    const totalAssets = images.length + playlist.length + 1; // images + songs + video

    const incrementProgress = () => {
      loadedCount++;
      setProgress(Math.min(Math.round((loadedCount / totalAssets) * 100), 100));
      if (loadedCount >= totalAssets) {
        setTimeout(onComplete, 800); // 800ms buffer for smooth fade out
      }
    };

    // Preload Images
    images.forEach((src) => {
      const img = new Image();
      img.onload = incrementProgress;
      img.onerror = incrementProgress;
      img.src = src;
    });

    // Preload Audio Tracks
    playlist.forEach((src) => {
      const audio = new Audio();
      audio.src = src;
      audio.preload = 'auto';
      audio.addEventListener('canplaythrough', incrementProgress, { once: true });
      audio.addEventListener('error', incrementProgress, { once: true });
      audio.load();
    });

    // Preload Video
    const video = document.createElement('video');
    video.src = birthdayVideoUrl;
    video.preload = 'auto';
    video.addEventListener('canplaythrough', incrementProgress, { once: true });
    video.addEventListener('error', incrementProgress, { once: true });
    video.load();

    // Safety timeout - max 7 seconds
    const safetyTimeout = setTimeout(() => {
      setProgress(100);
      setTimeout(onComplete, 200);
    }, 7000);

    return () => {
      clearTimeout(safetyTimeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#FBEFEF] z-50 flex flex-col items-center justify-center select-none font-sans">
      <div className="text-center space-y-8 max-w-xs w-full px-4">
        {/* Pulsing heart loader */}
        <div className="flex justify-center">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="text-rose-400"
          >
            <Heart size={54} className="fill-current" />
          </motion.div>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-xl italic text-plum font-normal">
            {progress < 40 ? 'Preparing surprise...' : progress < 85 ? 'Gathering our memories...' : 'Almost ready...'}
          </h2>
          
          {/* Progress Bar Container */}
          <div className="w-full bg-[#EDC0C0]/20 rounded-full h-1.5 overflow-hidden">
            <motion.div
              className="bg-lilac h-full rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <p className="font-mono text-[10px] tracking-widest text-plum/40 uppercase">
            Loading {progress}%
          </p>
        </div>
      </div>
    </div>
  );
}
