'use client';

import React from 'react';
import { BookX, Smartphone, ArrowRight, ShieldCheck, CalendarCheck2, Sparkles, Zap, TrendingUp, Mic } from 'lucide-react';

export const NotebookComparison: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Notebook to Digital Transformation Banner */}
      <div className="bg-gradient-to-br from-amber-50/60 via-stone-50 to-rose-50/50 rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Visual Transformation Pair */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Old Notebook Card */}
            <div className="w-36 sm:w-44 bg-[#F5EBE1] border-2 border-[#E0D2C3] rounded-xl p-3 sm:p-4 shadow-md rotate-[-3deg] relative select-none">
              {/* Notebook Rings */}
              <div className="absolute -left-2 top-3 bottom-3 flex flex-col justify-between">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-3.5 h-1.5 bg-stone-400 rounded-full border border-stone-600 shadow-sm"></div>
                ))}
              </div>
              <div className="pl-3">
                <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                  पुराना तरीका
                </div>
                <div className="text-base sm:text-lg font-black text-amber-900 border-b border-amber-300 pb-1">
                  उधारी का हिसाब
                </div>
                <div className="mt-2 space-y-1 text-[11px] text-stone-600 font-mono">
                  <div className="line-through decoration-rose-500">रमेश - 250?</div>
                  <div className="text-amber-800">चाय नाश्ता - ₹40</div>
                  <div className="opacity-60">शर्मा जी - 1200</div>
                </div>
              </div>
            </div>

            {/* Transform Arrow */}
            <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-lg shrink-0">
              <ArrowRight className="w-5 h-5 text-rose-400" />
            </div>

            {/* Modern Phone Digital Invoice Screen */}
            <div className="w-36 sm:w-44 bg-white border-2 border-stone-800 rounded-2xl p-3 sm:p-4 shadow-xl rotate-[3deg] relative select-none">
              <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mb-2"></div>
              <div className="flex items-center justify-between text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md mb-2">
                <span>✓ Verified</span>
                <span>Live Sync</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-stone-900">
                ₹40
              </div>
              <div className="text-[11px] font-semibold text-stone-500">
                Invoice Saved
              </div>
              <div className="mt-2 text-[10px] text-stone-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>INV-2026-001</span>
              </div>
            </div>
          </div>

          {/* Value Proposition Texts */}
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
              From notebook to organized records.
            </h3>
            <p className="text-sm text-stone-600 mt-1.5 max-w-xl">
              Eliminate lost paper receipts, calculation mistakes, and forgotten customer credit balances with effortless voice entries.
            </p>

            {/* 3 Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <div className="flex items-center gap-2.5 bg-white/90 rounded-2xl p-3 border border-stone-200 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <BookX className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-800">No missing entries</div>
                  <div className="text-[11px] text-stone-500">Zero record loss</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/90 rounded-2xl p-3 border border-stone-200 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <CalendarCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-800">Every sale, daily</div>
                  <div className="text-[11px] text-stone-500">Instant timestamp</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/90 rounded-2xl p-3 border border-stone-200 shadow-2xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-800">Safe & secure</div>
                  <div className="text-[11px] text-stone-500">Always accessible</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm flex items-start gap-4 hover:border-rose-300 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">Just Speak</h4>
            <p className="text-xs text-stone-500 mt-1">
              Tell us your sale in your own words, local dialect or Hinglish.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm flex items-start gap-4 hover:border-amber-300 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">Instant Invoice</h4>
            <p className="text-xs text-stone-500 mt-1">
              Structured GST & retail invoices formatted in seconds.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm flex items-start gap-4 hover:border-indigo-300 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">Track & Grow</h4>
            <p className="text-xs text-stone-500 mt-1">
              See your daily revenues, item sales & inventory in real time.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm flex items-start gap-4 hover:border-emerald-300 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">Secure & Reliable</h4>
            <p className="text-xs text-stone-500 mt-1">
              Your customer records, bills and ledger are safely preserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
