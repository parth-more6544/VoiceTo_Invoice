'use client';

import React, { useState } from 'react';
import { Mic, Sparkles, Receipt, Database, ArrowRight, Play, Check } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Mic,
      number: '01',
      title: 'Speak Naturally in Any Language',
      desc: 'No typing needed. Just press the mic and say your sale items, rates, customer name, and discounts in Hindi, Hinglish, or English.',
      highlight: '"5 kg basmati rice at 85 rs and 2 bottle oil at 160 rs for Sharma ji"'
    },
    {
      icon: Sparkles,
      number: '02',
      title: 'AI Extracts & Calculates Instantly',
      desc: 'Advanced on-device NLP parses items, quantities, standard rates, taxes (GST 5%, 12%, 18%), and deductions accurately.',
      highlight: 'Parsed: 2 items • Total: ₹745 • Tax: ₹37.25 • Cust: Sharma ji'
    },
    {
      icon: Receipt,
      number: '03',
      title: 'Verified Digital Bill in 1-Click',
      desc: 'Review the generated bill, customize template (A4 GST / POS Thermal / Modern receipt), print or share via WhatsApp directly.',
      highlight: 'WhatsApp Share & Thermal Print ready'
    },
    {
      icon: Database,
      number: '04',
      title: 'Automatic Ledger & Inventory Sync',
      desc: 'Sale is instantly recorded in your daily revenue chart, stock count is deducted, and customer Udhaar is tracked automatically.',
      highlight: 'Zero missing cash or forgotten credit'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
          How It Works
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight mt-3">
          Billing as simple as having a conversation.
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-2">
          From voice input to verified GST bill & inventory sync in under 5 seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          return (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`rounded-3xl p-6 transition-all duration-300 border cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-white border-rose-400 shadow-xl shadow-rose-500/10 scale-[1.02] ring-2 ring-rose-200'
                  : 'bg-stone-50/80 hover:bg-white border-stone-200 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    isActive ? 'bg-rose-600 text-white' : 'bg-stone-200 text-stone-700'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-stone-300 font-mono">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-base font-bold text-stone-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {step.desc}
                </p>
              </div>

              <div className="mt-auto pt-3 border-t border-stone-100">
                <div className="text-[11px] font-mono bg-stone-100/90 text-stone-700 p-2.5 rounded-xl">
                  {step.highlight}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
