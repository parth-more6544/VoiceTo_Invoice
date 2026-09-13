import { InvoiceItem, ParsedVoiceResult, PaymentMethod } from './types';

// Hindi number word to digit mapping
const HINDI_NUMBERS: Record<string, number> = {
  'ek': 1, 'do': 2, 'teen': 3, 'char': 4, 'chaar': 4, 'paanch': 5, 'panch': 5,
  'chheh': 6, 'cheh': 6, 'saat': 7, 'aath': 8, 'nau': 9, 'das': 10,
  'gyarah': 11, 'barah': 12, 'terah': 13, 'chaudah': 14, 'pandrah': 15,
  'solah': 16, 'satrah': 17, 'atharah': 18, 'unnees': 19, 'bees': 20,
  'pachees': 25, 'tees': 30, 'paintees': 35, 'chalis': 40, 'pachaas': 50,
  'saath': 60, 'sattar': 70, 'assi': 80, 'nabbe': 90, 'sau': 100,
  'dedh': 1.5, 'dhai': 2.5, 'aadha': 0.5, 'adha': 0.5, 'paav': 0.25,
  'hazar': 1000, 'hazaar': 1000, 'lakh': 100000,
  // Hindi script numbers
  'एक': 1, 'दो': 2, 'तीन': 3, 'चार': 4, 'पाँच': 5, 'पांच': 5,
  'छह': 6, 'सात': 7, 'आठ': 8, 'नौ': 9, 'दस': 10,
  'पंद्रह': 15, 'बीस': 20, 'पच्चीस': 25, 'तीस': 30, 'पचास': 50, 'सौ': 100, 'हजार': 1000
};

const ENGLISH_NUMBERS: Record<string, number> = {
  'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
  'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
  'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15,
  'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19, 'twenty': 20,
  'thirty': 30, 'forty': 40, 'fifty': 50, 'sixty': 60, 'seventy': 70,
  'eighty': 80, 'ninety': 90, 'hundred': 100, 'thousand': 1000,
  'half': 0.5, 'quarter': 0.25, 'dozen': 12, 'pair': 2
};

const UNIT_SYNONYMS: Record<string, string> = {
  'kg': 'kg', 'kilo': 'kg', 'kilogram': 'kg', 'kilos': 'kg', 'किग्रा': 'kg', 'किलो': 'kg',
  'g': 'g', 'gram': 'g', 'grams': 'g', 'gm': 'g', 'ग्राम': 'g',
  'packet': 'pkt', 'packets': 'pkt', 'pkt': 'pkt', 'pack': 'pkt', 'packs': 'pkt', 'पैकेट': 'pkt',
  'plate': 'plate', 'plates': 'plate', 'प्लेट': 'plate',
  'cup': 'cup', 'cups': 'cup', 'कप': 'cup',
  'glass': 'glass', 'glasses': 'glass', 'गिलास': 'glass',
  'bottle': 'bottle', 'bottles': 'bottle', 'बोतल': 'bottle',
  'piece': 'pcs', 'pieces': 'pcs', 'pc': 'pcs', 'pcs': 'pcs', 'पीस': 'pcs', 'नग': 'pcs',
  'liter': 'L', 'liters': 'L', 'litre': 'L', 'litres': 'L', 'ltr': 'L', 'l': 'L', 'लीटर': 'L',
  'box': 'box', 'boxes': 'box', 'डिब्बा': 'box', 'बॉक्स': 'box',
  'bag': 'bag', 'bags': 'bag', 'बोरी': 'bag', 'थैला': 'bag',
  'meter': 'm', 'meters': 'm', 'metre': 'm', 'metres': 'm', 'मीटर': 'm',
  'dozen': 'dozen', 'darjan': 'dozen', 'दर्जन': 'dozen'
};

