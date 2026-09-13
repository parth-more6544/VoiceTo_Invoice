'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Which languages and accents are supported for voice billing?',
      a: 'Voice2Invoice supports English (India), Hindi, Hinglish (mixed colloquial speech), Marathi, Gujarati, Tamil, and Telugu. It recognizes vernacular terms like "ek plate", "do kilo", "rupaye", "udhar pe daalo", and "GST 18%".'
    },
    {
      q: 'Can I print thermal receipts and standard A4 GST invoices?',
      a: 'Yes! You can toggle between 3 invoice templates with one click: Standard A4 Tax Invoice (GST compliant with CGST/SGST splits), Modern Business Bill, and Compact 80mm/58mm POS Thermal Roll Receipt.'
    },
    {
      q: 'How does WhatsApp invoice sharing work?',
      a: 'When you click "WhatsApp", Voice2Invoice generates a formatted message with line items, tax breakdowns, UPI payment link, and customer receipt which opens directly in WhatsApp without manual typing.'
    },
    {
      q: 'How does the Udhaar / Credit Ledger update?',
      a: 'When a customer buys on credit (e.g. "Ramesh ko udhar pe diya"), Voice2Invoice marks the bill as Pending, adds the amount to the customer\'s Khata balance, and allows you to send 1-click WhatsApp payment reminders with one tap.'
    },
    {
      q: 'Is my sales and inventory data kept safe?',
      a: 'Yes, your records and transactions are locally processed and securely stored. No sensitive financial information is leaked or exposed.'
    }
  ];

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
          FAQ
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-3">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Everything you need to know about Voice2Invoice & Swar-Khata.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-stone-900 text-sm sm:text-base cursor-pointer hover:text-rose-600"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-rose-600' : 'text-stone-400'}`} />
              </button>
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
