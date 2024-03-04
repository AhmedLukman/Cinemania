import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import the Font Awesome styles manually
import '@fortawesome/fontawesome-svg-core/styles.css';

// Get the configuration object
import { config } from '@fortawesome/fontawesome-svg-core';

// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinemania",
  description:
    "Discover and interact in a world of movies at your fingertips! Dive into synopsis, rating and more in cinemania today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " relative"}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