export function parseVoiceInput(text: string): ParsedVoiceResult {
  if (!text || text.trim().length === 0) {
    return {
      transcript: '',
      items: [],
      confidence: 0,
      detectedLanguage: 'English'
    };
  }

  const cleanText = text.trim();
  let workingText = cleanText.toLowerCase();

  // Detect Language
  const isHindi = /[\u0900-\u097F]/.test(cleanText) || 
    /\b(rupaye|rupay|bhai|udhar|khata|aur|ka|ki|ko|ke|samosa|chai|kilo|chawal|pani)\b/i.test(cleanText);
  const detectedLanguage = isHindi ? 'Hindi / Hinglish' : 'English';

  // 1. Extract Customer Name
  let customerName: string | undefined;
  const customerPatterns = [
    /(?:customer|for|client|grahak|to)\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)/i,
    /(?:for|to|ko|bhai)\s+([A-Z][a-zA-Z]+)(?:\s+ji|\s+bhai|\s+sir)?/i,
    /([a-zA-Z]+)(?:\s+ji|\s+bhai)\s+ko/i,
    /customer\s*:\s*([a-zA-Z\s]+)/i
  ];

  for (const pattern of customerPatterns) {
    const match = cleanText.match(pattern);
    if (match && match[1]) {
      const candidate = match[1].trim();
      if (!['cash', 'upi', 'online', 'card', 'sale', 'today', 'shop'].includes(candidate.toLowerCase())) {
        customerName = candidate.charAt(0).toUpperCase() + candidate.slice(1);
        break;
      }
    }
  }

  // 2. Extract Customer Phone
  let customerPhone: string | undefined;
  const phoneMatch = cleanText.match(/\b(?:\+91|0)?[6-9]\d{9}\b/);
  if (phoneMatch) {
    customerPhone = phoneMatch[0];
  }

  // 3. Extract Payment Method
  let paymentMethod: PaymentMethod = 'Cash';
  if (/\b(upi|gpay|google pay|phonepe|paytm|online|qr code|bhim)\b/i.test(workingText)) {
    paymentMethod = 'UPI';
  } else if (/\b(udhaar|udhar|credit|khata|baaki|baqi|ledger|later)\b/i.test(workingText)) {
    paymentMethod = 'Credit / Udhaar';
  } else if (/\b(card|debit|credit card|pos machine|swipe)\b/i.test(workingText)) {
    paymentMethod = 'Card';
  } else if (/\b(pending|unpaid|baad me)\b/i.test(workingText)) {
    paymentMethod = 'Pending';
  }

  // 4. Extract Discount
  let discount: number | undefined;
  const discountMatch = workingText.match(/(?:discount|chhoot|off|less)\s*(?:of|is|hai)?\s*(?:₹|rs\.?|rupees)?\s*(\d+(?:\.\d+)?)/i) ||
    workingText.match(/(\d+(?:\.\d+)?)\s*(?:₹|rs\.?|rupees|percent|%)?\s*(?:discount|off|less)/i);
  if (discountMatch) {
    discount = parseFloat(discountMatch[1]);
  }

  // 5. Extract Tax / GST
  let taxRate: number | undefined;
  const gstMatch = workingText.match(/(?:gst|tax)\s*(?:of|is|hai)?\s*(\d+)\s*%/i) ||
    workingText.match(/(\d+)\s*%\s*(?:gst|tax)/i);
  if (gstMatch) {
    taxRate = parseInt(gstMatch[1], 10);
  }

  // 6. Extract Items
  const items: InvoiceItem[] = [];

  // Split text by sentence/clause conjunctions: "and", "aur", ",", "+", "plus", "then", ";"
  const clauses = workingText
    .split(/\b(?:and|aur|tatha|plus|\+|,|;|\bthen\b)\b/)
    .map(c => c.trim())
    .filter(c => c.length > 2);

  for (let i = 0; i < clauses.length; i++) {
    const clause = clauses[i];
    
    // Skip if clause is purely customer or payment note
    if (clause.startsWith('for ') && customerName && clause.includes(customerName.toLowerCase())) continue;
    if (clause.includes('discount') && !clause.match(/\b(samosa|chai|tea|coffee|milk|rice|sugar|item|oil|dal)\b/)) continue;
    if (clause.includes('paid via') || clause.includes('paid by')) continue;

    // Pattern 1: "2 samosa at 15 rupees" or "5 kg sugar for 40 rs" or "1 chai 10 rupees"
    // Extract quantity (number or word), optional unit, item name, and unit price/total
    const item = parseItemClause(clause, i + 1);
    if (item) {
      items.push(item);
    }
  }

  // Fallback: If no items found from clauses, try single clause regex parser
  if (items.length === 0) {
    const fallbackItem = parseItemClause(workingText, 1);
    if (fallbackItem) {
      items.push(fallbackItem);
    }
  }

  // Calculate confidence
  const confidence = items.length > 0 ? (customerName ? 0.95 : 0.88) : 0.4;

  return {
    transcript: cleanText,
    items,
    customerName,
    customerPhone,
    paymentMethod,
    discount,
    taxRate,
    confidence,
    detectedLanguage
  };
}

