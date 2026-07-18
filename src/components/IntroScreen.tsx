import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Heart } from 'lucide-react';
import ReactCanvasConfetti from 'react-canvas-confetti';

interface IntroScreenProps {
  onStart: () => void;
}

interface CandleProps {
  lit: boolean;
  leftPercent: number;
  topPercent: number;
}

function Candle({ lit, leftPercent, topPercent }: CandleProps) {
  const [hasSmoke, setHasSmoke] = useState(false);

  useEffect(() => {
    if (!lit) {
      setHasSmoke(true);
    }
  }, [lit]);

  return (
    <div
      className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-full pointer-events-none"
      style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
    >
      {/* Flame */}
      <AnimatePresence>
        {lit && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              scaleY: [1, 1.2, 0.9, 1.1, 1],
              scaleX: [1, 0.9, 1.1, 0.95, 1],
              rotate: [-1, 2, -2, 1, 0],
              y: [0, -2, 0, 1, 0]
            }}
            exit={{
              scale: 0,
              opacity: 0,
              y: -12,
              transition: { duration: 0.25 }
            }}
            transition={{
              scale: { duration: 0.3 },
              opacity: { duration: 0.3 },
              scaleY: { repeat: Infinity, duration: 1 + Math.random() * 0.4, ease: "easeInOut" },
              scaleX: { repeat: Infinity, duration: 1.1 + Math.random() * 0.3, ease: "easeInOut" },
              rotate: { repeat: Infinity, duration: 0.8 + Math.random() * 0.3, ease: "easeInOut" },
              y: { repeat: Infinity, duration: 1.3 + Math.random() * 0.3, ease: "easeInOut" }
            }}
            className="absolute -top-5 w-3.5 h-6 rounded-full bg-gradient-to-t from-orange-500 via-yellow-400 to-amber-200 shadow-[0_0_12px_rgba(249,115,22,0.6),0_0_24px_rgba(253,224,71,0.35)] origin-bottom"
          />
        )}
      </AnimatePresence>

      {/* Smoke */}
      <AnimatePresence>
        {hasSmoke && (
          <motion.div
            initial={{ y: -4, opacity: 0.8, scale: 0.4 }}
            animate={{
              y: -40,
              opacity: 0,
              scale: 1.6,
              x: [0, -4, 4, -2, 0]
            }}
            transition={{
              duration: 1.2,
              ease: "easeOut"
            }}
            onAnimationComplete={() => setHasSmoke(false)}
            className="absolute -top-6 w-4 h-4 bg-plum/20 rounded-full blur-[1.5px]"
          />
        )}
      </AnimatePresence>

      {/* Wick */}
      <div className="w-[1.5px] h-2 bg-zinc-600 rounded-t" />

      {/* Candle Body */}
      <div className="w-2 h-10 bg-gradient-to-r from-rose-layer via-white to-rose-layer border border-rose-border/30 rounded-sm relative overflow-hidden shadow-inner">
        {/* Striped pattern */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(183,139,191,0.35)_0px,rgba(183,139,191,0.35)_3px,transparent_3px,transparent_6px)]" />
      </div>
    </div>
  );
}


