import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Sparkles } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptModal: React.FC<PromptModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const promptContent = `Create a complete, responsive, highly attractive and interactive animated Birthday Celebration web application for "Muskan" built with React, Vite, Tailwind CSS, and Lucide icons.

Key Visual & Thematic Requirements:
1. Color Theme: Luxurious soft pastel pink (#FCE7F3, #F472B6), soft lavender (#EDE9FE, #C084FC), and sparkling warm gold (#FDE047, #F59E0B) accents. Dreamy romantic party vibe.
2. Typography: Pairing of cursive/handwriting fonts for titles ("Great Vibes", "Dancing Script") and clean legible typography for body text ("Playfair Display", "Plus Jakarta Sans").
3. Animated Birthday Cake:
   - Multi-tier pastel cake with golden drippings and glowing candles on top.
   - Interactive candle blowing feature: clicking the cake or "Blow Out Candles" button extinguishes flames with realistic rising smoke wisps, sound effects, and confetti shower.
   - Option to relight candles and lock in a secret birthday wish.
4. Surprise Present Box:
   - 3D-styled interactive gift box wrapped in satin golden ribbon.
   - Clicking unwraps the ribbon, pops the lid open, and triggers celebratory music & confetti.
   - Reveals an affectionate birthday letter in Urdu/Hindi and English celebrating Muskan's smile and virtues.
5. Interactive Atmosphere & Music:
   - High performance canvas particle system with floating pastel balloons, rotating translucent hearts, and twinkling stars.
   - Clicking floating balloons pops them with delightful audio feedback.
   - Synthesized Web Audio API music player playing "Happy Birthday" music-box melody with play/pause controls.
6. Polaroid Memory Scrapbook & Compliments Wall:
   - Aesthetic polaroids with cute handwritten captions and ability to pin custom memories.
   - Interactive "Why Muskan Is Special" card deck and interactive birthday wish guestbook.
7. Footer Branding:
   - Must include exact footer: "Made with ❤️ by [Your Name] | Follow me on Instagram: @manobilly092026" with a direct link to https://instagram.com/manobilly092026.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setCopied(true);
    audioManager.playSparkle();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl border border-pink-200 max-w-2xl w-full p-6 md:p-8 relative max-h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-pink-100 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-slate-800 text-lg md:text-xl">
                Part 2: Special AI Prompt
              </h3>
              <p className="text-xs text-slate-500">
                ChatGPT, Gemini &amp; Claude ke liye ready-to-use prompt
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 mb-3 font-body">
          Agar aap is web app ko kisi doosre AI model (ChatGPT Plus, Gemini Pro, Claude 3.5 Sonnet) me
          apne mutabiq customize ya recreate karna chahte hain, toh ye comprehensive prompt copy karein:
        </p>

        {/* Code / Prompt Box */}
        <div className="relative flex-1 overflow-hidden bg-slate-900 rounded-2xl border border-slate-800 p-4 mb-4">
          <pre className="text-xs text-pink-200/90 font-mono overflow-y-auto max-h-72 whitespace-pre-wrap leading-relaxed select-all">
            {promptContent}
          </pre>
          <button
            type="button"
            onClick={handleCopy}
            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-xs font-medium shadow-md transition-all active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Full Prompt'}</span>
          </button>
        </div>

        {/* Tips footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-slate-500 border-t border-pink-100">
          <div className="flex items-center gap-1.5 text-pink-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for ChatGPT, Claude, and Google AI Studio!</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
