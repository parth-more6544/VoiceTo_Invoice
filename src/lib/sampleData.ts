import { CustomerRecord, InventoryItem, Invoice } from './types';

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1001',
    invoiceNumber: 'INV-2026-001',
    date: '2026-09-12',
    time: '18:45',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    items: [
      { id: 'i1', name: 'Samosa', quantity: 2, unit: 'pcs', unitPrice: 15, total: 30, category: 'Snacks' },
      { id: 'i2', name: 'Special Masala Chai', quantity: 1, unit: 'cup', unitPrice: 10, total: 10, category: 'Beverages' }
    ],
    subtotal: 40,
    discount: 0,
    taxRate: 0,
    taxAmount: 0,
    totalAmount: 40,
    paymentMethod: 'UPI',
    status: 'Paid',
    voiceTranscript: '2 samosa at 15 rupees and 1 chai for 10 rupees',
    notes: 'Paid via PhonePe'
  },
  {
    id: 'inv-1002',
    invoiceNumber: 'INV-2026-002',
    date: '2026-09-12',
    time: '17:20',
    customerName: 'Gupta Kirana Store',
    customerPhone: '+91 98234 56789',
    items: [
      { id: 'i3', name: 'Basmati Rice (Premium)', quantity: 5, unit: 'kg', unitPrice: 85, total: 425, category: 'Groceries' },
      { id: 'i4', name: 'Fortune Mustard Oil (1L)', quantity: 2, unit: 'bottle', unitPrice: 160, total: 320, category: 'Groceries' },
      { id: 'i5', name: 'Tata Salt (1kg)', quantity: 3, unit: 'pkt', unitPrice: 28, total: 84, category: 'Groceries' }
    ],
    subtotal: 829,
    discount: 29,
    taxRate: 5,
    taxAmount: 40,
    totalAmount: 840,
    paymentMethod: 'Cash',
    status: 'Paid',
    voiceTranscript: '5 kilo basmati rice 85 rupaye, 2 bottle mustard oil 160 each, 3 packet salt 28 rs, discount 29 rupees',
    notes: 'Regular customer discount applied'
  },
  {
    id: 'inv-1003',
    invoiceNumber: 'INV-2026-003',
    date: '2026-09-12',
    time: '16:05',
    customerName: 'Ramesh Verma',
    customerPhone: '+91 97123 45678',
    items: [
      { id: 'i6', name: 'UltraTech Cement (50kg)', quantity: 10, unit: 'bag', unitPrice: 380, total: 3800, category: 'Building Materials' },
      { id: 'i7', name: 'TMT Steel Rods (10mm)', quantity: 4, unit: 'pcs', unitPrice: 550, total: 2200, category: 'Building Materials' }
    ],
    subtotal: 6000,
    discount: 0,
    taxRate: 18,
    taxAmount: 1080,
    totalAmount: 7080,
    paymentMethod: 'Credit / Udhaar',
    status: 'Pending',
    voiceTranscript: '10 bags UltraTech cement 380 rupees, 4 pieces TMT rod 550 rupees, GST 18 percent for Ramesh Verma on Udhaar',
    notes: 'Due in 7 days'
  },
  {
    id: 'inv-1004',
    invoiceNumber: 'INV-2026-004',
    date: '2026-09-12',
    time: '14:30',
    customerName: 'Pooja Agarwal',
    customerPhone: '+91 96543 21098',
    items: [
      { id: 'i8', name: 'Cotton Kurti (Medium)', quantity: 2, unit: 'pcs', unitPrice: 650, total: 1300, category: 'Apparel' },
      { id: 'i9', name: 'Embroidered Dupatta', quantity: 1, unit: 'pcs', unitPrice: 350, total: 350, category: 'Apparel' }
    ],
    subtotal: 1650,
    discount: 150,
    taxRate: 5,
    taxAmount: 75,
    totalAmount: 1575,
    paymentMethod: 'UPI',
    status: 'Paid',
    voiceTranscript: '2 cotton kurti at 650 rs and 1 dupatta for 350 rs, give 150 discount for Pooja',
    notes: 'GPay payment received'
  },
  {
    id: 'inv-1005',
    invoiceNumber: 'INV-2026-005',
    date: '2026-09-11',
    time: '19:10',
    customerName: 'Amit Patel',
    customerPhone: '+91 95432 10987',
    items: [
      { id: 'i10', name: 'Amul Butter 500g', quantity: 2, unit: 'pkt', unitPrice: 275, total: 550, category: 'Dairy' },
      { id: 'i11', name: 'Brown Bread', quantity: 2, unit: 'pkt', unitPrice: 45, total: 90, category: 'Bakery' },
      { id: 'i12', name: 'Farm Fresh Eggs (Tray)', quantity: 1, unit: 'box', unitPrice: 190, total: 190, category: 'Dairy' }
    ],
    subtotal: 830,
    discount: 0,
    taxRate: 0,
    taxAmount: 0,
    totalAmount: 830,
    paymentMethod: 'Card',
    status: 'Paid',
    voiceTranscript: '2 packet Amul butter 275, 2 bread 45 rs, 1 tray eggs 190 rupees',
    notes: 'Swiped on POS'
  }
];