function parseItemClause(clause: string, index: number): InvoiceItem | null {
  // Normalize Hindi/English numbers in clause
  let words = clause.split(/\s+/).filter(w => Boolean(w));
  if (words.length === 0) return null;

  let quantity = 1;
  let unit = 'pcs';
  let unitPrice = 0;
  let itemName = '';

  // Step 1: Detect quantity
  let qtyFound = false;
  let qtyIndex = -1;

  for (let idx = 0; idx < words.length; idx++) {
    const word = words[idx];
    const num = parseNumberWord(word);
    if (num !== null && !qtyFound) {
      quantity = num;
      qtyFound = true;
      qtyIndex = idx;
      break;
    }
  }

  // Step 2: Detect unit right after quantity or anywhere
  if (qtyIndex !== -1 && qtyIndex + 1 < words.length) {
    const nextWord = words[qtyIndex + 1];
    if (UNIT_SYNONYMS[nextWord]) {
      unit = UNIT_SYNONYMS[nextWord];
      words.splice(qtyIndex + 1, 1); // remove unit from words
    }
  }

  // Step 3: Detect price
  // Look for patterns like: "at 15", "for 10 rs", "15 rupees", "30 each", "₹40", "15 rupaye", "15 rs", "@ 20"
  const priceRegex = /(?:at|for|@|ke hisab se|costing|rate|worth)?\s*(?:₹|rs\.?|inr|rupees|rupaye|rupay)?\s*(\d+(?:\.\d+)?)\s*(?:₹|rs\.?|inr|rupees|rupaye|rupay|each|per unit|per kg|per pkt|ka|ki)?/i;
  
  // Find price in raw clause
  const priceMatch = clause.match(/(?:at|for|@|rate of|rate)?\s*(?:₹|rs\.?|rupees|rupaye)?\s*(\d+(?:\.\d+)?)\s*(?:₹|rs\.?|rupees|rupaye|each|per|\/|\bka\b|\bki\b)/i) ||
    clause.match(/(?:₹|rs\.?)\s*(\d+(?:\.\d+)?)/i) ||
    clause.match(/(\d+(?:\.\d+)?)\s*(?:rupees|rupaye|rupay|rs)/i);

  if (priceMatch) {
    unitPrice = parseFloat(priceMatch[1]);
  } else {
    // Check for trailing number as price
    for (let idx = words.length - 1; idx >= 0; idx--) {
      const num = parseNumberWord(words[idx]);
      if (num !== null && idx !== qtyIndex) {
        unitPrice = num;
        break;
      }
    }
  }

  // Step 4: Extract Item Name by filtering out numbers, price tokens, units, conjunctions
  const stopWords = new Set([
    'at', 'for', 'each', 'rupees', 'rupaye', 'rupay', 'rs', 'inr', 'of', 'and', 'aur', 'ka', 'ki', 'ke', 'ko',
    'total', 'rate', 'price', 'give', 'add', 'daalo', 'likho', 'hai', 'wala', 'wali', 'per', 'please', 'customer'
  ]);

  const nameTokens: string[] = [];
  for (let idx = 0; idx < words.length; idx++) {
    const word = words[idx];
    const cleanWord = word.replace(/[^a-zA-Z0-9\u0900-\u097F]/g, '');
    if (!cleanWord) continue;
    
    // If it's the quantity or price token, skip
    if (parseNumberWord(cleanWord) !== null) continue;
    if (UNIT_SYNONYMS[cleanWord]) continue;
    if (stopWords.has(cleanWord.toLowerCase())) continue;

    nameTokens.push(cleanWord);
  }

  itemName = nameTokens.join(' ');

  // If item name is too short or empty, provide a clean fallback
  if (!itemName || itemName.length < 2) {
    itemName = `Item #${index}`;
  } else {
    // Capitalize item name
    itemName = itemName
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  // If unit price not given, give sensible default or calculate from total
  if (unitPrice === 0) {
    unitPrice = 20; // default placeholder
  }

  const total = Math.round(quantity * unitPrice * 100) / 100;

  return {
    id: `item-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 4)}`,
    name: itemName,
    quantity,
    unit,
    unitPrice,
    total
  };
}

function parseNumberWord(word: string): number | null {
  const clean = word.toLowerCase().trim();
  
  // Direct digit
  const directNum = parseFloat(clean);
  if (!isNaN(directNum)) return directNum;

  // Hindi mapping
  if (HINDI_NUMBERS[clean] !== undefined) {
    return HINDI_NUMBERS[clean];
  }

  // English mapping
  if (ENGLISH_NUMBERS[clean] !== undefined) {
    return ENGLISH_NUMBERS[clean];
  }

  return null;
}
