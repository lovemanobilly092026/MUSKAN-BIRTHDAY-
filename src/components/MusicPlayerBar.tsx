import React from 'react';
import { Music, Play, Pause, Sparkles } from 'lucide-react';

interface MusicPlayerBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onTriggerConfetti: () => void;
}

export const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({
  isPlaying,
  onTogglePlay,
  onTriggerConfetti,
}) => {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-pink-200/90 shadow-lg shadow-pink-200/40 text-xs">
        <button
          type="button"
          onClick={onTogglePlay}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isPlaying
              ? 'bg-pink-500 text-white shadow-md animate-pulse'
              : 'bg-slate-100 text-slate-700 hover:bg-pink-100 hover:text-pink-600'
          }`}
          title={isPlaying ? 'Pause music' : 'Play sweet birthday music box'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>

        <div className="flex flex-col pr-1">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800 text-[11px]">
            <Music className="w-3 h-3 text-pink-500" />
            <span>{isPlaying ? 'Birthday Melody' : 'Melody Paused'}</span>
          </div>
          <span className="text-[10px] text-slate-400">Sweet Music Box Chimes</span>
        </div>

        {/* Visualizer bars animation */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-4 px-1">
            <span className="w-0.5 bg-pink-500 rounded-full animate-bounce h-3" style={{ animationDelay: '0.1s' }} />
            <span className="w-0.5 bg-purple-500 rounded-full animate-bounce h-4" style={{ animationDelay: '0.25s' }} />
            <span className="w-0.5 bg-amber-500 rounded-full animate-bounce h-2" style={{ animationDelay: '0.4s' }} />
            <span className="w-0.5 bg-pink-400 rounded-full animate-bounce h-3.5" style={{ animationDelay: '0.15s' }} />
          </div>
        )}

        <button
          type="button"
          onClick={onTriggerConfetti}
          className="ml-1 p-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 transition-colors"
          title="Shower sparkles!"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </button>
      </div>
    </div>
  );
};
