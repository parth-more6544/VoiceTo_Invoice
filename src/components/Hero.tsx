'use client';

import React, { useState } from 'react';
import { Mic, Sparkles, Receipt, CheckCircle2, ArrowRight, Play, Volume2, Store } from 'lucide-react';

interface HeroProps {
  onStartVoiceSale: () => void;
  onTryPreset: (presetText: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartVoiceSale, onTryPreset }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);

  return (
    <section className="relative pt-6 sm:pt-10 pb-16 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-rose-200/40 via-amber-100/30 to-rose-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Action Pill Badge */}
      <div className="flex justify-center mb-6">
        <button
          onClick={onStartVoiceSale}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/70 text-rose-600 text-xs sm:text-sm font-semibold hover:bg-rose-100 hover:border-rose-300 transition-all shadow-sm group cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-rose-500 group-hover:rotate-12 transition-transform" />
          <span>See Voice2Invoice in Action</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Subheading */}
      <div className="text-center mb-4">
        <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-stone-700 font-mono">
          FROM <span className="text-rose-500 font-black">VOICE</span> TO VERIFIED
        </h2>
      </div>

      {/* Main Giant Visual Typography: VOICE ➔ INVOICE */}
      <div className="relative flex items-center justify-center my-6 sm:my-10 select-none">
        <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 bg-stone-900 group">
          {/* Background Video Mask Player */}
          <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] flex items-center justify-center bg-stone-950 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-opacity"
            >
              <source src="/sample.mp4" type="video/mp4" />
              <source src="/Videotext.mp4" type="video/mp4" />
              <source src="/SampleAnimation1.mp4" type="video/mp4" />
            </video>

            {/* Subtle dark overlay to make text crisp */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-900/30 to-stone-950/50" />

            {/* Giant Centered Headline Text */}
            <div className="relative z-10 text-center px-4">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white drop-shadow-2xl font-sans flex items-center justify-center gap-2 sm:gap-4 md:gap-6 flex-wrap">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-rose-100 to-white">
                  VOICE
                </span>
                <span className="text-rose-400 font-light text-3xl sm:text-5xl md:text-7xl animate-pulse">
                  ➔
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-white to-rose-300">
                  INVOICE
                </span>
              </h1>
              <p className="mt-2 sm:mt-4 text-xs sm:text-base md:text-lg text-stone-200/90 font-medium max-w-2xl mx-auto drop-shadow">
                Speak in your local language. Get instant GST & retail invoices, sync ledger, and update stock in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Connected 4-Step Interactive Flow Cards */}
      <div className="relative mt-8 sm:mt-12 max-w-5xl mx-auto">
        {/* Subtle connecting dotted line behind cards */}
        <div className="hidden lg:block absolute top-1/2 left-10 right-10 -translate-y-1/2 border-t-2 border-dashed border-stone-300/80 -z-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {/* Step 1: Voice Input Card */}
          <div 
            onClick={() => {
              setActiveStep(1);
              onTryPreset('2 samosa at 15 rupees and 1 chai for 10 rupees');
            }}
            className={`cursor-pointer rounded-2xl p-4 sm:p-5 transition-all duration-200 border ${
              activeStep === 1 
                ? 'bg-rose-50/90 border-rose-300 shadow-lg shadow-rose-500/10 scale-[1.02]' 
                : 'bg-white/90 hover:bg-rose-50/50 border-stone-200/80 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-inner">
                <Mic className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1 h-3 bg-rose-500 rounded-full animate-pulse" />
                <span className="w-1 h-5 bg-rose-400 rounded-full animate-pulse delay-75" />
                <span className="w-1 h-2 bg-rose-500 rounded-full animate-pulse delay-150" />
                <span className="w-1 h-4 bg-rose-400 rounded-full animate-pulse" />
              </div>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-stone-800 italic leading-snug">
              &ldquo;2 samosa at 15 rupees and 1 chai for 10 rupees&rdquo;
            </p>
            <span className="mt-2 inline-block text-[11px] font-medium text-rose-600 bg-rose-100/60 px-2 py-0.5 rounded-full">
              Step 1: Speak sale
            </span>
          </div>

          {/* Step 2: AI Understands Card */}
          <div 
            onClick={() => setActiveStep(2)}
            className={`cursor-pointer rounded-2xl p-4 sm:p-5 transition-all duration-200 border ${
              activeStep === 2 
                ? 'bg-amber-50/90 border-amber-300 shadow-lg shadow-amber-500/10 scale-[1.02]' 
                : 'bg-white/90 hover:bg-amber-50/50 border-stone-200/80 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-stone-800">
              AI understands your sale
            </h4>
            <p className="text-xs text-stone-500 mt-1">
              Extracts items, rates, taxes, discounts & customer name
            </p>
            <span className="mt-2 inline-block text-[11px] font-medium text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-full">
              Step 2: Parse NLP
            </span>
          </div>

          {/* Step 3: Invoice Created Card */}
          <div 
            onClick={() => setActiveStep(3)}
            className={`cursor-pointer rounded-2xl p-4 sm:p-5 transition-all duration-200 border ${
              activeStep === 3 
                ? 'bg-purple-50/90 border-purple-300 shadow-lg shadow-purple-500/10 scale-[1.02]' 
                : 'bg-white/90 hover:bg-purple-50/50 border-stone-200/80 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-inner">
                <Receipt className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold text-stone-900 bg-purple-100/70 px-2.5 py-0.5 rounded-lg">
                ₹40
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-stone-800">
              Invoice created
            </h4>
            <p className="text-xs text-stone-500 mt-1">
              Print, PDF & WhatsApp share ready
            </p>
            <span className="mt-2 inline-block text-[11px] font-medium text-purple-700 bg-purple-100/60 px-2 py-0.5 rounded-full">
              Step 3: Instant Bill
            </span>
          </div>

          {/* Step 4: Stock & Ledger Updated Card */}
          <div 
            onClick={() => setActiveStep(4)}
            className={`cursor-pointer rounded-2xl p-4 sm:p-5 transition-all duration-200 border ${
              activeStep === 4 
                ? 'bg-emerald-50/90 border-emerald-300 shadow-lg shadow-emerald-500/10 scale-[1.02]' 
                : 'bg-white/90 hover:bg-emerald-50/50 border-stone-200/80 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-stone-800">
              Stock updated
            </h4>
            <p className="text-xs text-stone-500 mt-1">
              Sale recorded in ledger & Udhaar book
            </p>
            <span className="mt-2 inline-block text-[11px] font-medium text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
              Step 4: Auto-Sync
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
