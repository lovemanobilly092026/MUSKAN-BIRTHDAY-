import React, { useState } from 'react';
import { Heart, Instagram, Sparkles, ExternalLink, Edit3, Check } from 'lucide-react';
import { audioManager } from '../utils/audio';

export const CelebrationFooter: React.FC = () => {
  const [creatorName, setCreatorName] = useState('Mano Billy');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <footer className="relative bg-white/90 backdrop-blur-md border-t border-pink-200/80 pt-12 pb-14 px-4 overflow-hidden z-20">
      {/* Background soft pink decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-pink-100/60 to-transparent blur-xl pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 space-y-6">
        {/* Decorative sparkle */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-600 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>A Special Birthday Celebration Dedication</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>

        {/* Dedicated Message to Muskan */}
        <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-slate-800">
          Wishing Muskan The Happiest Birthday Ever! 🎂
        </h3>
        <p className="text-xs md:text-sm text-slate-500 max-w-lg font-body">
          May your smile continue to inspire and bring endless cheer to all those fortunate enough
          to know you. Happy Birthday, today and every single day!
        </p>

        {/* Explicit Required Footer Message & Instagram Link */}
        <div className="pt-4 border-t border-pink-100 w-full flex flex-col items-center justify-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-sm md:text-base font-medium text-slate-800">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline animate-pulse" />
            <span>by</span>

            {/* Editable name trigger */}
            {isEditing ? (
              <span className="inline-flex items-center gap-1">
                <input
                  type="text"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  className="px-2 py-0.5 text-xs font-semibold bg-white border border-pink-400 rounded-md focus:outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="group font-semibold text-pink-700 hover:text-pink-900 inline-flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-pink-50 transition-colors"
                title="Click to edit your name"
              >
                <span>{creatorName || '[Your Name]'}</span>
                <Edit3 className="w-3 h-3 text-slate-400 opacity-60 group-hover:opacity-100" />
              </button>
            )}

            <span className="mx-1 text-slate-300">|</span>

            <span>Follow me on Instagram:</span>

            {/* Direct Instagram Link to @manobilly092026 */}
            <a
              href="https://www.instagram.com/manobilly092026"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audioManager.playSparkle()}
              className="inline-flex items-center gap-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:opacity-80 transition-opacity underline decoration-pink-300 underline-offset-4 decoration-2"
            >
              <Instagram className="w-4 h-4 text-pink-600 inline" />
              <span>@manobilly092026</span>
              <ExternalLink className="w-3 h-3 text-pink-500 inline ml-0.5" />
            </a>
          </div>

          <div className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} Muskan&apos;s Birthday Experience. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