export default function IntroScreen({ onStart }: IntroScreenProps) {
  const [candlesState, setCandlesState] = useState([true, true, true, true, true]);
  const [isBlowing, setIsBlowing] = useState(false);
  const [wishGranted, setWishGranted] = useState(false);
  const [confettiInstance, setConfettiInstance] = useState<any>(null);


  const onConfettiInit = ({ confetti }: { confetti: any }) => {
    setConfettiInstance(() => confetti);
  };

  const blowCandles = () => {
    setIsBlowing(true);

    // Sequentially blow out the candles
    const timings = [100, 220, 320, 420, 500];
    timings.forEach((delay, idx) => {
      setTimeout(() => {
        setCandlesState((prev) => {
          const next = [...prev];
          next[idx] = false;
          return next;
        });
      }, delay);
    });

    // Launch confetti and transition after the blowout completes
    setTimeout(() => {
      triggerConfetti();
    }, 1000);
  };

  const triggerConfetti = () => {
    if (!confettiInstance) return;

    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 35, spread: 60, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        // Fade in final message after confetti completes
        setWishGranted(true);
        return;
      }

      const particleCount = 45 * (timeLeft / duration);

      // Burst from left side
      confettiInstance({
        ...defaults,
        particleCount,
        angle: randomInRange(55, 75),
        origin: { x: 0, y: 0.75 },
        colors: ['#F5D8D8', '#B78BBF', '#FFFFFF', '#FFD700']
      });

      // Burst from right side
      confettiInstance({
        ...defaults,
        particleCount,
        angle: randomInRange(105, 125),
        origin: { x: 1, y: 0.75 },
        colors: ['#F5D8D8', '#B78BBF', '#FFFFFF', '#FFD700']
      });
    }, 200);
  };

  return (
    <div id="intro-screen-container" className="flex flex-col min-h-[90vh] justify-between relative px-6 md:px-12 py-8 z-10 max-w-lg mx-auto select-none">


      {/* react-canvas-confetti */}
      <ReactCanvasConfetti
        onInit={onConfettiInit}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* Decorative Sparkle - Left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
        className="absolute top-[15%] left-[5%] text-[#B8A6CC] pointer-events-none"
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
        className="absolute bottom-[25%] right-[5%] text-[#B8A6CC] pointer-events-none"
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
        className="flex items-center justify-between w-full border-b border-[#EDC0C0]/30 pb-4 mb-4"
      >
        <div className="flex items-center gap-2 text-plum">
          <BookOpen size={22} className="stroke-[1.5]" />
          <h1 className="font-serif text-2xl font-medium italic tracking-wide">A Birthday Storybook</h1>
        </div>
        <Heart size={20} className="text-plum stroke-[1.5] hover:fill-rose-300 hover:text-rose-500 transition-colors cursor-pointer" />
      </motion.header>

      {/* Main Content Area centered vertically */}
      <div className="flex-grow flex flex-col items-center justify-center text-center gap-6 py-4">
        {/* Titles Section */}
        <div className="space-y-3 min-h-[110px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!wishGranted ? (
              <motion.div
                key="before-wish"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <h2 className="font-serif text-[40px] sm:text-[46px] text-plum font-normal italic leading-tight tracking-tight">
                  Happy Birthday ❤️
                </h2>
                <div className="space-y-1">
                  <p className="font-sans text-xs uppercase tracking-[0.18em] font-semibold text-plum/50">
                    Before we begin...
                  </p>
                  <p className="font-serif text-[15px] sm:text-[16px] italic text-plum/75">
                    Make a wish and blow out the candles.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="after-wish"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="space-y-2"
              >
                <h2 className="font-serif text-[40px] sm:text-[46px] text-plum font-normal italic leading-tight tracking-tight">
                  ✨ Wish Granted ✨
                </h2>
                <p className="font-serif text-[15px] sm:text-[17px] italic text-plum/80 leading-relaxed max-w-sm mx-auto">
                  Now let me show you something I made just for you.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Beautiful Birthday Cake Component */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: 1, 
            y: [0, -6, 0]
          }}
          transition={{
            opacity: { duration: 0.8 },
            y: {
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut"
            }
          }}
          className="relative flex flex-col items-center justify-center my-4"
        >
          {/* Cake & Stand SVG */}
          <div className="relative">
            <svg viewBox="0 0 300 220" className="w-64 h-48 drop-shadow-[0_15px_30px_rgba(59,46,53,0.08)] relative z-10">
              {/* Cake Stand */}
              <ellipse cx="150" cy="200" rx="110" ry="12" fill="#E6C280" opacity="0.25" />
              <ellipse cx="150" cy="196" rx="100" ry="12" fill="#ffffff" stroke="#EDC0C0" strokeWidth="1.5" />
              <rect x="135" y="196" width="30" height="15" fill="#EDC0C0" opacity="0.8" rx="4" />
              <ellipse cx="150" cy="211" rx="45" ry="6" fill="#EDC0C0" />

              {/* Bottom Tier Shadow */}
              <path d="M 70,190 A 80,24 0 0 0 230,190" fill="none" stroke="#EDC0C0" strokeWidth="3" opacity="0.4" />

              {/* Bottom Tier (Pink) */}
              <rect x="65" y="130" width="170" height="60" rx="10" fill="#F5D8D8" stroke="#EDC0C0" strokeWidth="1.5" />
              {/* Bottom Tier Frosting Details (Drips) */}
              <path d="M 65,140 Q 75,155 85,140 T 105,140 T 125,140 T 145,140 T 165,140 T 185,140 T 205,140 T 225,140 Q 235,155 235,140" fill="#ffffff" opacity="0.85" />

              {/* Top Tier (Cream/White) */}
              <rect x="90" y="80" width="120" height="50" rx="8" fill="#FFF7F7" stroke="#EDC0C0" strokeWidth="1.5" />
              {/* Top Tier Frosting Details */}
              <path d="M 90,90 Q 100,102 110,90 T 130,90 T 150,90 T 170,90 T 190,90 Q 200,102 210,90" fill="#B78BBF" opacity="0.4" />

              {/* Cake Sprinkles decoration */}
              {/* Bottom Tier Sprinkles */}
              <circle cx="85" cy="165" r="2.5" fill="#B78BBF" />
              <circle cx="115" cy="175" r="2" fill="#E6C280" />
              <circle cx="150" cy="160" r="2.5" fill="#ffffff" />
              <circle cx="185" cy="170" r="2" fill="#B78BBF" />
              <circle cx="215" cy="165" r="2.5" fill="#E6C280" />

              {/* Top Tier Sprinkles */}
              <circle cx="110" cy="110" r="2" fill="#E6C280" />
              <circle cx="135" cy="115" r="2.5" fill="#B78BBF" />
              <circle cx="165" cy="105" r="2" fill="#ffffff" />
              <circle cx="190" cy="112" r="2.5" fill="#E6C280" />
            </svg>

            {/* 5 Animated Candles placed on top tier (y = 80, x = 110, 130, 150, 170, 190) */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {candlesState.map((lit, idx) => (
                <Candle
                  key={idx}
                  lit={lit}
                  leftPercent={36.6 + idx * 6.7} // 110/300, 130/300, 150/300, 170/300, 190/300
                  topPercent={36.36} // 80/220
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Button Section */}
        <div className="min-h-[80px] flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {!wishGranted ? (
              <motion.button
                key="btn-blow"
                id="btn-blow-candles"
                disabled={isBlowing}
                onClick={blowCandles}
                whileHover={!isBlowing ? { 
                  scale: 1.03,
                  boxShadow: '0px 0px 15px rgba(183, 139, 191, 0.4)' 
                } : {}}
                whileTap={!isBlowing ? { scale: 0.98 } : {}}
                className={`px-8 py-3.5 font-sans text-xs font-semibold tracking-widest rounded-full uppercase transition-all duration-300 shadow-md ${
                  isBlowing
                    ? 'bg-plum/20 text-plum/40 cursor-not-allowed'
                    : 'bg-lilac hover:bg-lilac-hover text-white cursor-pointer'
                }`}
              >
                {isBlowing ? 'Blowing Candles...' : '✨ Blow the Candles'}
              </motion.button>
            ) : (
              <motion.button
                key="btn-journey"
                id="btn-start-celebration"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0px 0px 15px rgba(183, 139, 191, 0.4)' 
                }}
                whileTap={{ scale: 0.98 }}
                onClick={onStart}
                className="px-8 py-3.5 bg-lilac hover:bg-lilac-hover text-white font-sans text-xs font-semibold tracking-widest rounded-full uppercase transition-all duration-300 cursor-pointer shadow-md"
              >
                Begin the Journey ❤️
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="w-full text-center pt-8 border-t border-[#EDC0C0]/10">
        <p className="font-serif text-[13px] text-plum/40 italic">With love, forever.</p>
      </div>
    </div>
  );
}
