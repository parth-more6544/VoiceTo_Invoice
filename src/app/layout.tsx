import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Voice2Invoice (Swar-Khata) - Instant Voice to Verified Invoices & Billing',
  description: 'Convert voice speech into professional GST & retail invoices in seconds. Speak in Hindi, English, or Hinglish to generate invoices, track inventory, and manage Udhaar khata.',
  keywords: ['voice to invoice', 'swar khata', 'voice billing', 'gst invoice generator', 'kirana billing app', 'vyapar billing', 'voice pos'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF9F6] text-stone-900 antialiased min-h-screen selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
