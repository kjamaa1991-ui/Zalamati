
import React, { useState, useEffect, useRef } from 'react';
import { FeedItem } from './components/FeedItem';
import { VoiceCommentModal } from './components/VoiceCommentModal';
import { SplashScreen } from './components/SplashScreen';
import { ProfilePage } from './components/ProfilePage';
import { LoginPage } from './components/LoginPage';
import { MessagesPage } from './components/MessagesPage';
import { CameraPage } from './components/CameraPage'; // Imported
import { MOCK_POSTS } from './constants';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentView, setCurrentView] = useState<'feed' | 'profile' | 'messages' | 'camera'>('feed');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Total splash duration before fading into the app
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 500); // Wait for fade out animation
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollTop / container.clientHeight);
    if (index !== currentIndex && index < MOCK_POSTS.length) {
      setCurrentIndex(index);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="relative w-full h-screen max-w-md mx-auto overflow-hidden bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)] border-x border-white/5">
      {isLoading && (
        <div className={`transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <SplashScreen />
        </div>
      )}

      {/* Login Screen - Shows after splash if not logged in */}
      {!isLoading && !isLoggedIn && (
        <LoginPage onLogin={handleLogin} />
      )}

      {/* Main App Content - Only visible when logged in */}
      {isLoggedIn && (
        <div className="w-full h-full animate-fade-in">
          {/* OS Status Bar Mockup - Hidden in Camera Mode */}
          {currentView !== 'camera' && (
            <div className="absolute top-0 w-full h-10 z-50 flex justify-between px-6 items-end pb-1 text-xs font-black text-white bg-gradient-to-b from-black/40 to-transparent pointer-events-none">
              <span>9:41</span>
              <div className="flex gap-2 items-center">
                <span className="material-icons text-[14px]">signal_cellular_alt</span>
                <span className="material-icons text-[14px]">wifi</span>
                <div className="w-6 h-3 border border-white/50 rounded-sm p-0.5 flex items-center">
                  <div className="h-full w-full bg-white rounded-[1px]" />
                </div>
              </div>
            </div>
          )}

          {/* FEED VIEW */}
          <div className={`w-full h-full relative ${currentView === 'feed' ? 'block' : 'hidden'}`}>
              {/* Header */}
              <header className="absolute top-10 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 drift-animation">
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="text-5xl font-black text-[#FF3B30] drop-shadow-[0_0_15px_rgba(255,59,48,0.5)] leading-none" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      زلمتي
                    </h1>
                    {/* Mini graphical element under logo */}
                    <div className="flex gap-1 opacity-60 mt-0.5">
                        <div className="w-0.5 h-1 bg-[#FF3B30]"></div>
                        <div className="w-0.5 h-2 bg-[#FF3B30]"></div>
                        <div className="w-0.5 h-1 bg-[#FF3B30]"></div>
                    </div>
                  </div>
                </div>
                <button className="text-white/80 hover:text-white transition-all transform hover:scale-110 active:scale-90">
                  <span className="material-icons text-3xl drop-shadow-sm">search</span>
                </button>
              </header>

              {/* Vertical Feed Container */}
              <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
                style={{ scrollSnapType: 'y mandatory' }}
              >
                {MOCK_POSTS.map((post) => (
                  <div key={post.id} className="w-full h-full snap-start snap-always">
                    <FeedItem post={post} onShowComments={() => setShowComments(true)} />
                  </div>
                ))}
              </div>
          </div>

          {/* MESSAGES VIEW */}
          <div className={`w-full h-full ${currentView === 'messages' ? 'block' : 'hidden'}`}>
              <MessagesPage />
          </div>

          {/* PROFILE VIEW */}
          <div className={`w-full h-full ${currentView === 'profile' ? 'block' : 'hidden'}`}>
              <ProfilePage onBack={() => setCurrentView('feed')} />
          </div>

          {/* CAMERA VIEW (Overlay) */}
          {currentView === 'camera' && (
             <CameraPage onBack={() => setCurrentView('feed')} />
          )}

          {/* Bottom Navigation - Hidden when in Camera Mode */}
          {currentView !== 'camera' && (
            <nav className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#121212] via-[#121212]/95 to-transparent backdrop-blur-sm z-40 flex items-center justify-between px-8 pb-4">
              <div className="absolute inset-0 opacity-10 bg-asphalt-dark pointer-events-none"></div>
              
              <button 
                onClick={() => setCurrentView('feed')}
                className={`flex flex-col items-center gap-1 transition-colors group ${currentView === 'feed' ? 'text-white' : 'text-white/50 hover:text-white'}`}
              >
                <span className="material-icons text-3xl group-active:scale-90 transition-transform">home</span>
                {currentView === 'feed' && <div className="w-1.5 h-1.5 rounded-full bg-accent-orange shadow-[0_0_8px_rgba(255,87,34,1)]" />}
              </button>

              <button className="flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors">
                <span className="material-icons-outlined text-3xl">explore</span>
              </button>

              <div className="relative -top-4">
                <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 hover:opacity-100 transition-opacity animate-pulse"></div>
                {/* Central Button activates Camera now */}
                <button 
                  onClick={() => setCurrentView('camera')}
                  className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#FF3B30] to-[#b91c1c] flex items-center justify-center shadow-[0_0_30px_rgba(255,59,48,0.4)] border-4 border-black transform transition-all active:scale-90 hover:scale-105"
                >
                  <span className="material-icons text-4xl text-white">camera_alt</span>
                </button>
              </div>

              <button 
                onClick={() => setCurrentView('messages')}
                className={`flex flex-col items-center gap-1 transition-colors group ${currentView === 'messages' ? 'text-white' : 'text-white/50 hover:text-white'}`}
              >
                <span className={`material-icons text-3xl group-active:scale-90 transition-transform ${currentView === 'messages' ? '' : 'material-icons-outlined'}`}>chat_bubble</span>
                {currentView === 'messages' && <div className="w-1.5 h-1.5 rounded-full bg-accent-orange shadow-[0_0_8px_rgba(255,87,34,1)]" />}
              </button>

              <button 
                onClick={() => setCurrentView('profile')}
                className={`flex flex-col items-center gap-1 transition-colors group ${currentView === 'profile' ? 'text-white' : 'text-white/50 hover:text-white'}`}
              >
                <span className={`material-icons text-3xl group-active:scale-90 transition-transform ${currentView === 'profile' ? '' : 'material-icons-outlined'}`}>person</span>
                {currentView === 'profile' && <div className="w-1.5 h-1.5 rounded-full bg-accent-orange shadow-[0_0_8px_rgba(255,87,34,1)]" />}
              </button>
            </nav>
          )}

          {/* Voice Comments Modal */}
          <VoiceCommentModal 
            isOpen={showComments} 
            onClose={() => setShowComments(false)} 
            postId={MOCK_POSTS[currentIndex].id}
          />
        </div>
      )}
    </div>
  );
};

export default App;
