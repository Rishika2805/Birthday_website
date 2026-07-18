import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: (play: boolean) => void;
  trackUrl: string;
}

// @ts-ignore
import songKaiseHua from '../../assets/song/Kaise_hua.mpeg';
// @ts-ignore
import songUntilFoundYou from '../../assets/song/Until_I_Found_You.mpeg';
// @ts-ignore
import songPerfect from '../../assets/song/Perfect.mpeg';

const playlist = [songKaiseHua, songUntilFoundYou, songPerfect];

export default function AudioPlayer({ isPlaying, onTogglePlay }: Omit<AudioPlayerProps, 'trackUrl'> & { trackUrl?: string }) {
  const [volume, setVolume] = useState(0.35);
  const [, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const isPlayingRef = useRef(isPlaying);

  isPlayingRef.current = isPlaying;

  // Initialize the single audio instance if it doesn't exist
  if (!audioRef.current) {
    audioRef.current = new Audio(playlist[0]);
    audioRef.current.loop = false; // Disable individual looping to trigger 'ended' event
    audioRef.current.volume = 0.35;
  }

  // Fades volume to target value over specified duration
  const fadeAudio = (targetVolume: number, duration: number, callback?: () => void) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const startVolume = audioRef.current.volume;
    const steps = 15;
    const stepTime = duration / steps;
    const volumeStep = (targetVolume - startVolume) / steps;
    let currentStep = 0;

    fadeIntervalRef.current = window.setInterval(() => {
      if (!audioRef.current) {
        clearInterval(fadeIntervalRef.current!);
        return;
      }
      currentStep++;
      const nextVolume = startVolume + volumeStep * currentStep;
      audioRef.current.volume = Math.max(0, Math.min(1, nextVolume));

      if (currentStep >= steps) {
        clearInterval(fadeIntervalRef.current!);
        fadeIntervalRef.current = null;
        audioRef.current.volume = targetVolume;
        if (callback) callback();
      }
    }, stepTime);
  };

  // Start playing after the user's first interaction anywhere on screen
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isPlaying) {
        onTogglePlay(true);
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying, onTogglePlay]);

  // Handle play/pause commands with fading
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        fadeAudio(volume, 500);
      }).catch((err) => {
        console.log('Autoplay blocked by browser. User interaction required.', err);
        onTogglePlay(false);
      });
    } else {
      fadeAudio(0, 500, () => {
        if (!isPlayingRef.current && audioRef.current) {
          audioRef.current.pause();
        }
      });
    }
  }, [isPlaying]);

  // Handle auto-advancing playlist when a song ends with crossfading
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTrackEnded = () => {
      fadeAudio(0, 500, () => {
        setCurrentTrackIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % playlist.length;
          audio.src = playlist[nextIndex];
          audio.load();
          if (isPlaying) {
            audio.volume = 0;
            audio.play().then(() => {
              fadeAudio(volume, 500);
            }).catch((err) => {
              console.log('Playback error on auto-advancing track:', err);
            });
          }
          return nextIndex;
        });
      });
    };

    audio.addEventListener('ended', handleTrackEnded);
    return () => {
      audio.removeEventListener('ended', handleTrackEnded);
    };
  }, [isPlaying, volume]);

  // Sync volume level when changed via slider
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      audioRef.current.volume = volume;
    }
  }, [volume, isPlaying]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0);
      onTogglePlay(false);
    } else {
      setVolume(0.35);
      onTogglePlay(true);
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
        className="p-1.5 rounded-full text-plum hover:bg-rose-layer/30 transition-colors duration-300 cursor-pointer"
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
        className="p-1.5 rounded-full text-plum hover:bg-rose-layer/30 transition-colors duration-300 cursor-pointer"
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
