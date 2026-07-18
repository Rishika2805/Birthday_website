import { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: (play: boolean) => void;
  trackUrl: string;
}

export default function AudioPlayer({ isPlaying, onTogglePlay, trackUrl }: AudioPlayerProps) {
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(trackUrl);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [trackUrl]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.log('Autoplay blocked by browser. User interaction required.', err);
        onTogglePlay(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, onTogglePlay]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(0.4);
    }
  };

  return (
    <div 
      id="audio-player-container"
      className="fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full shadow-lg"
      style={{ boxShadow: '0px 10px 40px rgba(59, 46, 53, 0.08)' }}
    >
      <button
        id="btn-play-pause-music"
        onClick={() => onTogglePlay(!isPlaying)}
        className="p-1.5 rounded-full text-plum hover:bg-rose-layer/30 transition-colors duration-300"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <div className="flex items-center gap-0.5 h-4 px-1">
            <span className="w-0.5 bg-lilac rounded-full animate-pulse" style={{ height: '100%', animationDuration: '0.6s' }}></span>
            <span className="w-0.5 bg-lilac rounded-full animate-pulse" style={{ height: '60%', animationDuration: '0.8s' }}></span>
            <span className="w-0.5 bg-lilac rounded-full animate-pulse" style={{ height: '80%', animationDuration: '0.5s' }}></span>
            <span className="w-0.5 bg-lilac rounded-full animate-pulse" style={{ height: '40%', animationDuration: '0.7s' }}></span>
          </div>
        ) : (
          <Play size={16} className="fill-plum text-plum" />
        )}
      </button>

      <div className="h-4 w-px bg-plum/20"></div>

      <button
        id="btn-mute-music"
        onClick={toggleMute}
        className="p-1.5 rounded-full text-plum hover:bg-rose-layer/30 transition-colors duration-300"
        aria-label={volume === 0 ? 'Unmute' : 'Mute'}
      >
        {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      <input
        id="volume-slider"
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-16 h-1 bg-plum/10 rounded-lg appearance-none cursor-pointer accent-lilac"
      />
    </div>
  );
}
