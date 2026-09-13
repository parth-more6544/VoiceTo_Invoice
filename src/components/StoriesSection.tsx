'use client';

import React from 'react';
import { Star, Quote, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

export const StoriesSection: React.FC = () => {
  const stories = [
    {
      name: 'Radheshyam Gupta',
      business: 'Gupta Kirana Store, Indore',
      impact: 'Saved 2 hours every evening',
      quote: 'Pehele shaam ko bahi-khata likhte likhte 2 ghante nikal jaate the. Ab sirf bolte jao, bill generate ho jata hai aur WhatsApp par chala jata hai.',
      rating: 5,
      metric: '₹42,000+ Monthly Udhaar recovered'
    },
    {
      name: 'Sunita Sharma',
      business: 'Sharma Sarees & Boutique, Jaipur',
      impact: 'Zero billing calculation errors',
      quote: 'Festival rush mein discount aur GST calculate karne me time lagta tha. Voice2Invoice makes customized invoices in seconds without touching the keyboard.',
      rating: 5,
      metric: '3x Faster customer billing'
    },
    {
      name: 'Kailash Patel',
      business: 'Patel Hardware & Building Materials, Ahmedabad',
      impact: '100% GST Compliance',
      quote: 'Cement, saria, aur paint ke rates roz badalte hain. Hum bas bolte hain aur exact 18% GST tax invoice print ho jata hai.',
      rating: 5,
      metric: 'Over 1,200 invoices issued'
    }
  ];

  return (
    <section id="stories" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
          User Stories
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight mt-3">
          Trusted by over 10,000+ merchants.
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-2">
          Hear how local businesses transformed their daily billing and accounts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between hover:border-rose-300 transition-all group"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed mb-6 font-serif">
                &ldquo;{story.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block mb-3">
                ★ {story.metric}
              </div>
              <div className="font-extrabold text-stone-900 text-sm">{story.name}</div>
              <div className="text-xs text-stone-500">{story.business}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
