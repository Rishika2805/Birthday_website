import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface MemoriesScreenProps {
  memories: Array<{
    id: string;
    image: string;
    caption: string;
    rotation: number;
  }>;
  onContinue?: () => void;
}

const captionStyles = [
  'font-["Bradley Hand", "Segoe Print", cursive]',
  'font-["Comic Sans MS", "Segoe Print", cursive]',
  'font-["Snell Roundhand", "Segoe Print", cursive]',
  'font-["Brush Script MT", "Segoe Print", cursive]'
];

export default function MemoriesScreen({ memories, onContinue }: MemoriesScreenProps) {
  const [showContinue, setShowContinue] = useState(false);

  const gallery = useMemo(
    () =>
      memories.map((memory, index) => ({
        ...memory,
        tilt: memory.rotation ?? [-4, 3, -2, 4, -3, 2][index % 6],
        delay: index * 0.18,
        captionClass: captionStyles[index % captionStyles.length]
      })),
    [memories]
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowContinue(true), gallery.length * 180 + 900);
    return () => window.clearTimeout(timeout);
  }, [gallery.length]);

  return (
    <div id="memories-screen-container" className="max-w-6xl mx-auto px-4 md:px-8 py-12 select-none z-10 relative">
      <div className="text-center mb-14 space-y-4">
        <span className="block font-sans text-[11px] font-semibold tracking-[0.35em] uppercase text-lilac">
          A LITTLE GALLERY
        </span>
        <h2 className="font-serif text-3xl md:text-5xl italic text-plum font-normal">
          The Boy I Fell For
        </h2>
        <p className="mx-auto max-w-md whitespace-pre-line font-sans text-[15px] leading-relaxed text-plum/65">
          Every photo here reminds me how lucky I am to know you.
          I don't need hundreds of pictures together.
          Every picture of you already makes me smile.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
        {gallery.map((memory) => (
          <motion.figure
            key={memory.id}
            initial={{ opacity: 0, y: -90, rotate: memory.tilt, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, rotate: memory.tilt, scale: 1 }}
            transition={{
              delay: memory.delay,
              duration: 0.9,
              type: 'spring',
              stiffness: 120,
              damping: 12,
              bounce: 0.45
            }}
            whileHover={{ y: -8, rotate: 0, scale: 1.02 }}
            className="relative bg-white/95 p-5 pb-7 rounded-[1.4rem] border border-white/70 shadow-[0_18px_45px_rgba(59,46,53,0.10)]"
            style={{ boxShadow: '0px 10px 40px rgba(59, 46, 53, 0.06)' }}
          >
            <div className="aspect-[4/5] w-full overflow-hidden rounded-[1rem] bg-rose-layer/10">
              <img
                src={memory.image}
                alt={memory.caption}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>

            <figcaption
              className={`mt-4 text-center text-[20px] italic text-plum/90 ${memory.captionClass}`}
            >
              {memory.caption}
            </figcaption>

            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-white/90 shadow-sm"
              animate={{ scale: [1, 1.2, 1], opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {showContinue && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mt-14 flex justify-center"
          >
            <button
              type="button"
              onClick={onContinue}
              className="rounded-full bg-lilac px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-[0_10px_24px_rgba(183,139,191,0.24)] transition-transform duration-300 hover:scale-[1.03]"
            >
              Continue
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
