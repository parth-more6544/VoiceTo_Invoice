'use client';

import React, { useState } from 'react';
import { Volume2, Play, Check, Sparkles, Store, Coffee, Shirt, Wrench, Laptop, ShoppingCart } from 'lucide-react';

interface MomentsShowcaseProps {
  onSelectPrompt: (text: string) => void;
}

export const MomentsShowcase: React.FC<MomentsShowcaseProps> = ({ onSelectPrompt }) => {
  const [playingId, setPlayingId] = useState<number | null>(null);

  const moments = [
    {
      id: 1,
      icon: Coffee,
      category: 'Street Food & Chai Stall',
      title: 'Rush Hour Samosa & Chai POS',
      transcript: '2 samosa at 15 rupees and 1 chai for 10 rupees',
      amount: '₹40',
      tag: 'Fast Checkout',
      color: 'from-amber-500/10 to-rose-500/10'
    },
    {
      id: 2,
      icon: ShoppingCart,
      category: 'Kirana & Grocery',
      title: 'Multi-Item Daily Ration List',
      transcript: '5 kilo basmati rice at 85 rs, 2 bottle mustard oil at 160 rs, and 3 packet salt for 28 rupees',
      amount: '₹829',
      tag: 'Multi-Item',
      color: 'from-emerald-500/10 to-teal-500/10'
    },
    {
      id: 3,
      icon: Wrench,
      category: 'Hardware & Construction',
      title: 'Heavy Building Materials with GST',
      transcript: '10 bags UltraTech cement at 380 rupees and 4 pieces TMT rod for 550 rupees, GST 18 percent for Ramesh Verma on Udhaar',
      amount: '₹7,080',
      tag: 'GST + Udhaar',
      color: 'from-blue-500/10 to-indigo-500/10'
    },
    {
      id: 4,
      icon: Shirt,
      category: 'Apparel & Boutique',
      title: 'Festival Sale with Discount',
      transcript: '2 cotton kurti at 650 rupees and 1 embroidered dupatta for 350 rupees, give 150 discount for Pooja',
      amount: '₹1,575',
      tag: 'Discount Applied',
      color: 'from-purple-500/10 to-pink-500/10'
    },
    {
      id: 5,
      icon: Laptop,
      category: 'Services & Freelance',
      title: 'Logo Design & Social Media Kit',
      transcript: '1 brand logo design for 4500 rupees and 5 social media banners at 400 rs each for Client Verma',
      amount: '₹6,500',
      tag: 'Digital Invoice',
      color: 'from-rose-500/10 to-orange-500/10'
    }
  ];

  const handleSimulatePlay = (id: number, text: string) => {
    setPlayingId(id);
    onSelectPrompt(text);

    // Speak audio using Web Speech Synthesis if available
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.onend = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlayingId(null), 2500);
    }

    // Scroll to voice terminal
    const el = document.getElementById('voice-studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="moments" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto bg-stone-100/60 rounded-3xl my-10 border border-stone-200/80">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
          Real Moments
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight mt-3">
          Built for every business in India.
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-2">
          Tap any real-world moment to hear the audio playback and see the live invoice creation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {moments.map((item) => {
          const Icon = item.icon;
          const isPlaying = playingId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-md hover:border-rose-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-rose-50 text-rose-600 px-2.5 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-stone-900 mb-2">
                  {item.title}
                </h3>

                <div className="bg-stone-50 rounded-xl p-3 border border-stone-100 text-xs text-stone-700 italic relative mb-4">
                  <Volume2 className="w-3.5 h-3.5 text-rose-500 absolute right-2.5 top-2.5" />
                  &ldquo;{item.transcript}&rdquo;
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block font-medium">Estimated Bill</span>
                  <span className="text-base font-extrabold text-stone-900">{item.amount}</span>
                </div>

                <button
                  onClick={() => handleSimulatePlay(item.id, item.transcript)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-stone-900 hover:bg-rose-600 text-white shadow-sm'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isPlaying ? 'Playing...' : 'Test This'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
