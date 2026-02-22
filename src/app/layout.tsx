import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "m3-ripple/ripple.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "@/components/layout/Footer";
import ScrollToTopUI from "@/components/ui/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinemania",
  description:
    "Discover and interact in a world of movies and TV shows at your fingertips! Dive into synopsis, rating and more in cinemania today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-linear-to-b from-[#1c1c1c] to-black flex flex-col min-h-screen justify-between`}
      >
        {children}
        <Footer />
        <ScrollToTopUI />
      </body>
    </html>
  );
}
