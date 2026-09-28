import React, { useState } from 'react';
import { audioManager } from '../utils/audio';
import { Gift, Heart, Sparkles, X, Copy, Check, MessageSquareHeart } from 'lucide-react';

interface SurpriseGiftBoxProps {
  onOpenGift: () => void;
}

export const SurpriseGiftBox: React.FC<SurpriseGiftBoxProps> = ({ onOpenGift }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const birthdayMessage = `Dear Muskan 🌸✨,

Happy Birthday to someone whose smile genuinely lights up every single room she walks into! 

On this very special day, I wish you a year filled with pure happiness, endless laughter, boundless peace of mind, and the fulfillment of every heartfelt prayer you carry in your heart. May Allah / the universe shower you with immense blessings, good health, and success in everything you pursue.

"Har pal khushiyon bhara ho aapka,
Har subah roshan aur har shaam rangeen ho aapki,
Muskurahat aapke chehre se kabhi na chhoote,
Aapki zindagi me hamesha bahaar ho!"

Stay blessed, stay graceful, and keep smiling always! 💖🎂🎉`;

  const handleToggleBox = () => {
    if (!isOpen) {
      setIsOpen(true);
      audioManager.playFanfare();
      onOpenGift();
    } else {
      setIsOpen(false);
      audioManager.playSparkle();
    }
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(birthdayMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-6 md:p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-purple-200/80 shadow-xl shadow-purple-200/30 max-w-xl mx-auto w-full transition-all">
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-purple-600 mb-2">
        <Gift className="w-3.5 h-3.5 text-pink-500" />
        <span>A Secret Surprise for Muskan</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
      </div>

      <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-slate-800 text-center mb-1">
        Surprise Gift Box
      </h3>
      <p className="text-sm text-slate-500 text-center max-w-sm mb-6">
        {isOpen
          ? '🎉 Gift unlocked! Scroll through your personalized message below.'
          : 'Tap on the present box or click below to unwrap your special birthday surprise! 🎁'}
      </p>

      {/* 3D-styled Present Box Container */}
      <div
        onClick={handleToggleBox}
        className="relative cursor-pointer group select-none my-4 py-2 transition-transform hover:scale-105 active:scale-95"
        title={isOpen ? 'Click to close box 🎁' : 'Click to unwrap gift! ✨'}
      >
        {/* Glow halo behind gift */}
        <div
          className={`absolute -inset-6 rounded-full transition-all duration-700 blur-2xl pointer-events-none ${
            isOpen
              ? 'opacity-80 bg-gradient-to-r from-pink-300 via-purple-300 to-amber-200'
              : 'opacity-40 group-hover:opacity-75 bg-pink-300'
          }`}
        />

        {/* Present Box Illustration */}
        <div className="relative w-52 h-48 flex flex-col items-center justify-center">
          {/* Box Lid with Golden Ribbon Bow */}
          <div
            className={`relative z-20 flex flex-col items-center transition-all duration-500 transform ${
              isOpen
                ? '-translate-y-16 -rotate-12 opacity-90'
                : 'translate-y-0 group-hover:-translate-y-1'
            }`}
          >
            {/* Ribbon Bow on top */}
            <div className="relative w-20 h-10 flex items-center justify-center -mb-2 z-30">
              {/* Left loop */}
              <div className="w-8 h-8 rounded-full border-[6px] border-amber-300 bg-amber-400/20 transform -rotate-45 shadow-sm" />
              {/* Center knot */}
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-500 shadow-md z-40" />
              {/* Right loop */}
              <div className="w-8 h-8 rounded-full border-[6px] border-amber-300 bg-amber-400/20 transform rotate-45 shadow-sm" />
            </div>

            {/* Lid rectangle */}
            <div className="relative w-48 h-10 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-lg shadow-lg border-2 border-white/60 flex items-center justify-center overflow-hidden">
              {/* Vertical ribbon on lid */}
              <div className="w-8 h-full bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 shadow-md" />
            </div>
          </div>

          {/* Box Lower Body */}
          <div className="relative w-44 h-36 bg-gradient-to-b from-pink-400 via-pink-500 to-purple-500 rounded-b-xl shadow-2xl border-2 border-t-0 border-white/60 flex items-center justify-center overflow-hidden z-10">
            {/* Vertical ribbon */}
            <div className="w-8 h-full bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 shadow-md" />

            {/* Horizontal ribbon */}
            <div className="absolute w-full h-8 bg-gradient-to-b from-amber-300 via-yellow-300 to-amber-400 shadow-md" />

            {/* Center sparkle badge */}
            <div className="absolute w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center border border-amber-300 z-20">
              <Heart className="w-6 h-6 text-pink-500 fill-pink-400 animate-pulse" />
            </div>
          </div>

          {/* Floating magic sparkles when opened */}
          {isOpen && (
            <div className="absolute -top-12 flex gap-4 text-xl pointer-events-none animate-bounce">
              <span>💖</span>
              <span>✨</span>
              <span>🎉</span>
            </div>
          )}
        </div>
      </div>

      {/* Button Action */}
      <button
        type="button"
        onClick={handleToggleBox}
        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
      >
        <Gift className="w-4 h-4" />
        <span>{isOpen ? 'Fold Gift Box' : 'Unwrap Surprise 🎁'}</span>
      </button>

      {/* Revealed Birthday Message Letter Modal / Container */}
      {isOpen && (
        <div className="mt-6 p-6 bg-gradient-to-br from-rose-50 via-white to-purple-50 border border-pink-200/90 rounded-2xl shadow-lg w-full transition-all animate-fade-in text-left relative">
          <div className="flex items-start justify-between border-b border-pink-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                <MessageSquareHeart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif-display font-bold text-slate-800 text-base">
                  Special Letter for Muskan
                </h4>
                <p className="text-[11px] text-pink-600 font-medium">To the girl with the brightest smile ✨</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleCopyMessage}
                className="p-1.5 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors text-xs flex items-center gap-1"
                title="Copy birthday wish"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3 text-slate-700 text-sm leading-relaxed font-body">
            <p className="font-handwriting text-2xl text-pink-700 font-semibold">
              Pyari Muskan,
            </p>
            <p>
              Happy Birthday! Aap jaisi khoobsurat, kind-hearted aur hamesha muskurane wali shaksiyat
              zindagi ko bohot pyara bana deti hain. 
            </p>
            <div className="p-3.5 bg-pink-100/60 rounded-xl border border-pink-200 font-serif-display italic text-pink-900 text-center my-3 shadow-inner">
              &ldquo;Har pal khushiyon bhara ho aapka,<br />
              Har subah roshan aur har shaam rangeen ho aapki,<br />
              Muskurahat aapke chehre se kabhi na chhoote,<br />
              Aapki zindagi me hamesha bahaar ho! 🌸&rdquo;
            </div>
            <p>
              May this new year of your life be filled with unforgettable memories, peace, grand
              accomplishments, and cherished laughter. Always keep your inner sparkle glowing!
            </p>
            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-pink-100">
              <span>With all warm prayers & heartfelt love 💖</span>
              <span className="font-handwriting text-lg text-pink-600 font-bold">Forever Shining ✨</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
