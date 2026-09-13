export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  category?: string;
}

export type PaymentMethod = 'Cash' | 'UPI' | 'Credit / Udhaar' | 'Card' | 'Pending';
export type InvoiceStatus = 'Paid' | 'Pending' | 'Partially Paid' | 'Cancelled';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone?: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  taxRate: number; // e.g. 5, 12, 18
  taxAmount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: InvoiceStatus;
  notes?: string;
  voiceTranscript?: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  totalPurchases: number;
  outstandingBalance: number; // Udhaar
  lastTransactionDate: string;
  status: 'Good' | 'Reminder Needed' | 'Overdue';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  unit: string;
  pricePerUnit: number;
  lowStockThreshold: number;
  lastUpdated: string;
}

export interface ParsedVoiceResult {
  transcript: string;
  items: InvoiceItem[];
  customerName?: string;
  customerPhone?: string;
  paymentMethod?: PaymentMethod;
  discount?: number;
  taxRate?: number;
  confidence: number;
  detectedLanguage: string;
}
