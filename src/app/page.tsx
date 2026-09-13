'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { VoiceSaleStudio } from '../components/VoiceSaleStudio';
import { NotebookComparison } from '../components/NotebookComparison';
import { HowItWorks } from '../components/HowItWorks';
import { MomentsShowcase } from '../components/MomentsShowcase';
import { StoriesSection } from '../components/StoriesSection';
import { FaqSection } from '../components/FaqSection';
import { Footer } from '../components/Footer';
import { InvoiceModal } from '../components/InvoiceModal';
import { DashboardView } from '../components/DashboardView';
import { INITIAL_INVOICES, INITIAL_CUSTOMERS, INITIAL_INVENTORY } from '../lib/sampleData';
import { CustomerRecord, InventoryItem, Invoice } from '../lib/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'landing' | 'dashboard'>('landing');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en-IN');
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [customers, setCustomers] = useState<CustomerRecord[]>(INITIAL_CUSTOMERS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState<boolean>(false);
  const [currentVoicePreset, setCurrentVoicePreset] = useState<string>('');

  // Handle new invoice generated
  const handleInvoiceCreated = (newInvoice: Invoice) => {
    // 1. Add to invoices list
    setInvoices(prev => [newInvoice, ...prev]);

    // 2. Update or add customer record
    setCustomers(prev => {
      const existing = prev.find(c => c.name.toLowerCase() === newInvoice.customerName.toLowerCase());
      if (existing) {
        return prev.map(c => {
          if (c.id === existing.id) {
            return {
              ...c,
              totalPurchases: c.totalPurchases + newInvoice.totalAmount,
              outstandingBalance: newInvoice.status === 'Pending' ? c.outstandingBalance + newInvoice.totalAmount : c.outstandingBalance,
              lastTransactionDate: newInvoice.date,
              status: newInvoice.status === 'Pending' ? 'Reminder Needed' : c.status
            };
          }
          return c;
        });
      } else {
        const newCust: CustomerRecord = {
          id: `c-${Date.now()}`,
          name: newInvoice.customerName,
          phone: newInvoice.customerPhone || '+91 99999 00000',
          totalPurchases: newInvoice.totalAmount,
          outstandingBalance: newInvoice.status === 'Pending' ? newInvoice.totalAmount : 0,
          lastTransactionDate: newInvoice.date,
          status: newInvoice.status === 'Pending' ? 'Reminder Needed' : 'Good'
        };
        return [newCust, ...prev];
      }
    });

    // 3. Auto-deduct inventory stock
    setInventory(prev => {
      return prev.map(invItem => {
        const matchedItem = newInvoice.items.find(i => 
          i.name.toLowerCase().includes(invItem.name.toLowerCase()) || 
          invItem.name.toLowerCase().includes(i.name.toLowerCase())
        );
        if (matchedItem) {
          const newStock = Math.max(0, invItem.currentStock - matchedItem.quantity);
          return {
            ...invItem,
            currentStock: newStock,
            lastUpdated: newInvoice.date
          };
        }
        return invItem;
      });
    });
  };

  const handlePreviewInvoice = (invoice: Invoice) => {
    setPreviewInvoice(invoice);
    setIsInvoiceModalOpen(true);
  };

  const handleUpdateInvoiceStatus = (invoiceId: string, status: 'Paid' | 'Pending') => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        return { ...inv, status };
      }
      return inv;
    }));
    if (previewInvoice && previewInvoice.id === invoiceId) {
      setPreviewInvoice(prev => prev ? { ...prev, status } : null);
    }
  };

  const scrollToVoiceStudio = () => {
    if (activeTab !== 'landing') {
      setActiveTab('landing');
      setTimeout(() => {
        const element = document.getElementById('voice-studio');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('voice-studio');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPromptPreset = (presetText: string) => {
    setCurrentVoicePreset(presetText);
    scrollToVoiceStudio();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Top Floating Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onStartVoiceSale={scrollToVoiceStudio}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'landing' ? (
          <>
            {/* Hero Section */}
            <Hero
              onStartVoiceSale={scrollToVoiceStudio}
              onTryPreset={handleSelectPromptPreset}
            />

            {/* Interactive Voice Sale Studio */}
            <VoiceSaleStudio
              onInvoiceCreated={handleInvoiceCreated}
              onPreviewInvoice={handlePreviewInvoice}
              initialTranscript={currentVoicePreset}
              selectedLanguage={selectedLanguage}
            />

            {/* Notebook vs Digital Transformation */}
            <NotebookComparison />

            {/* How it Works Step-by-Step */}
            <HowItWorks />

            {/* Real Moments Audio Showcase */}
            <MomentsShowcase onSelectPrompt={handleSelectPromptPreset} />

            {/* User Testimonial Stories */}
            <StoriesSection />

            {/* FAQ Accordion */}
            <FaqSection />
          </>
        ) : (
          /* Real-time Sales & Ledger Dashboard */
          <DashboardView
            invoices={invoices}
            customers={customers}
            inventory={inventory}
            onOpenInvoiceModal={handlePreviewInvoice}
            onNewVoiceSale={scrollToVoiceStudio}
          />
        )}
      </main>

      {/* Invoice Modal for Preview, WhatsApp & Print */}
      <InvoiceModal
        invoice={previewInvoice}
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        onUpdateStatus={handleUpdateInvoiceStatus}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
