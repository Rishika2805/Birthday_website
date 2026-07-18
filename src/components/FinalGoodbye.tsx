import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FinalGoodbyeProps {
  onFinish: () => void;
}

interface FloatingItem {
  id: number;
  x: number; // percentage
  y: number; // percentage
  size: number; // pixels
  delay: number; // seconds
  duration: number; // seconds
  type: 'heart' | 'sparkle';
}

export default function FinalGoodbye({ onFinish }: FinalGoodbyeProps) {
  const [scene, setScene] = useState<'letter' | 'movie'>('letter');
  const [floatingItems, setFloatingItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    // Generate 12 subtle floating elements
    const items: FloatingItem[] = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 8, // 8px to 18px
      delay: Math.random() * -15,
      duration: Math.random() * 10 + 15, // 15s to 25s
      type: i % 2 === 0 ? 'heart' : 'sparkle'
    }));
    setFloatingItems(items);
  }, []);

  const handleFinish = () => {
    setScene('movie');
  };

  // Animation variants for the letter screen
  const pageVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
        staggerChildren: 0.25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      y: -10,
      transition: { duration: 0.6, ease: 'easeInOut' as const }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' as const }
    }
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const }
    }
  };

  const endingLine1Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 0.65,
      y: 0,
      transition: { delay: 1.8, duration: 0.6 }
    }
  };

  const endingLine2Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 2.3, duration: 0.6, type: 'spring' as const, stiffness: 90 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 2.8, type: 'spring' as const, stiffness: 100 }
    }
  };

  // Movie scene animation variants
  const movieContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeOut' as const }
    }
  };

  const textLine1Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1.0, duration: 1.8, ease: 'easeInOut' as const }
    }
  };

  const textLine2Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 3.2, duration: 1.8, ease: 'easeInOut' as const }
    }
  };

  const textLine3Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 5.4, duration: 1.8, ease: 'easeInOut' as const }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {scene === 'letter' ? (
        <motion.div
          key="letter-scene"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="max-w-2xl mx-auto w-full px-6 py-12 flex flex-col justify-center min-h-[90vh] select-none relative z-10"
        >
          {/* Subtle floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {floatingItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: '100%' }}
                animate={{
                  opacity: [0, 0.15, 0.15, 0],
                  y: ['100%', '-20%'],
                  x: [`${item.x}%`, `${item.x + (Math.sin(item.id) * 10)}%`]
                }}
                transition={{
                  duration: item.duration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: item.delay
                }}
                className="absolute text-plum"
                style={{
                  width: `${item.size}px`,
                  height: `${item.size}px`,
                  left: `${item.x}%`
                }}
              >
                {item.type === 'heart' ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-lilac/30">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-rose-500/20">
                    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
                  </svg>
                )}
              </motion.div>
            ))}
            {/* Glowing background shapes */}
            <div className="absolute top-1/3 left-1/4 w-52 h-52 bg-rose-layer/15 rounded-full filter blur-[70px]" />
            <div className="absolute bottom-1/3 right-1/4 w-52 h-52 bg-lilac/10 rounded-full filter blur-[70px]" />
          </div>

          <div className="flex flex-col items-center justify-center space-y-6 relative z-10 text-center">
            
            {/* Header */}
            <motion.h2 
              variants={titleVariants}
              className="font-serif text-[42px] sm:text-[48px] text-plum font-normal italic leading-none tracking-tight flex items-center gap-2 justify-center"
            >
              For You <span className="text-rose-500 fill-current">❤️</span>
            </motion.h2>

            {/* Glassmorphic Handwritten Letter */}
            <motion.div 
              variants={letterVariants}
              className="bg-white/55 backdrop-blur-md border border-white/30 rounded-[2rem] p-6 md:p-8 shadow-[0px_15px_45px_rgba(59,46,53,0.08)] w-full text-left"
            >
              <div className="font-['Bradley_Hand',_'Segoe_Print',_cursive] text-[16px] md:text-[18px] text-plum/85 space-y-5 leading-relaxed">
                
                {/* Salutation */}
                <motion.p variants={paragraphVariants} className="font-bold">
                  Dear Verma Ji,
                </motion.p>

                {/* Paragraph 1 */}
                <motion.p variants={paragraphVariants}>
                  Hmmmm..... Toh kaisa laga mera surprise?? I hope apko pasand aaya hoga. Bhot mehnat lag gya yrrrr...... BC itna mehnat toh pehli bar karre kisi ke liye ham but maja toh ayya bhot maja aaya or bhot excited bhi hai apko dikhane ke liye... Again wishing you a very very very very happiiii birthdayyyyy... Lots of love.... khush rahe, muskurate rahe... sada suhagan rahe... apki shadi nhi hui phir bhi rahe.... or aage badhte rahe....
                </motion.p>

                {/* Paragraph 2 */}
                <motion.p variants={paragraphVariants}>
                  I hope ki ham apka birthday special bana pay hoo. I know expensive gifts toh nhi de sakte but still tried my best (Tech peeps and A girl who likes craft ). I know ham kabhi kabhi bhot gussa kar dete bhot naraz ho jate but aapse nhi toh or kisse But still I am trying my best to keep my anger in check soo please cooperate haan....
                </motion.p>

                {/* Paragraph 3 */}
                <motion.p variants={paragraphVariants}>
                  Its your birthday today ghume phire aish kre maje kre or haan hamko party dena na bhule okieee.... and padhai kre man laga ki iss saal kaise bhi karke khudko prove karna hai ham dono ko khudke liye bhi or ekk dushre ke liye bhi taki koi dushra hamper ungli na utha pay or yuppp agar nhi bhi hua toh koi baat nhi I know you are strong koi na koi trika aap jarur nikal loge and always remember I am with you always chahe jo bhi condition hoo apko samjhayenge , baat sunayenge , darayenge but rahegnge toh apke sath hi ,aab dushra boyfriend kon hi khoje itna mehnat kon kre..... (hehhehehhehe joking joking) toh bas ashai muskurate rahe haste rahe aage badhe
                </motion.p>

                {/* Paragraph 4 */}
                <motion.p variants={paragraphVariants}>
                  or jab bhi lage ki nhi hora toh khudko ekk ye remind karway ki apke pass ham hai sath dene ko toh phir kis baat ka tension nhi kuch hoga toh sath me momos ka shop khol lenge ( BC bhot paisa hai isme bhi ) bas tension and stress nhi lena hamseha aage badhte rehna....
                </motion.p>

                {/* Paragraph 5 */}
                <motion.p variants={paragraphVariants}>
                  Kuch jyda hi bak bak kar diya maine.... aaj ke liye bas itna hi.... HAPPY BIRTHDAY NAMAN :)
                </motion.p>

                {/* Sign-off */}
                <div className="pt-4 space-y-2">
                  <motion.p 
                    variants={endingLine1Variants} 
                    className="font-sans text-[11px] uppercase tracking-[0.25em] font-semibold text-plum/50 text-center"
                  >
                    Thank you for being part of my story.
                  </motion.p>
                  
                  <motion.p 
                    variants={endingLine2Variants}
                    className="font-serif italic text-2xl font-semibold text-plum text-center leading-none mt-1"
                  >
                    I love you.
                  </motion.p>
                </div>

              </div>
            </motion.div>

            {/* Bottom Button */}
            <motion.div variants={buttonVariants} className="pt-2 flex justify-center">
              <button
                id="btn-final-end"
                onClick={handleFinish}
                className="px-8 py-3.5 bg-lilac hover:bg-lilac-hover text-white font-sans text-xs font-semibold tracking-widest rounded-full uppercase transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2"
                style={{
                  boxShadow: '0px 4px 15px rgba(183, 139, 191, 0.25)'
                }}
              >
                The End ❤️
              </button>
            </motion.div>

          </div>
        </motion.div>
      ) : (
        <motion.div
          key="movie-scene"
          variants={movieContainerVariants}
          initial="hidden"
          animate="visible"
          className="fixed inset-0 bg-[#000000] z-50 flex flex-col items-center justify-center text-center px-6 select-none"
        >
          <div className="space-y-8 max-w-lg">
            <motion.p
              variants={textLine1Variants}
              className="font-serif italic text-2xl md:text-3xl text-[#F5F5F5] drop-shadow-[0_0_12px_rgba(245,245,245,0.25)]"
            >
              The End...
            </motion.p>
            <motion.p
              variants={textLine2Variants}
              className="font-serif italic text-xl md:text-2xl text-[#F5F5F5]/80 drop-shadow-[0_0_8px_rgba(245,245,245,0.15)]"
            >
              ...or maybe just the beginning.
            </motion.p>
            <motion.p
              variants={textLine3Variants}
              className="font-serif italic text-3xl md:text-4xl text-[#F5F5F5] font-semibold drop-shadow-[0_0_15px_rgba(245,245,245,0.4)]"
            >
              Happy Birthday ❤️
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
