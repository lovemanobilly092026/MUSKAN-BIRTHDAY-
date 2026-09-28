import React from 'react';
import { Sparkles, Music, VolumeX, Volume2 } from 'lucide-react';

interface CelebrationHeaderProps {
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onShowerConfetti: () => void;
  onOpenPromptModal: () => void;
}

export const CelebrationHeader: React.FC<CelebrationHeaderProps> = ({
  isPlayingMusic,
  onToggleMusic,
  onShowerConfetti,
  onOpenPromptModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-pink-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a href="#hero" className="flex items-center gap-1.5 group select-none">
          <span className="font-serif-display font-bold text-xl md:text-2xl text-slate-900 group-hover:text-pink-600 transition-colors">
            Muskan<span className="text-pink-500 font-handwriting text-2xl font-bold ml-1">Celebration</span>
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-600">
          <a href="#cake-section" className="hover:text-pink-600 transition-colors">
            Birthday Cake
          </a>
          <a href="#surprise-section" className="hover:text-pink-600 transition-colors">
            Surprise Gift
          </a>
          <a href="#memories-section" className="hover:text-pink-600 transition-colors">
            Memories
          </a>
          <a href="#compliments-section" className="hover:text-pink-600 transition-colors">
            Sweet Wishes
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          {/* Music Toggle */}
          <button
            type="button"
            onClick={onToggleMusic}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              isPlayingMusic
                ? 'bg-pink-50 border-pink-300 text-pink-700 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
            title={isPlayingMusic ? 'Pause sweet melody' : 'Play birthday music'}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-pink-600 animate-pulse" />
                <span className="hidden sm:inline">Melody Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Play Melody</span>
              </>
            )}
          </button>

          {/* AI Prompt Button */}
          <button
            type="button"
            onClick={onOpenPromptModal}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full shadow-sm hover:shadow transition-all whitespace-nowrap"
          >
            Special Prompt ✨
          </button>
        </div>
      </div>
    </header>
  );
};
