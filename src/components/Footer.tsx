'use client';

import React from 'react';
import { Mic, Heart, Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 px-4 sm:px-6 mt-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-black">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <div className="text-lg font-black text-white tracking-tight">
              Voice<span className="text-rose-500">2</span>Invoice
            </div>
            <div className="text-xs text-stone-400">
              Swar-Khata • Voice to Verified Invoicing Platform
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs text-stone-400">
          <span>Made for Indian Retail & MSME Businesses</span>
          <span>•</span>
          <span>GST Ready</span>
          <span>•</span>
          <span>WhatsApp Integrated</span>
        </div>

        {/* Copyright */}
        <div className="text-xs text-stone-500">
          © {new Date().getFullYear()} Voice2Invoice. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
