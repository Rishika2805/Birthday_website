import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface JourneyScreenProps {
  reasons: string[];
  onContinue?: () => void;
}

export default function JourneyScreen({ reasons, onContinue }: JourneyScreenProps) {
  const reasonCards = reasons.slice(0, 100);

  return (
    <div id="journey-screen-container" className="max-w-6xl mx-auto px-4 md:px-8 py-12 select-none relative z-10">
      <div className="text-center mb-16 space-y-3">
        <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-lilac block">100 Reasons</span>
        <h2 className="font-serif text-3xl md:text-4xl italic text-plum font-normal">Why I Love You</h2>
        <p className="font-sans text-[15px] text-plum/60 max-w-md mx-auto leading-relaxed">
          A soft little wall of reasons, each one meant to be read slowly and held close.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        <AnimatePresence>
          {reasonCards.map((reason, index) => (
            <motion.article
              key={`${index}-${reason}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: (index % 12) * 0.02 }}
              whileHover={{ y: -6, scale: 1.01, boxShadow: '0px 16px 35px rgba(59, 46, 53, 0.08)' }}
              className="relative overflow-hidden rounded-3xl border border-[#EDC0C0]/60 bg-white/55 backdrop-blur-md p-5 md:p-6 min-h-[150px] flex flex-col justify-between"
              style={{ boxShadow: '0px 10px 30px rgba(59, 46, 53, 0.05)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-full bg-rose-layer/45 flex items-center justify-center text-lilac">
                  <Heart size={16} className="fill-current" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-plum/35">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="font-serif text-[17px] md:text-[18px] leading-relaxed italic text-plum/85">
                {reason}
              </p>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-14 flex justify-center">
        <motion.button
          type="button"
          onClick={onContinue}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-full bg-lilac px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_24px_rgba(183,139,191,0.24)] transition-colors duration-300"
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
}
