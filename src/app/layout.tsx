import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 1. Zoom'u engelleyen kritik ayarlar
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#b00020", // Mobil tarayıcı çubuğu rengi
};

// 2. Uygulama meta bilgileri
export const metadata: Metadata = {
  title: "Chef",
  description: "Profesyonel yemek yapma deneyimi",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Chef",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="selection:bg-red-200">
      <body className={`${inter.className} overflow-hidden fixed inset-0 w-full h-full`}>
        {children}
      </body>
    </html>
  );
}