'use client';

import React, { useState } from 'react';
import { X, Printer, Download, Share2, MessageSquare, CheckCircle, Clock, Building, User, Calendar, Receipt, Sparkles, QrCode } from 'lucide-react';
import { Invoice } from '../lib/types';
import { formatCurrency, formatDate } from '../lib/utils';

interface InvoiceModalProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus?: (invoiceId: string, status: 'Paid' | 'Pending') => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  invoice,
  isOpen,
  onClose,
  onUpdateStatus
}) => {
  const [template, setTemplate] = useState<'modern' | 'tax' | 'thermal'>('modern');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const itemsList = invoice.items
      .map(i => `• ${i.name} (${i.quantity} ${i.unit}) - ₹${i.total.toFixed(2)}`)
      .join('\n');

    const message = `🧾 *INVOICE: ${invoice.invoiceNumber}*\n` +
      `📅 Date: ${invoice.date} ${invoice.time}\n` +
      `👤 Customer: ${invoice.customerName}\n\n` +
      `*Items:*\n${itemsList}\n\n` +
      `Subtotal: ₹${invoice.subtotal.toFixed(2)}\n` +
      (invoice.discount > 0 ? `Discount: -₹${invoice.discount.toFixed(2)}\n` : '') +
      (invoice.taxAmount > 0 ? `GST (${invoice.taxRate}%): ₹${invoice.taxAmount.toFixed(2)}\n` : '') +
      `*Total Amount: ₹${invoice.totalAmount.toFixed(2)}*\n` +
      `Payment Mode: ${invoice.paymentMethod} (${invoice.status})\n\n` +
      `Thank you for your business! 🙏\n_Generated via Voice2Invoice (Swar-Khata)_`;

    const encoded = encodeURIComponent(message);
    const phone = invoice.customerPhone ? invoice.customerPhone.replace(/[^0-9]/g, '') : '';
    const whatsappUrl = phone ? `https://wa.me/${phone}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(`Invoice ${invoice.invoiceNumber} - Total: ₹${invoice.totalAmount} for ${invoice.customerName}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        
        {/* Top Action Bar (hidden in print) */}
        <div className="no-print bg-stone-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Format template switch */}
          <div className="flex items-center gap-1.5 bg-stone-800 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setTemplate('modern')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                template === 'modern' ? 'bg-rose-600 text-white' : 'text-stone-300 hover:text-white'
              }`}
            >
              Modern Bill
            </button>
            <button
              onClick={() => setTemplate('tax')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                template === 'tax' ? 'bg-rose-600 text-white' : 'text-stone-300 hover:text-white'
              }`}
            >
              GST Tax Invoice
            </button>
            <button
              onClick={() => setTemplate('thermal')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                template === 'thermal' ? 'bg-rose-600 text-white' : 'text-stone-300 hover:text-white'
              }`}
            >
              POS Thermal
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm transition-colors"
              title="Share directly on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Container */}
        <div id="printable-invoice" className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto bg-stone-50/50">
          
          {/* 1. MODERN BILL TEMPLATE */}
          {template === 'modern' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black text-lg">
                    V
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-stone-900 tracking-tight">
                      Swar-Khata Store
                    </h2>
                    <p className="text-xs text-stone-500 font-medium">
                      Voice Powered Retail & Invoicing
                    </p>
                  </div>
                </div>

                <div className="sm:text-right">
                  <div className="text-xs uppercase font-bold tracking-wider text-rose-600">
                    Retail Invoice
                  </div>
                  <div className="text-base font-extrabold text-stone-900 font-mono">
                    {invoice.invoiceNumber}
                  </div>
                  <div className="text-xs text-stone-500">
                    {formatDate(invoice.date)} • {invoice.time}
                  </div>
                </div>
              </div>

              {/* Customer & Payment Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-b border-stone-200 text-xs">
                <div>
                  <span className="font-bold text-stone-400 uppercase tracking-wider block mb-1">Billed To</span>
                  <div className="font-bold text-stone-900 text-sm">{invoice.customerName}</div>
                  {invoice.customerPhone && (
                    <div className="text-stone-500 font-mono mt-0.5">{invoice.customerPhone}</div>
                  )}
                </div>
                <div className="sm:text-right">
                  <span className="font-bold text-stone-400 uppercase tracking-wider block mb-1">Payment Status</span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-xs" style={{
                    backgroundColor: invoice.status === 'Paid' ? '#ECFDF5' : '#FEF3C7',
                    color: invoice.status === 'Paid' ? '#047857' : '#B45309'
                  }}>
                    {invoice.status === 'Paid' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    <span>{invoice.status} via {invoice.paymentMethod}</span>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="py-4">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-2">Item</th>
                      <th className="py-2 text-center">Qty</th>
                      <th className="py-2 text-right">Rate</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {invoice.items.map((item, idx) => (
                      <tr key={idx} className="py-2">
                        <td className="py-2.5 font-medium text-stone-900">
                          {item.name}
                        </td>
                        <td className="py-2.5 text-center text-stone-600 font-mono">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="py-2.5 text-right text-stone-600 font-mono">
                          ₹{item.unitPrice.toFixed(2)}
                        </td>
                        <td className="py-2.5 text-right font-bold text-stone-900 font-mono">
                          ₹{item.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Summary */}
              <div className="pt-4 border-t border-stone-200 flex flex-col items-end gap-1.5 text-xs sm:text-sm">
                <div className="flex justify-between w-56 text-stone-600">
                  <span>Subtotal:</span>
                  <span className="font-mono">₹{invoice.subtotal.toFixed(2)}</span>
                </div>
                {invoice.discount > 0 && (
                  <div className="flex justify-between w-56 text-emerald-600 font-medium">
                    <span>Discount:</span>
                    <span className="font-mono">-₹{invoice.discount.toFixed(2)}</span>
                  </div>
                )}
                {invoice.taxAmount > 0 && (
                  <div className="flex justify-between w-56 text-stone-600">
                    <span>GST ({invoice.taxRate}%):</span>
                    <span className="font-mono">₹{invoice.taxAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between w-56 pt-2 border-t border-stone-200 text-base font-black text-stone-900">
                  <span>Total:</span>
                  <span className="text-rose-600 font-mono">₹{invoice.totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Voice Transcript metadata note */}
              {invoice.voiceTranscript && (
                <div className="mt-6 p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-[11px] text-stone-500 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-700">Voice Input: </span>
                    <span className="italic">&ldquo;{invoice.voiceTranscript}&rdquo;</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. GST TAX INVOICE TEMPLATE (A4 Official) */}
          {template === 'tax' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-300 font-sans text-xs">
              <div className="text-center pb-4 border-b-2 border-stone-900">
                <h1 className="text-xl font-black uppercase tracking-wider text-stone-900">
                  TAX INVOICE
                </h1>
                <p className="text-[11px] text-stone-500 font-medium">
                  Issued under Section 31 of CGST Act, 2017
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-b border-stone-200">
                <div>
                  <div className="font-bold text-stone-900 text-sm">SWAR-KHATA TRADERS</div>
                  <div className="text-stone-600 text-[11px] leading-relaxed">
                    Shop No. 42, Main Commercial Complex<br />
                    New Delhi, 110001, India<br />
                    <strong>GSTIN:</strong> 07AAAAA0000A1Z5<br />
                    <strong>State:</strong> Delhi (07)
                  </div>
                </div>
                <div className="text-right text-[11px]">
                  <div><strong>Invoice No:</strong> {invoice.invoiceNumber}</div>
                  <div><strong>Date:</strong> {formatDate(invoice.date)}</div>
                  <div><strong>Payment Mode:</strong> {invoice.paymentMethod}</div>
                  <div className="mt-2 text-stone-700">
                    <strong>Billed To:</strong> {invoice.customerName}<br />
                    {invoice.customerPhone && <span>Ph: {invoice.customerPhone}</span>}
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left my-4 border border-stone-300 text-xs">
                <thead className="bg-stone-100 font-bold border-b border-stone-300">
                  <tr>
                    <th className="p-2 border-r border-stone-300">#</th>
                    <th className="p-2 border-r border-stone-300">Description of Goods</th>
                    <th className="p-2 border-r border-stone-300 text-center">HSN/SAC</th>
                    <th className="p-2 border-r border-stone-300 text-center">Qty</th>
                    <th className="p-2 border-r border-stone-300 text-right">Rate</th>
                    <th className="p-2 text-right">Taxable Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {invoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2 border-r border-stone-300 text-center">{idx + 1}</td>
                      <td className="p-2 border-r border-stone-300 font-medium">{item.name}</td>
                      <td className="p-2 border-r border-stone-300 text-center font-mono">1905</td>
                      <td className="p-2 border-r border-stone-300 text-center font-mono">{item.quantity} {item.unit}</td>
                      <td className="p-2 border-r border-stone-300 text-right font-mono">₹{item.unitPrice.toFixed(2)}</td>
                      <td className="p-2 text-right font-mono font-bold">₹{item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Tax Calculations breakdown */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-[10px] text-stone-500">
                  <p className="font-bold text-stone-700 mb-1">Terms & Conditions:</p>
                  <p>1. Goods once sold will not be taken back without receipt.</p>
                  <p>2. Subject to local jurisdiction.</p>
                </div>
                <div className="space-y-1 text-right text-xs">
                  <div className="flex justify-between"><span>Taxable Amount:</span><span className="font-mono">₹{invoice.subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>CGST ({invoice.taxRate / 2}%):</span><span className="font-mono">₹{(invoice.taxAmount / 2).toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>SGST ({invoice.taxRate / 2}%):</span><span className="font-mono">₹{(invoice.taxAmount / 2).toFixed(2)}</span></div>
                  <div className="flex justify-between font-black text-sm pt-2 border-t border-stone-400">
                    <span>Total Invoice Value:</span>
                    <span className="font-mono">₹{invoice.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. POS THERMAL RECEIPT TEMPLATE (80mm) */}
          {template === 'thermal' && (
            <div className="max-w-[340px] mx-auto bg-white p-5 rounded-xl shadow border border-stone-300 font-mono text-xs text-stone-900 leading-tight">
              <div className="text-center pb-3 border-b border-dashed border-stone-400">
                <div className="text-base font-black">SWAR-KHATA CAFE</div>
                <div className="text-[10px] text-stone-500">Instant Voice Billing Point</div>
                <div className="text-[10px] mt-1">Receipt #{invoice.invoiceNumber.replace('INV-', '')}</div>
                <div className="text-[10px]">{invoice.date} {invoice.time}</div>
              </div>

              <div className="py-2 border-b border-dashed border-stone-400 text-[11px]">
                <div>Customer: {invoice.customerName}</div>
                <div>Payment: {invoice.paymentMethod}</div>
              </div>

              <div className="py-2 border-b border-dashed border-stone-400">
                <div className="flex justify-between font-bold text-[10px] pb-1">
                  <span>ITEM</span>
                  <span>QTY</span>
                  <span>TOTAL</span>
                </div>
                {invoice.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-[11px] py-0.5">
                    <span className="truncate max-w-[150px]">{item.name}</span>
                    <span>{item.quantity}</span>
                    <span>₹{item.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="py-2 border-b border-dashed border-stone-400 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{invoice.subtotal.toFixed(2)}</span>
                </div>
                {invoice.discount > 0 && (
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>-₹{invoice.discount.toFixed(2)}</span>
                  </div>
                )}
                {invoice.taxAmount > 0 && (
                  <div className="flex justify-between">
                    <span>Tax ({invoice.taxRate}%)</span>
                    <span>₹{invoice.taxAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-sm pt-1 border-t border-stone-300">
                  <span>GRAND TOTAL</span>
                  <span>₹{invoice.totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* QR Code Simulation */}
              <div className="text-center pt-3">
                <div className="w-20 h-20 mx-auto bg-stone-100 border border-stone-300 flex items-center justify-center rounded-lg">
                  <QrCode className="w-16 h-16 text-stone-800" />
                </div>
                <div className="text-[9px] text-stone-500 mt-1">Scan to Pay UPI / Verify</div>
                <div className="text-[10px] font-bold mt-2">THANK YOU! VISIT AGAIN</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="no-print bg-stone-100 px-6 py-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Auto-synced with Ledger & Stock</span>
          </div>

          <div className="flex items-center gap-2">
            {onUpdateStatus && (
              <button
                onClick={() => onUpdateStatus(invoice.id, invoice.status === 'Paid' ? 'Pending' : 'Paid')}
                className="font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
              >
                Toggle Status: {invoice.status === 'Paid' ? 'Mark Pending' : 'Mark Paid'}
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-full bg-stone-800 text-white font-bold hover:bg-stone-900 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
