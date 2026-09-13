'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  IndianRupee, 
  ShoppingBag, 
  Users, 
  AlertTriangle, 
  Search, 
  Filter, 
  MessageSquare, 
  Eye, 
  ArrowUpRight, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Package, 
  Receipt,
  FileSpreadsheet
} from 'lucide-react';
import { CustomerRecord, InventoryItem, Invoice } from '../lib/types';
import { formatCurrency, formatDate } from '../lib/utils';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DashboardViewProps {
  invoices: Invoice[];
  customers: CustomerRecord[];
  inventory: InventoryItem[];
  onOpenInvoiceModal: (invoice: Invoice) => void;
  onNewVoiceSale: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  invoices,
  customers,
  inventory,
  onOpenInvoiceModal,
  onNewVoiceSale
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'khata' | 'inventory'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending'>('All');

  // KPI Calculations
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const paidRevenue = invoices.filter(i => i.status === 'Paid').reduce((sum, inv) => sum + inv.totalAmount, 0);
  const pendingUdhaar = invoices.filter(i => i.status === 'Pending').reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalInvoicesCount = invoices.length;
  const lowStockCount = inventory.filter(i => i.currentStock <= i.lowStockThreshold).length;

  // Chart Data Preparation
  const paymentSplitData = [
    { name: 'UPI', value: invoices.filter(i => i.paymentMethod === 'UPI').reduce((s, i) => s + i.totalAmount, 0), color: '#3B82F6' },
    { name: 'Cash', value: invoices.filter(i => i.paymentMethod === 'Cash').reduce((s, i) => s + i.totalAmount, 0), color: '#10B981' },
    { name: 'Udhaar', value: invoices.filter(i => i.paymentMethod === 'Credit / Udhaar').reduce((s, i) => s + i.totalAmount, 0), color: '#F59E0B' },
    { name: 'Card', value: invoices.filter(i => i.paymentMethod === 'Card').reduce((s, i) => s + i.totalAmount, 0), color: '#8B5CF6' }
  ].filter(d => d.value > 0);

  const salesTrendData = [
    { time: '09:00', sales: 450 },
    { time: '11:00', sales: 1200 },
    { time: '13:00', sales: 2850 },
    { time: '15:00', sales: 3400 },
    { time: '17:00', sales: 5600 },
    { time: '19:00', sales: totalRevenue || 7450 }
  ];

  const topItemsData = [
    { name: 'Samosa', count: 48, revenue: 720 },
    { name: 'UltraTech Cement', count: 10, revenue: 3800 },
    { name: 'Basmati Rice', count: 15, revenue: 1275 },
    { name: 'Kurti (Cotton)', count: 4, revenue: 2600 },
    { name: 'Masala Chai', count: 65, revenue: 650 }
  ];

  // Filtered Invoices
  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.items.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'All' ? true : inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sendWhatsAppReminder = (customer: CustomerRecord) => {
    const text = `Namaste ${customer.name} ji, this is a gentle reminder from Swar-Khata Store regarding your pending balance of ₹${customer.outstandingBalance}. Kindly clear via UPI or cash at your convenience. Thank you! 🙏`;
    const phone = customer.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="pt-4 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Business & Billing Dashboard
            </h1>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
              Live Real-Time
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Voice-generated sales records, customer Udhaar khata, and stock synchronization
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onNewVoiceSale}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full shadow-lg shadow-rose-600/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Voice Sale</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Sales */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Sales Today</span>
            <div className="w-9 h-9 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900">
            {formatCurrency(totalRevenue)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% from yesterday</span>
          </div>
        </div>

        {/* Paid Revenue */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Collected (Cash/UPI)</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700">
            {formatCurrency(paidRevenue)}
          </div>
          <div className="text-xs text-stone-500 mt-2 font-medium">
            {Math.round((paidRevenue / (totalRevenue || 1)) * 100)}% Settled Instantly
          </div>
        </div>

        {/* Pending Udhaar */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Pending Udhaar (Khata)</span>
            <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-700">
            {formatCurrency(pendingUdhaar)}
          </div>
          <div className="text-xs text-amber-600 font-bold mt-2 flex items-center gap-1">
            <span>{customers.filter(c => c.outstandingBalance > 0).length} customers pending</span>
          </div>
        </div>

        {/* Invoices & Stock */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Invoices & Stock</span>
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl sm:text-3xl font-black text-stone-900">
              {totalInvoicesCount} <span className="text-xs text-stone-500 font-normal">bills</span>
            </div>
            {lowStockCount > 0 && (
              <span className="text-xs bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {lowStockCount} low stock
              </span>
            )}
          </div>
          <div className="text-xs text-stone-500 mt-2 font-medium">
            Auto stock deduction enabled
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3 mb-6 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-stone-900 text-white shadow-md'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('invoices')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'invoices'
              ? 'bg-stone-900 text-white shadow-md'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>All Invoices ({invoices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('khata')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'khata'
              ? 'bg-stone-900 text-white shadow-md'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Udhaar & Khata Book ({customers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'inventory'
              ? 'bg-stone-900 text-white shadow-md'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Inventory Tracker ({inventory.length})</span>
        </button>
      </div>

      {/* TAB 1: ANALYTICS OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Hourly Area Chart */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-stone-900">Today&apos;s Cumulative Sales Growth</h3>
                  <p className="text-xs text-stone-500">Real-time revenue timeline throughout the day</p>
                </div>
                <span className="text-xs bg-stone-100 text-stone-700 px-3 py-1 rounded-full font-semibold">
                  Today (IST)
                </span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesTrendData}>
                    <defs>
                      <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                    <XAxis dataKey="time" stroke="#a1a1aa" fontSize={11} tickLine={false} />
                    <YAxis stroke="#a1a1aa" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v}`} />
                    <Tooltip
                      formatter={(val: any) => [`₹${val}`, 'Sales']}
                      contentStyle={{ backgroundColor: '#18181b', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="sales" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#salesGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Payment Method Distribution Pie Chart */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-900">Payment Breakdown</h3>
                <p className="text-xs text-stone-500">UPI vs Cash vs Udhaar credit</p>
              </div>
              <div className="h-52 w-full my-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentSplitData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {paymentSplitData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [`₹${val}`, 'Amount']}
                      contentStyle={{ backgroundColor: '#18181b', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-xs">
                {paymentSplitData.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
                    <span className="font-medium text-stone-600">{d.name}:</span>
                    <span className="font-bold text-stone-900">₹{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Selling Items */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
            <h3 className="text-base font-bold text-stone-900 mb-1">Top Selling Items by Volume</h3>
            <p className="text-xs text-stone-500 mb-4">Fastest moving inventory recorded from voice billing</p>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topItemsData} layout="vertical" margin={{ left: 30, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f4f4f5" />
                  <XAxis type="number" stroke="#a1a1aa" fontSize={11} tickLine={false} />
                  <YAxis type="category" dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} />
                  <Tooltip
                    formatter={(val: any) => [`${val} sold`, 'Units']}
                    contentStyle={{ backgroundColor: '#18181b', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                  />
                  <Bar dataKey="count" fill="#f43f5e" radius={[0, 8, 8, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INVOICES HISTORY TABLE */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search invoice number, customer, item..."
                className="w-full bg-stone-50 text-xs sm:text-sm pl-9 pr-4 py-2.5 rounded-2xl border border-stone-200 focus:border-rose-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              {(['All', 'Paid', 'Pending'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-colors ${
                    statusFilter === status
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-stone-200 rounded-2xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-100/80 text-stone-600 uppercase font-bold text-[11px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-center">Payment</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-stone-400">
                      No invoices found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                        {inv.invoiceNumber}
                        <div className="text-[10px] text-stone-400 font-sans font-normal">{inv.date} {inv.time}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-stone-800">{inv.customerName}</div>
                        {inv.customerPhone && <div className="text-[11px] text-stone-500">{inv.customerPhone}</div>}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-xs text-stone-600 truncate max-w-xs">
                          {inv.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-stone-900 font-mono">
                        {formatCurrency(inv.totalAmount)}
                      </td>
                      <td className="py-3.5 px-4 text-center text-xs text-stone-600">
                        {inv.paymentMethod}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          inv.status === 'Paid'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => onOpenInvoiceModal(inv)}
                          className="p-1.5 rounded-lg bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-700 transition-colors cursor-pointer"
                          title="View Invoice"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOMER UDHAAR / KHATA BOOK */}
      {activeTab === 'khata' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-stone-900">Customer Udhaar (Credit) Ledger</h3>
              <p className="text-xs text-stone-500">Track outstanding balances and send 1-click WhatsApp payment reminders</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customers.map((cust) => (
              <div key={cust.id} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-stone-900">{cust.name}</h4>
                    <p className="text-xs text-stone-500 font-mono mt-0.5">{cust.phone}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    cust.outstandingBalance > 0
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {cust.status}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-stone-400 uppercase font-semibold">Udhaar Balance</div>
                    <div className={`text-lg font-black font-mono ${cust.outstandingBalance > 0 ? 'text-amber-700' : 'text-stone-700'}`}>
                      {formatCurrency(cust.outstandingBalance)}
                    </div>
                  </div>

                  {cust.outstandingBalance > 0 ? (
                    <button
                      onClick={() => sendWhatsAppReminder(cust)}
                      className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Remind</span>
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-600">✓ All Clear</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INVENTORY TRACKER */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-stone-900">Inventory Stock & Auto-Deduction</h3>
              <p className="text-xs text-stone-500">Stock updates automatically as voice invoices are processed</p>
            </div>
          </div>

          <div className="overflow-x-auto border border-stone-200 rounded-2xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-100/80 text-stone-600 uppercase font-bold text-[11px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Item Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-center">Current Stock</th>
                  <th className="py-3 px-4 text-right">Price/Unit</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {inventory.map((item) => {
                  const isLow = item.currentStock <= item.lowStockThreshold;
                  return (
                    <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-stone-900">{item.name}</td>
                      <td className="py-3 px-4 text-stone-600">{item.category}</td>
                      <td className="py-3 px-4 text-center font-mono font-extrabold text-stone-800">
                        {item.currentStock} {item.unit}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-stone-900">
                        ₹{item.pricePerUnit}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isLow
                            ? 'bg-rose-100 text-rose-700 animate-pulse'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {isLow ? '⚠️ Low Stock' : '✓ In Stock'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