export const INITIAL_CUSTOMERS: CustomerRecord[] = [
  {
    id: 'c1',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    totalPurchases: 1450,
    outstandingBalance: 0,
    lastTransactionDate: '2026-09-12',
    status: 'Good'
  },
  {
    id: 'c2',
    name: 'Ramesh Verma',
    phone: '+91 97123 45678',
    totalPurchases: 18450,
    outstandingBalance: 7080,
    lastTransactionDate: '2026-09-12',
    status: 'Reminder Needed'
  },
  {
    id: 'c3',
    name: 'Gupta Kirana Store',
    phone: '+91 98234 56789',
    totalPurchases: 42100,
    outstandingBalance: 0,
    lastTransactionDate: '2026-09-12',
    status: 'Good'
  },
  {
    id: 'c4',
    name: 'Pooja Agarwal',
    phone: '+91 96543 21098',
    totalPurchases: 8900,
    outstandingBalance: 0,
    lastTransactionDate: '2026-09-12',
    status: 'Good'
  },
  {
    id: 'c5',
    name: 'Mukesh Choudhary',
    phone: '+91 93210 98765',
    totalPurchases: 9400,
    outstandingBalance: 3250,
    lastTransactionDate: '2026-09-04',
    status: 'Overdue'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'inv-item-1', name: 'Samosa', category: 'Snacks', currentStock: 48, unit: 'pcs', pricePerUnit: 15, lowStockThreshold: 15, lastUpdated: '2026-09-12' },
  { id: 'inv-item-2', name: 'Special Masala Chai', category: 'Beverages', currentStock: 120, unit: 'cup', pricePerUnit: 10, lowStockThreshold: 20, lastUpdated: '2026-09-12' },
  { id: 'inv-item-3', name: 'Basmati Rice (Premium)', category: 'Groceries', currentStock: 85, unit: 'kg', pricePerUnit: 85, lowStockThreshold: 25, lastUpdated: '2026-09-12' },
  { id: 'inv-item-4', name: 'Fortune Mustard Oil (1L)', category: 'Groceries', currentStock: 18, unit: 'bottle', pricePerUnit: 160, lowStockThreshold: 10, lastUpdated: '2026-09-12' },
  { id: 'inv-item-5', name: 'Tata Salt (1kg)', category: 'Groceries', currentStock: 42, unit: 'pkt', pricePerUnit: 28, lowStockThreshold: 15, lastUpdated: '2026-09-12' },
  { id: 'inv-item-6', name: 'UltraTech Cement (50kg)', category: 'Building Materials', currentStock: 35, unit: 'bag', pricePerUnit: 380, lowStockThreshold: 10, lastUpdated: '2026-09-12' },
  { id: 'inv-item-7', name: 'Cotton Kurti (Medium)', category: 'Apparel', currentStock: 14, unit: 'pcs', pricePerUnit: 650, lowStockThreshold: 5, lastUpdated: '2026-09-12' },
  { id: 'inv-item-8', name: 'Amul Butter 500g', category: 'Dairy', currentStock: 6, unit: 'pkt', pricePerUnit: 275, lowStockThreshold: 8, lastUpdated: '2026-09-12' }
];

export const SAMPLE_VOICE_PROMPTS = [
  {
    title: 'Chai & Snacks Corner',
    tag: 'Quick POS',
    icon: '☕',
    text: '2 samosa at 15 rupees and 1 chai for 10 rupees',
    language: 'Hinglish / English'
  },
  {
    title: 'Kirana / Grocery Shop',
    tag: 'Multi-Item',
    icon: '🛒',
    text: '5 kilo basmati rice at 85 rs, 2 bottle mustard oil at 160 rs, and 3 packet salt for 28 rupees',
    language: 'Hinglish'
  },
  {
    title: 'Construction & Hardware (GST)',
    tag: 'Tax Invoice',
    icon: '🏗️',
    text: '10 bags UltraTech cement at 380 rupees and 4 pieces TMT rod for 550 rupees, GST 18 percent for Ramesh Verma on Udhaar',
    language: 'Hinglish'
  },
  {
    title: 'Garments & Boutique',
    tag: 'With Discount',
    icon: '👗',
    text: '2 cotton kurti at 650 rupees and 1 embroidered dupatta for 350 rupees, give 150 discount for Pooja',
    language: 'English'
  },
  {
    title: 'Dairy & Daily Needs',
    tag: 'Fast Checkout',
    icon: '🥛',
    text: '2 packet Amul butter at 275 rupees, 2 brown bread for 45 rupees, and 1 tray eggs for 190 rupees',
    language: 'English / Hindi'
  }
];
