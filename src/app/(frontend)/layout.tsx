import React from "react";

import {
  Cormorant_Garamond,
  DM_Mono,
  Inter,
  Playfair_Display,
  Syne,
} from "next/font/google";

import "./globals.css";
import "./tokens.css";

/* Legacy pair — still owned by globals.css, which is not being refactored
   tonight. These drop out when it is. */
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "900"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
});

/* Instrument Serif was loaded here but referenced zero times in globals.css,
   so it has been removed — one fewer family and one fewer request. */

/* The new direction. See tokens.css for what each role is allowed to do. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  weight: ["500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  description: "Saha. Australasia's Consulting Partner",
  title: "saha.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      className={`${playfairDisplay.variable} ${dmMono.variable} ${cormorant.variable} ${syne.variable} ${inter.variable}`}
      lang="en"
    >
      <body style={{ margin: 0, padding: 0 }}>
        <main>{children}</main>
      </body>
    </html>
  );
}
