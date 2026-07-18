import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import MemoriesScreen from './components/MemoriesScreen';
import JourneyScreen from './components/JourneyScreen';
import KeepsakeBoxScreen from './components/KeepsakeBoxScreen';
import SparkleBackground from './components/SparkleBackground';
import FloatingHearts from './components/FloatingHearts';
import AudioPlayer from './components/AudioPlayer';
import LoadingScreen from './components/LoadingScreen';
import VideoTransition from './components/VideoTransition';
import { birthdayVideoUrl, galleryItems, reasons, storyFrames, storyPassword } from './data';

// Lazy load heavy components
const MissionComplete = lazy(() => import('./components/MissionComplete'));
const StoryViewer = lazy(() => import('./components/StoryViewer'));
const FinalGoodbye = lazy(() => import('./components/FinalGoodbye'));

type ActiveTab = 'welcome' | 'gallery' | 'reasons' | 'story' | 'mission' | 'password' | 'video-transition' | 'goodbye';

function FallbackLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-lilac/30 border-t-lilac rounded-full animate-spin" />
        <p className="font-serif italic text-plum/60 text-sm animate-pulse">Loading surprise...</p>
      </div>
    </div>
  );
}

export default function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('welcome');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [videoUnlockedOnce, setVideoUnlockedOnce] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const wasMusicPlayingBeforeVideoRef = useRef(false);

  useEffect(() => {
    document.title = 'A Birthday Storybook';
    if (typeof window !== 'undefined' && window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior
    });
  }, [activeTab]);

  const changeTab = (tab: ActiveTab) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveTab(tab);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 550);
  };

  const startGallery = () => changeTab('gallery');
  const startReasons = () => changeTab('reasons');
  const startStory = () => changeTab('story');

  const handleVideoStateChange = (videoPlaying: boolean) => {
    if (videoPlaying) {
      wasMusicPlayingBeforeVideoRef.current = musicPlaying;
      if (musicPlaying) {
        setMusicPlaying(false);
      }
    } else {
      if (wasMusicPlayingBeforeVideoRef.current) {
        setMusicPlaying(true);
      }
    }
  };

  // Common animation config for premium feel page transitions (fade + slight slide)
  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 }
  };

  const pageTransition = {
    duration: 0.5,
    ease: 'easeInOut' as const
  };

  if (!isAppLoaded) {
    return <LoadingScreen onComplete={() => setIsAppLoaded(true)} />;
  }

  return (
    <div id="heirloom-app-root" className="min-h-screen bg-[#FBEFEF] text-plum relative overflow-x-hidden flex flex-col font-sans transition-colors duration-500">
      <SparkleBackground />
      <FloatingHearts />

      <AudioPlayer
        isPlaying={musicPlaying}
        onTogglePlay={setMusicPlaying}
        trackUrl={birthdayVideoUrl}
      />

      <AnimatePresence>
        {activeTab !== 'welcome' && (
          <motion.header
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={pageTransition}
            className="w-full flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/20 bg-white/10 backdrop-blur-md sticky top-0 z-30"
          >
            <button
              id="header-brand-logo"
              onClick={() => changeTab('welcome')}
              disabled={isTransitioning}
              className={`flex items-center gap-2 text-plum group cursor-pointer focus:outline-none ${isTransitioning ? 'pointer-events-none' : ''}`}
            >
              <span className="font-serif text-xl font-medium italic tracking-wide group-hover:text-lilac transition-colors">Our Story — More than just a Teammate</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline font-mono text-[10px] tracking-widest text-plum/40 uppercase font-semibold">
                A surprise for my boyfriend
              </span>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <main className="flex-grow pb-32 z-10 relative">
        <Suspense fallback={<FallbackLoader />}>
          <AnimatePresence mode="wait">
            {activeTab === 'welcome' && (
              <motion.div
                key="welcome-view"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <IntroScreen onStart={startGallery} />
              </motion.div>
            )}

            {activeTab === 'gallery' && (
              <motion.div
                key="gallery-view"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <MemoriesScreen memories={galleryItems} onContinue={startReasons} />
              </motion.div>
            )}

            {activeTab === 'reasons' && (
              <motion.div
                key="reasons-view"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <JourneyScreen reasons={reasons} onContinue={startStory} />
              </motion.div>
            )}

            {activeTab === 'story' && (
              <motion.div
                key="story-view"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <KeepsakeBoxScreen
                  storyFrames={storyFrames}
                  storyPassword={storyPassword}
                  videoUrl={birthdayVideoUrl}
                  onComplete={() => changeTab('mission')}
                />
              </motion.div>
            )}

            {activeTab === 'mission' && (
              <motion.div
                key="mission-view"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <MissionComplete
                  onContinue={() => changeTab('password')}
                />
              </motion.div>
            )}

            {activeTab === 'password' && (
              <motion.div
                key="password-view"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <div className="max-w-4xl mx-auto px-6 py-12 select-none relative z-10">
                  <StoryViewer
                    frames={storyFrames}
                    password={storyPassword}
                    videoUrl={birthdayVideoUrl}
                    initialStage={videoUnlockedOnce ? 'final' : 'password'}
                    onVideoComplete={() => {
                      setVideoUnlockedOnce(true);
                      changeTab('video-transition');
                    }}
                    onVideoStateChange={handleVideoStateChange}
                  />
                </div>
              </motion.div>
            )}

            {activeTab === 'video-transition' && (
              <motion.div
                key="video-transition-view"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <VideoTransition
                  onWatchAgain={() => {
                    changeTab('password');
                    setMusicPlaying(true);
                  }}
                  onReadLetter={() => changeTab('goodbye')}
                />
              </motion.div>
            )}

            {activeTab === 'goodbye' && (
              <motion.div
                key="goodbye-view"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <FinalGoodbye
                  onFinish={() => {
                    changeTab('welcome');
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Suspense>
      </main>

      <AnimatePresence>
        {activeTab !== 'welcome' && (
          <motion.nav
            id="floating-bottom-navbar"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex justify-between items-center"
            style={{ boxShadow: '0px 10px 40px rgba(59, 46, 53, 0.08)' }}
          >
            <button
              id="nav-btn-welcome"
              onClick={() => changeTab('welcome')}
              disabled={isTransitioning}
              className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${isTransitioning ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${(activeTab as string) === 'welcome' ? 'bg-lilac text-white shadow-md scale-105' : 'text-plum/70 hover:text-lilac'}`}
            >
              Home
            </button>
            <button
              id="nav-btn-gallery"
              onClick={() => changeTab('gallery')}
              disabled={isTransitioning}
              className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${isTransitioning ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${activeTab === 'gallery' ? 'bg-lilac text-white shadow-md scale-105' : 'text-plum/70 hover:text-lilac'}`}
            >
              Gallery
            </button>
            <button
              id="nav-btn-reasons"
              onClick={() => changeTab('reasons')}
              disabled={isTransitioning}
              className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${isTransitioning ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${activeTab === 'reasons' ? 'bg-lilac text-white shadow-md scale-105' : 'text-plum/70 hover:text-lilac'}`}
            >
              Reasons
            </button>
            <button
              id="nav-btn-story"
              onClick={() => changeTab('story')}
              disabled={isTransitioning}
              className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${isTransitioning ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${
                activeTab === 'story' || activeTab === 'mission' || activeTab === 'password' || activeTab === 'video-transition' || activeTab === 'goodbye'
                  ? 'bg-lilac text-white shadow-md scale-105'
                  : 'text-plum/70 hover:text-lilac'
              }`}
            >
              Story
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
