import React, { useState } from 'react';
import { audioManager } from '../utils/audio';
import { Sparkles, Wind, Flame, RotateCcw } from 'lucide-react';

interface BirthdayCakeProps {
  onCandleBlow: () => void;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ onCandleBlow }) => {
  const [isBlown, setIsBlown] = useState(false);
  const [wishesMadeCount, setWishesMadeCount] = useState(0);
  const [showWishBanner, setShowWishBanner] = useState(false);
  const [userWishText, setUserWishText] = useState('');
  const [savedWish, setSavedWish] = useState<string | null>(null);

  const handleBlowCandles = () => {
    if (isBlown) return;
    setIsBlown(true);
    setWishesMadeCount((prev) => prev + 1);
    setShowWishBanner(true);

    // Audio SFX
    audioManager.playBlowOut();
    window.setTimeout(() => {
      audioManager.playFanfare();
    }, 450);

    onCandleBlow();
  };

  const handleRelight = () => {
    setIsBlown(false);
    setShowWishBanner(false);
    audioManager.playSparkle();
  };

  const handleSaveWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userWishText.trim()) return;
    setSavedWish(userWishText.trim());
    audioManager.playSparkle();
    onCandleBlow();
  };

  // 3 candles positions
  const candles = [
    { id: 1, left: '26%', color: 'from-pink-300 via-pink-400 to-rose-400' },
    { id: 2, left: '50%', color: 'from-amber-200 via-amber-300 to-yellow-400' },
    { id: 3, left: '74%', color: 'from-purple-300 via-purple-400 to-indigo-400' },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center p-6 md:p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-pink-200/80 shadow-xl shadow-pink-200/30 max-w-xl mx-auto w-full transition-all">
      {/* Decorative heading badge */}
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-pink-600 mb-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Make a Birthday Wish</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
      </div>

      <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-slate-800 text-center mb-1">
        Muskan&apos;s Royal Celebration Cake
      </h3>
      <p className="text-sm text-slate-500 text-center max-w-sm mb-6">
        {isBlown
          ? '🎉 You blew out the candles! May your sweetest dreams come true.'
          : 'Tap on the cake or click the button below to blow out the magical candles! ✨'}
      </p>

      {/* SVG & CSS Cake Container */}
      <div
        onClick={isBlown ? handleRelight : handleBlowCandles}
        className="relative cursor-pointer group select-none my-4 py-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        title={isBlown ? 'Click to relight candles ✨' : 'Click to blow out candles! 🎂'}
      >
        {/* Glow halo behind cake */}
        <div
          className={`absolute -inset-4 rounded-full transition-opacity duration-700 blur-2xl pointer-events-none ${
            isBlown
              ? 'opacity-20 bg-purple-300'
              : 'opacity-70 bg-gradient-to-t from-pink-300 via-amber-200 to-rose-200'
          }`}
        />

        {/* Cake Structure */}
        <div className="relative w-64 md:w-72 flex flex-col items-center">
          {/* Candles on top */}
          <div className="relative w-44 h-16 flex justify-between items-end px-2 z-20">
            {candles.map((candle) => (
              <div
                key={candle.id}
                className="relative flex flex-col items-center"
                style={{ width: '24px' }}
              >
                {/* Flame or Smoke */}
                {!isBlown ? (
                  <div className="relative flex flex-col items-center cursor-pointer mb-0.5">
                    {/* Outer flame glow */}
                    <div className="w-4 h-6 bg-gradient-to-t from-amber-400 via-yellow-300 to-white rounded-full animate-flame shadow-[0_0_12px_#fbbf24]" />
                    {/* Inner flame core */}
                    <div className="absolute bottom-0 w-2 h-3.5 bg-blue-300/80 rounded-full blur-[0.5px]" />
                  </div>
                ) : (
                  <div className="relative h-6 flex justify-center items-center">
                    {/* Rising smoke wisp */}
                    <div className="w-2 h-5 bg-gradient-to-t from-slate-400 to-transparent rounded-full animate-smoke" />
                  </div>
                )}

                {/* Candle wick */}
                <div className="w-0.5 h-2 bg-stone-700" />

                {/* Candle body */}
                <div
                  className={`w-3.5 h-10 rounded-t-sm bg-gradient-to-b ${candle.color} shadow-inner border border-white/50 relative overflow-hidden`}
                >
                  {/* Candle decorative diagonal stripes */}
                  <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,white_4px,white_8px)]" />
                </div>
              </div>
            ))}
          </div>

          {/* Top Tier (Lavender & Vanilla with Golden Pearl Sprinkles) */}
          <div className="relative w-44 h-16 bg-gradient-to-b from-purple-100 via-pink-100 to-purple-200 rounded-t-2xl shadow-md border-t-2 border-white flex flex-col justify-between overflow-hidden z-10">
            {/* Top frosting drips */}
            <div className="w-full flex justify-around -mt-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-4 bg-white rounded-b-full shadow-sm border-b border-pink-200"
                />
              ))}
            </div>

            {/* Middle tier golden embellishment line */}
            <div className="flex items-center justify-center gap-1.5 py-1">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-sm" />
              ))}
            </div>

            {/* Bottom frosting border */}
            <div className="w-full h-2.5 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300" />
          </div>

          {/* Middle Tier (Soft Strawberry Cream with Gold Filigree) */}
          <div className="relative w-56 h-20 bg-gradient-to-b from-pink-100 via-rose-100 to-pink-200 rounded-t-2xl shadow-lg border-t-2 border-white -mt-1 flex flex-col justify-between overflow-hidden z-[5]">
            {/* White cream rosettes */}
            <div className="w-full flex justify-around -mt-1.5">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-4 bg-white/95 rounded-b-full shadow-sm border-b border-pink-300"
                />
              ))}
            </div>

            {/* Center greeting text on cake */}
            <div className="text-center font-handwriting text-pink-700 font-bold text-sm tracking-wide">
              Muskan 🌸
            </div>

            {/* Gold bead line */}
            <div className="flex items-center justify-center gap-1 pb-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm" />
              ))}
            </div>

            {/* Bottom icing rib */}
            <div className="w-full h-3 bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300" />
          </div>

          {/* Bottom Tier (Royal Lavender & Golden Velvet) */}
          <div className="relative w-68 h-22 bg-gradient-to-b from-purple-200 via-pink-200 to-purple-300 rounded-t-2xl shadow-xl border-t-2 border-white -mt-1 flex flex-col justify-between overflow-hidden z-[2]">
            {/* Scalloped cream edge */}
            <div className="w-full flex justify-around -mt-1.5">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-4 bg-white rounded-b-full shadow-sm border-b border-purple-300"
                />
              ))}
            </div>

            {/* Heart and sparkle decorations */}
            <div className="flex justify-around px-4 text-xs text-pink-600">
              <span>💖</span>
              <span>✨</span>
              <span>🌸</span>
              <span>✨</span>
              <span>💖</span>
            </div>

            {/* Base trim */}
            <div className="w-full h-3.5 bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 shadow-inner" />
          </div>

          {/* Glass / Golden Cake Stand */}
          <div className="relative w-76 flex flex-col items-center z-0">
            {/* Stand plate rim */}
            <div className="w-full h-4 bg-gradient-to-r from-amber-100 via-white to-amber-200 rounded-full shadow-md border-b-2 border-amber-300" />
            {/* Stand pedestal stem */}
            <div className="w-16 h-7 bg-gradient-to-b from-slate-200 via-white to-slate-300 rounded-b-md shadow-sm" />
            {/* Stand foot */}
            <div className="w-36 h-3 bg-gradient-to-r from-slate-200 via-white to-slate-200 rounded-full shadow-md" />
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        {!isBlown ? (
          <button
            type="button"
            onClick={handleBlowCandles}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-medium text-sm shadow-md hover:shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all active:scale-95"
          >
            <Wind className="w-4 h-4" />
            <span>Blow Out Candles 🎂</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRelight}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 text-slate-900 font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Relight Candles ✨</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            audioManager.playSparkle();
            onCandleBlow();
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 font-medium text-xs transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Shower Confetti 🎉</span>
        </button>
      </div>

      {/* Wish feedback banner */}
      {showWishBanner && (
        <div className="mt-5 p-4 bg-gradient-to-r from-pink-50 via-purple-50 to-amber-50 border border-pink-200 rounded-2xl w-full text-center transition-all animate-fade-in">
          <div className="font-handwriting text-2xl font-bold text-pink-700 mb-1">
            ✨ Happy Birthday Muskan! ✨
          </div>
          <p className="text-xs text-slate-600 mb-3">
            Your candle wish has been sent to the universe! May every second of this year bring you
            unlimited smiles, safety, laughter, and endless blessing.
          </p>

          {!savedWish ? (
            <form onSubmit={handleSaveWish} className="flex gap-2 max-w-sm mx-auto">
              <input
                type="text"
                value={userWishText}
                onChange={(e) => setUserWishText(e.target.value)}
                placeholder="Lock in a secret wish for Muskan..."
                className="flex-1 px-3 py-1.5 text-xs bg-white rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-slate-700"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-xl transition-colors shrink-0"
              >
                Seal Wish 💌
              </button>
            </form>
          ) : (
            <div className="text-xs bg-white/90 border border-pink-300 text-pink-800 py-1.5 px-3 rounded-xl font-medium inline-block">
              💫 Sealed Wish: &quot;{savedWish}&quot;
            </div>
          )}
        </div>
      )}

      {wishesMadeCount > 0 && (
        <div className="mt-3 text-[11px] text-slate-400 font-medium">
          Wishes made today: {wishesMadeCount} 🌟
        </div>
      )}
    </div>
  );
};
