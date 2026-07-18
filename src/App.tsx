import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import IntroScreen from './components/IntroScreen';
import MemoriesScreen from './components/MemoriesScreen';
import JourneyScreen from './components/JourneyScreen';
import KeepsakeBoxScreen from './components/KeepsakeBoxScreen';
import SparkleBackground from './components/SparkleBackground';
import AudioPlayer from './components/AudioPlayer';
import { birthdayVideoUrl, galleryItems, reasons, storyFrames, storyPassword } from './data';

import MissionComplete from './components/MissionComplete';
import StoryViewer from './components/StoryViewer';

type ActiveTab = 'welcome' | 'gallery' | 'reasons' | 'story' | 'mission' | 'password';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('welcome');
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    document.title = 'A Birthday Storybook';
  }, []);

  const startGallery = () => setActiveTab('gallery');
  const startReasons = () => setActiveTab('reasons');
  const startStory = () => setActiveTab('story');

  return (
    <div id="heirloom-app-root" className="min-h-screen bg-[#FBEFEF] text-plum relative overflow-x-hidden flex flex-col font-sans transition-colors duration-500">
      <SparkleBackground />

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
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-6xl mx-auto px-6 md:px-12 py-5 border-b border-[#EDC0C0]/30 flex items-center justify-between z-40 relative"
          >
            <button
              id="header-brand-logo"
              onClick={() => setActiveTab('welcome')}
              className="flex items-center gap-2 text-plum group cursor-pointer focus:outline-none"
            >
              <span className="font-serif text-xl font-medium italic tracking-wide group-hover:text-lilac transition-colors">Our Story</span>
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
        <AnimatePresence mode="wait">
          {activeTab === 'welcome' && (
            <motion.div
              key="welcome-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              <IntroScreen onStart={startGallery} />
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div
              key="gallery-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              <MemoriesScreen memories={galleryItems} onContinue={startReasons} />
            </motion.div>
          )}

          {activeTab === 'reasons' && (
            <motion.div
              key="reasons-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              <JourneyScreen reasons={reasons} onContinue={startStory} />
            </motion.div>
          )}

          {activeTab === 'story' && (
            <motion.div
              key="story-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              <KeepsakeBoxScreen
                storyFrames={storyFrames}
                storyPassword={storyPassword}
                videoUrl={birthdayVideoUrl}
                onComplete={() => setActiveTab('mission')}
              />
            </motion.div>
          )}

          {activeTab === 'mission' && (
            <motion.div
              key="mission-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              <MissionComplete
                onContinue={() => setActiveTab('password')}
              />
            </motion.div>
          )}

          {activeTab === 'password' && (
            <motion.div
              key="password-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-4xl mx-auto px-6 py-12 select-none relative z-10">
                <StoryViewer
                  frames={storyFrames}
                  password={storyPassword}
                  videoUrl={birthdayVideoUrl}
                  initialStage="password"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {activeTab !== 'welcome' && (
          <motion.nav
            id="floating-bottom-navbar"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex justify-between items-center"
            style={{ boxShadow: '0px 10px 40px rgba(59, 46, 53, 0.08)' }}
          >
            <button
              id="nav-btn-welcome"
              onClick={() => setActiveTab('welcome')}
              className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${activeTab === 'welcome' ? 'bg-lilac text-white shadow-md scale-105' : 'text-plum/70 hover:text-lilac'}`}
            >
              Home
            </button>
            <button
              id="nav-btn-gallery"
              onClick={() => setActiveTab('gallery')}
              className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${activeTab === 'gallery' ? 'bg-lilac text-white shadow-md scale-105' : 'text-plum/70 hover:text-lilac'}`}
            >
              Gallery
            </button>
            <button
              id="nav-btn-reasons"
              onClick={() => setActiveTab('reasons')}
              className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${activeTab === 'reasons' ? 'bg-lilac text-white shadow-md scale-105' : 'text-plum/70 hover:text-lilac'}`}
            >
              Reasons
            </button>
            <button
              id="nav-btn-story"
              onClick={() => setActiveTab('story')}
              className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                activeTab === 'story' || activeTab === 'mission' || activeTab === 'password'
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
