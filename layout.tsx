import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#b00020",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Chef | Dijital Mutfak",
  description: "Şefin Gizli Silahı",
  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Chef",
  },

  formatDetection: {
    telephone: false,
  },

  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-black min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
