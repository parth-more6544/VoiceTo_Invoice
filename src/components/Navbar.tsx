'use client';

import React, { useState } from 'react';
import { Mic, BarChart3, Globe, Menu, X, Sparkles, ReceiptText } from 'lucide-react';

interface NavbarProps {
  activeTab: 'landing' | 'dashboard';
  setActiveTab: (tab: 'landing' | 'dashboard') => void;
  onStartVoiceSale: () => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onStartVoiceSale,
  selectedLanguage,
  setSelectedLanguage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const languages = [
    { code: 'en-IN', name: 'English (India)' },
    { code: 'hi-IN', name: 'हिंदी (Hindi)' },
    { code: 'hinglish', name: 'Hinglish (Mix)' },
    { code: 'mr-IN', name: 'मराठी (Marathi)' },
    { code: 'gu-IN', name: 'ગુજરાતી (Gujarati)' },
    { code: 'ta-IN', name: 'தமிழ் (Tamil)' },
    { code: 'te-IN', name: 'తెలుగు (Telugu)' }
  ];

  const handleNavClick = (sectionId: string) => {
    if (activeTab !== 'landing') {
      setActiveTab('landing');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 max-w-7xl mx-auto">
      <nav className="bg-white/90 backdrop-blur-md rounded-full shadow-lg shadow-stone-200/50 border border-stone-200/80 px-4 py-2.5 sm:px-6 flex items-center justify-between transition-all duration-200">
        {/* Brand Logo */}
        <div 
          onClick={() => { setActiveTab('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-rose-400 text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <div className="w-3.5 h-3.5 rounded-full border-2 border-white/90"></div>
          </div>
          <div className="flex items-baseline">
            <span className="text-xl font-extrabold tracking-tight text-stone-900 font-sans">
              Voice<span className="text-rose-500">2</span>Invoice
            </span>
            <span className="hidden sm:inline-block ml-1.5 text-[10px] font-semibold uppercase tracking-wider text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-full border border-rose-200/60">
              Swar-Khata
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="hover:text-rose-600 transition-colors cursor-pointer"
          >
            How it works
          </button>
          <button
            onClick={() => handleNavClick('moments')}
            className="hover:text-rose-600 transition-colors cursor-pointer"
          >
            Moments
          </button>
          <button
            onClick={() => handleNavClick('stories')}
            className="hover:text-rose-600 transition-colors cursor-pointer"
          >
            Stories
          </button>
          <button
            onClick={() => handleNavClick('faq')}
            className="hover:text-rose-600 transition-colors cursor-pointer"
          >
            FAQ
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'dashboard' ? 'text-rose-600 font-semibold' : 'hover:text-rose-600'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </button>
        </div>

        {/* Right CTA Area */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors"
              title="Change Voice Recognition Language"
            >
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">{languages.find(l => l.name.includes(selectedLanguage) || l.code === selectedLanguage)?.name.split(' ')[0] || 'English'}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-stone-200 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95">
                <div className="px-3 py-1 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                  Voice Speech Language
                </div>
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-between transition-colors ${
                      selectedLanguage === lang.code ? 'text-rose-600 font-bold bg-rose-50/50' : 'text-stone-700'
                    }`}
                  >
                    <span>{lang.name}</span>
                    {selectedLanguage === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary Voice Sale CTA */}
          <button
            onClick={onStartVoiceSale}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900 hover:bg-rose-600 text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-rose-500/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Mic className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>Start Voice Sale</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-stone-100 text-stone-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-2xl border border-stone-200 flex flex-col gap-3 text-sm font-medium animate-in slide-in-from-top-3">
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="text-left px-3 py-2 rounded-xl hover:bg-stone-100"
          >
            How it works
          </button>
          <button
            onClick={() => handleNavClick('moments')}
            className="text-left px-3 py-2 rounded-xl hover:bg-stone-100"
          >
            Moments
          </button>
          <button
            onClick={() => handleNavClick('stories')}
            className="text-left px-3 py-2 rounded-xl hover:bg-stone-100"
          >
            Stories
          </button>
          <button
            onClick={() => handleNavClick('faq')}
            className="text-left px-3 py-2 rounded-xl hover:bg-stone-100"
          >
            FAQ
          </button>
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setMobileMenuOpen(false);
            }}
            className="text-left px-3 py-2 rounded-xl bg-rose-50 text-rose-600 font-semibold flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Sales & Ledger Dashboard
            </span>
            <span className="text-xs bg-rose-200/60 px-2 py-0.5 rounded-full">Live</span>
          </button>
        </div>
      )}
    </header>
  );
};
