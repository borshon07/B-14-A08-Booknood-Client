import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import ScrollTopButton from "@/components/ScrollTopButton";
import Preloader from "@/components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookNook",
  description: "A small online library. Add a book, borrow a book, return a book.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <Preloader />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ScrollTopButton />
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}