import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Görünüm alanı ayarları: Zoom engelleme ve renkler
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#b00020",
  viewportFit: "cover", // Çentikli telefonlarda tam ekran doldurma
};

export const metadata: Metadata = {
  title: "Chef | Dijital Mutfak",
  description: "Şefin Gizli Silahı",
  manifest: "/manifest.json", // Manifest bağlantısı
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Chef",
    // Startup images (opsiyonel ama şık durur)
  },
  formatDetection: {
    telephone: false, // Otomatik numara algılamayı kapatır (UI bozulmaması için)
  },
  icons: {
    apple: [
      { url: "/icon-192.png", sizes: "192x192" },
      { url: "/icon-512.png", sizes: "512x512" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="selection:bg-red-200">
      <head>
        {/* Safari'de app simgesi tıklandığında tam ekran açılması için zorunlu etiketler */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.className} overflow-hidden fixed inset-0 w-full h-full bg-black`}>
        {children}
      </body>
    </html>
  );
}