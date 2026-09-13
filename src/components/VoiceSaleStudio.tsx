'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Sparkles, Plus, Trash2, Edit3, ArrowRight, RefreshCw, Check, AlertCircle, ShoppingBag, User, Phone, IndianRupee, Tag, Percent, Receipt } from 'lucide-react';
import { Invoice, InvoiceItem, PaymentMethod } from '../lib/types';
import { parseVoiceInput } from '../lib/voiceParser';
import { SAMPLE_VOICE_PROMPTS } from '../lib/sampleData';
import { formatCurrency } from '../lib/utils';

interface VoiceSaleStudioProps {
  onInvoiceCreated: (invoice: Invoice) => void;
  onPreviewInvoice: (invoice: Invoice) => void;
  initialTranscript?: string;
  selectedLanguage?: string;
}

export const VoiceSaleStudio: React.FC<VoiceSaleStudioProps> = ({
  onInvoiceCreated,
  onPreviewInvoice,
  initialTranscript = '',
  selectedLanguage = 'en-IN'
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>(initialTranscript);
  const [detectedLang, setDetectedLang] = useState<string>('English / Hinglish');
  const [confidence, setConfidence] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>('Walk-in Customer');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');
  const [audioLevel, setAudioLevel] = useState<number>(0);

  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = selectedLanguage === 'hinglish' ? 'hi-IN' : selectedLanguage;

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
          handleParseText(currentTranscript);
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [selectedLanguage]);

  // Audio visualizer animation simulation when recording
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setAudioLevel(Math.floor(Math.random() * 80) + 20);
      }, 100);
    } else {
      setAudioLevel(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Handle parse when initial transcript changes
  useEffect(() => {
    if (initialTranscript) {
      setTranscript(initialTranscript);
      handleParseText(initialTranscript);
    }
  }, [initialTranscript]);

  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      setTranscript('');
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsRecording(true);
        } catch (e) {
          console.error(e);
          // Fallback simulation if mic is blocked in some environments
          setIsRecording(true);
        }
      } else {
        // Fallback for browsers without Web Speech API
        alert('Web Speech API is not supported in this browser. You can click on the sample prompt chips or type your sentence directly!');
      }
    }
  };

  const handleParseText = (text: string) => {
    if (!text.trim()) return;
    const parsed = parseVoiceInput(text);
    if (parsed.items.length > 0) {
      setItems(parsed.items);
    }
    if (parsed.customerName) setCustomerName(parsed.customerName);
    if (parsed.customerPhone) setCustomerPhone(parsed.customerPhone);
    if (parsed.paymentMethod) setPaymentMethod(parsed.paymentMethod);
    if (parsed.discount !== undefined) setDiscount(parsed.discount);
    if (parsed.taxRate !== undefined) setTaxRate(parsed.taxRate);
    setConfidence(parsed.confidence);
    setDetectedLang(parsed.detectedLanguage);
  };

  // Preset click
  const handlePresetSelect = (presetText: string) => {
    setTranscript(presetText);
    handleParseText(presetText);
  };

  // Item modifications
  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const updated = [...items];
    const item = { ...updated[index], [field]: value };
    if (field === 'quantity' || field === 'unitPrice') {
      item.total = Math.round(Number(item.quantity || 0) * Number(item.unitPrice || 0) * 100) / 100;
    }
    updated[index] = item;
    setItems(updated);
  };

  const addItemRow = () => {
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      name: 'New Item',
      quantity: 1,
      unit: 'pcs',
      unitPrice: 10,
      total: 10
    };
    setItems([...items, newItem]);
  };

  const removeItemRow = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
  const taxAmount = Math.round((subtotal * (taxRate / 100)) * 100) / 100;
  const totalAmount = Math.max(0, subtotal - discount + taxAmount);

  const buildCurrentInvoice = (): Invoice => {
    const now = new Date();
    return {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-${now.getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customerName: customerName.trim() || 'Walk-in Customer',
      customerPhone: customerPhone.trim() || undefined,
      items: items.length > 0 ? items : [
        { id: 'def-1', name: 'Sample Item', quantity: 1, unit: 'pcs', unitPrice: totalAmount || 40, total: totalAmount || 40 }
      ],
      subtotal,
      discount,
      taxRate,
      taxAmount,
      totalAmount,
      paymentMethod,
      status: paymentMethod === 'Credit / Udhaar' || paymentMethod === 'Pending' ? 'Pending' : 'Paid',
      notes,
      voiceTranscript: transcript
    };
  };

  const handleGenerateInvoice = () => {
    const invoice = buildCurrentInvoice();
    onInvoiceCreated(invoice);
    onPreviewInvoice(invoice);
  };

  return (
    <div id="voice-studio" className="bg-white rounded-3xl p-5 sm:p-8 border border-stone-200/90 shadow-xl max-w-5xl mx-auto my-8">
      {/* Header bar of Studio */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              Live Voice Billing Terminal
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Speak natural sales in Hindi, English or Hinglish. AI will parse items, calculate totals, and draft the bill.
          </p>
        </div>

        {/* Confidence & Language badges */}
        {transcript && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[11px] font-semibold bg-rose-50 text-rose-600 px-3 py-1 rounded-full border border-rose-200/60">
              {detectedLang}
            </span>
            <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200/60 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {Math.round(confidence * 100)}% Match
            </span>
          </div>
        )}
      </div>

      {/* Voice Recording Box */}
      <div className="mt-6 bg-gradient-to-b from-stone-50 to-rose-50/20 rounded-2xl p-5 sm:p-6 border border-stone-200/80">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Big Mic Button */}
          <div className="relative shrink-0">
            <button
              onClick={toggleRecording}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-xl cursor-pointer ${
                isRecording
                  ? 'bg-rose-600 text-white shadow-rose-500/50 scale-105 animate-pulse-glow ring-8 ring-rose-200'
                  : 'bg-stone-900 hover:bg-rose-600 text-white shadow-stone-900/20 hover:scale-105'
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  <span className="text-[10px] font-bold mt-1 tracking-wider uppercase">Listening</span>
                </>
              ) : (
                <>
                  <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400" />
                  <span className="text-[10px] font-bold mt-1 tracking-wider uppercase">Tap to Speak</span>
                </>
              )}
            </button>
          </div>

          {/* Transcript input / Live display */}
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                Live Voice Transcript
              </label>
              {isRecording && (
                <div className="flex items-center gap-1">
                  {[...Array(8)].map((_, i) => (
                    <span
                      key={i}
                      className="w-1 bg-rose-500 rounded-full transition-all duration-100"
                      style={{ height: `${Math.max(4, Math.sin((i + audioLevel / 10)) * 18 + 10)}px` }}
                    />
                  ))}
                </div>
              )}
            </div>

            <textarea
              value={transcript}
              onChange={(e) => {
                setTranscript(e.target.value);
                handleParseText(e.target.value);
              }}
              placeholder='Speak or type here (e.g. "2 samosa at 15 rupees and 1 chai for 10 rupees for Sharma ji")'
              rows={2}
              className="w-full bg-white text-stone-900 text-sm sm:text-base font-medium rounded-xl p-3.5 border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none resize-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Quick Voice Prompt Scenarios (Presets) */}
        <div className="mt-4 pt-4 border-t border-stone-200/60">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <span>⚡ Try Sample Voice Prompts:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SAMPLE_VOICE_PROMPTS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handlePresetSelect(preset.text)}
                className="shrink-0 flex items-center gap-1.5 bg-white hover:bg-rose-50 hover:border-rose-300 text-stone-700 hover:text-rose-600 px-3 py-1.5 rounded-full border border-stone-200 text-xs font-medium transition-all shadow-2xs cursor-pointer group"
              >
                <span>{preset.icon}</span>
                <span className="font-semibold">{preset.title}</span>
                <span className="text-[10px] text-stone-400 group-hover:text-rose-500">({preset.tag})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Parsed Invoice Details Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Customer Name */}
        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
          <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1 mb-1.5">
            <User className="w-3.5 h-3.5 text-stone-600" />
            Customer Name
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Walk-in Customer"
            className="w-full bg-white text-stone-800 text-sm font-semibold rounded-xl px-3 py-2 border border-stone-300 focus:border-rose-500 outline-none"
          />
        </div>

        {/* Customer Phone */}
        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
          <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1 mb-1.5">
            <Phone className="w-3.5 h-3.5 text-stone-600" />
            Phone / WhatsApp
          </label>
          <input
            type="text"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full bg-white text-stone-800 text-sm font-semibold rounded-xl px-3 py-2 border border-stone-300 focus:border-rose-500 outline-none"
          />
        </div>

        {/* Payment Mode */}
        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
          <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1 mb-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-stone-600" />
            Payment Mode
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
            className="w-full bg-white text-stone-800 text-sm font-semibold rounded-xl px-3 py-2 border border-stone-300 focus:border-rose-500 outline-none"
          >
            <option value="UPI">UPI (GPay / PhonePe / QR)</option>
            <option value="Cash">Cash</option>
            <option value="Credit / Udhaar">Credit / Udhaar (Khata)</option>
            <option value="Card">Card / POS</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Items Table */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-rose-500" />
            Parsed Invoice Items ({items.length})
          </h4>
          <button
            onClick={addItemRow}
            className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-full border border-rose-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Row
          </button>
        </div>

        <div className="overflow-x-auto border border-stone-200 rounded-2xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-100/80 text-stone-600 text-xs font-bold uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Item Name</th>
                <th className="py-3 px-3 w-20">Qty</th>
                <th className="py-3 px-3 w-24">Unit</th>
                <th className="py-3 px-3 w-28">Rate (₹)</th>
                <th className="py-3 px-4 w-28 text-right">Total (₹)</th>
                <th className="py-3 px-2 w-10 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 bg-white">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-400 text-sm">
                    No items yet. Speak with the microphone or click a sample prompt above!
                  </td>
                </tr>
              ) : (
                items.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-2.5 px-4">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                        className="w-full bg-transparent font-medium text-stone-900 outline-none border-b border-transparent focus:border-rose-400 py-1"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="number"
                        min="0.1"
                        step="any"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, 'quantity', parseFloat(e.target.value) || 0)}
                        className="w-16 bg-stone-50 font-semibold text-stone-800 text-center rounded-lg px-2 py-1 border border-stone-200 focus:border-rose-400 outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <select
                        value={item.unit}
                        onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
                        className="bg-stone-50 text-xs font-semibold text-stone-700 rounded-lg px-2 py-1 border border-stone-200 focus:border-rose-400 outline-none"
                      >
                        <option value="pcs">pcs</option>
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="pkt">pkt</option>
                        <option value="cup">cup</option>
                        <option value="plate">plate</option>
                        <option value="bottle">bottle</option>
                        <option value="L">L</option>
                        <option value="bag">bag</option>
                        <option value="box">box</option>
                        <option value="dozen">dozen</option>
                        <option value="m">m</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(idx, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="w-24 bg-stone-50 font-semibold text-stone-800 rounded-lg px-2 py-1 border border-stone-200 focus:border-rose-400 outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-stone-900">
                      ₹{item.total.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => removeItemRow(idx)}
                        className="text-stone-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                        title="Delete item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary & Actions */}
      <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-6 border-t border-stone-200">
        {/* Taxes & Discounts controls */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-600">
          <div className="flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
            <Tag className="w-3.5 h-3.5 text-rose-500" />
            <span>Discount: ₹</span>
            <input
              type="number"
              min="0"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
              className="w-16 bg-white rounded-md px-2 py-0.5 border border-stone-300 font-bold text-stone-800 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
            <Percent className="w-3.5 h-3.5 text-indigo-500" />
            <span>GST / Tax Rate:</span>
            <select
              value={taxRate}
              onChange={(e) => setTaxRate(parseInt(e.target.value, 10) || 0)}
              className="bg-white rounded-md px-2 py-0.5 border border-stone-300 font-bold text-stone-800 outline-none"
            >
              <option value={0}>0% (Exempt / Retail)</option>
              <option value={5}>5% (Groceries / Food)</option>
              <option value={12}>12% (Apparel / Dairy)</option>
              <option value={18}>18% (Standard GST / Services)</option>
              <option value={28}>28% (Luxury)</option>
            </select>
          </div>
        </div>

        {/* Grand Total & Generate Button */}
        <div className="flex items-center justify-between lg:justify-end gap-4">
          <div className="text-right">
            <div className="text-xs text-stone-500 font-medium">Grand Total</div>
            <div className="text-2xl sm:text-3xl font-black text-stone-900 font-sans">
              {formatCurrency(totalAmount)}
            </div>
          </div>

          <button
            onClick={handleGenerateInvoice}
            disabled={items.length === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 disabled:bg-stone-300 text-white font-bold text-sm shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Receipt className="w-4 h-4" />
            <span>Generate & Preview Invoice</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
