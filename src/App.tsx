/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FloatingParticlesCanvas } from './components/FloatingParticlesCanvas';
import { CelebrationHeader } from './components/CelebrationHeader';
import { BirthdayCake } from './components/BirthdayCake';
import { SurpriseGiftBox } from './components/SurpriseGiftBox';
import { MemoriesWall } from './components/MemoriesWall';
import { WishesCompliments } from './components/WishesCompliments';
import { PromptModal } from './components/PromptModal';
import { MusicPlayerBar } from './components/MusicPlayerBar';
import { CelebrationFooter } from './components/CelebrationFooter';
import { audioManager } from './utils/audio';
import {
  Sparkles,
  Heart,
  Cake,
  Gift,
  Music,
  Terminal,
  ArrowDown,
  Volume2,
  VolumeX,
} from 'lucide-react';

export default function App() {
  const [burstCount, setBurstCount] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

  useEffect(() => {
    audioManager.registerStateListener((playing) => {
      setIsPlayingMusic(playing);
    });

    // Auto prompt first time confetti trigger
    const timer = setTimeout(() => {
      setBurstCount((c) => c + 1);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleConfettiShower = () => {
    setBurstCount((c) => c + 1);
    audioManager.playSparkle();
  };

  const handleToggleMusic = () => {
    const active = audioManager.toggleMusic();
    setIsPlayingMusic(active);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-rose-50/70 via-purple-50/50 to-pink-50/60 relative text-slate-800 font-body selection:bg-pink-300 selection:text-pink-950">
      {/* Interactive Background Floating Elements (Hearts, Balloons, Stars) */}
      <FloatingParticlesCanvas burstTrigger={burstCount} density="medium" />

      {/* Top Bar Contract (Wordmark - Navigation - Primary Actions) */}
      <CelebrationHeader
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        onShowerConfetti={handleConfettiShower}
        onOpenPromptModal={() => setIsPromptModalOpen(true)}
      />

      <main className="flex-1 relative z-20">
        {/* HERO SECTION */}
        <section id="hero" className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 text-center max-w-5xl mx-auto overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-pink-300/30 via-purple-200/40 to-amber-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Kicker */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200/80 shadow-xs text-xs font-semibold text-pink-700 mb-6 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Today Belongs To Muskan</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
          </div>

          {/* Grand Romantic Headline */}
          <div className="space-y-2 mb-6">
            <h2 className="text-xl md:text-2xl font-serif-display text-slate-700 tracking-wide">
              A Queen Was Born Today
            </h2>
            <h1 className="font-cursive text-6xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-rose-500 leading-tight py-2 drop-shadow-sm">
              Happy Birthday, Muskan!
            </h1>
          </div>

          {/* Subtitle with Balance */}
          <p className="max-w-2xl mx-auto text-slate-600 text-sm md:text-base leading-relaxed font-body mb-8">
            May your day be filled with warm laughter, sparkling joys, and every heartfelt wish coming
            true. Blow out your candles, unwrap your surprise present, and enjoy your royal birthday feast!
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#cake-section"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white text-xs md:text-sm font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <Cake className="w-4 h-4" />
              <span>Blow Cake Candles</span>
            </a>

            <a
              href="#surprise-section"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-pink-50 text-pink-700 border border-pink-200 text-xs md:text-sm font-semibold shadow-xs hover:shadow transition-all active:scale-95"
            >
              <Gift className="w-4 h-4 text-purple-600" />
              <span>Open Surprise Box</span>
            </a>

            <button
              type="button"
              onClick={handleToggleMusic}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs md:text-sm font-semibold transition-all active:scale-95"
            >
              {isPlayingMusic ? (
                <>
                  <Volume2 className="w-4 h-4 text-amber-600 animate-pulse" />
                  <span>Pause Melody</span>
                </>
              ) : (
                <>
                  <Music className="w-4 h-4 text-amber-600" />
                  <span>Play Birthday Tune 🎵</span>
                </>
              )}
            </button>
          </div>

          {/* Down Indicator */}
          <div className="mt-12 flex justify-center">
            <a
              href="#interactive-showcase"
              className="flex flex-col items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-pink-600 transition-colors"
            >
              <span>Scroll to Celebrate</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>
        </section>

        {/* DUAL INTERACTIVE SHOWCASE (Cake & Surprise Present Box) */}
        <section id="interactive-showcase" className="py-12 px-4 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Cake Section */}
            <div id="cake-section" className="w-full">
              <BirthdayCake onCandleBlow={handleConfettiShower} />
            </div>

            {/* Surprise Present Box Section */}
            <div id="surprise-section" className="w-full">
              <SurpriseGiftBox onOpenGift={handleConfettiShower} />
            </div>
          </div>
        </section>

        {/* MEMORIES WALL (Polaroid scrapbook with generated assets) */}
        <MemoriesWall />

        {/* COMPLIMENTS & WISHES GUESTBOOK */}
        <WishesCompliments />

        {/* PART 2 BANNER: AI Prompt Showcase */}
        <section className="py-14 px-4 max-w-4xl mx-auto w-full">
          <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-slate-900 text-white rounded-3xl p-8 md:p-10 shadow-xl border border-pink-400/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-pink-300 text-xs font-medium">
                <Terminal className="w-3.5 h-3.5" />
                <span>Part 2: Special Prompt Inside</span>
              </div>
              <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-white">
                Customize or Regenerate With AI
              </h3>
              <p className="text-xs md:text-sm text-pink-100/80 max-w-md font-body">
                Get the full, tailored prompt optimized for ChatGPT, Google Gemini, and Claude
                to regenerate or enhance Muskan&apos;s birthday app whenever you want.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsPromptModalOpen(true)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-semibold text-xs md:text-sm shadow-lg shadow-pink-500/30 transition-all shrink-0 active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>View &amp; Copy Prompt</span>
            </button>
          </div>
        </section>
      </main>

      {/* Floating Bottom-Right Music Bar */}
      <MusicPlayerBar
        isPlaying={isPlayingMusic}
        onTogglePlay={handleToggleMusic}
        onTriggerConfetti={handleConfettiShower}
      />

      {/* Special Prompt Modal (Part 2) */}
      <PromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />

      {/* Celebration Footer with Required Branding & Instagram Link */}
      <CelebrationFooter />
    </div>
  );
}
