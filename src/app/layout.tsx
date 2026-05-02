import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HashScrollProvider from "@/components/shared/HashScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sankardev Sishu Vidya Niketan | Mathurapur",
    template: "%s | Sankardev Sishu Vidya Niketan",
  },
  description:
    "A premier SEBA-affiliated institution in Mathurapur, Charaideo, Assam. Established at 2000 with 100% board pass record.",
  keywords: [
    "Sankardev Sishu Vidya Niketan",
    "Mathurapur school",
    "SEBA school Assam",
    "best school Mathurapur",
    "admission 2026-27",
  ],
  openGraph: {
    title: "Sankardev Sishu Vidya Niketan | Mathurapur",
    description:
      "Established at 2000.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <HashScrollProvider />
        {children}
      </body>
    </html>
  );
}
