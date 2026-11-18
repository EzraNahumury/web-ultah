import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Caveat } from "next/font/google";
import "./globals.css";
import birthday from "@/data/birthday";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `For ${birthday.recipientName} — A Little Universe`,
  description:
    "A personal, handcrafted birthday experience, made with love for someone special.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#241613",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${manrope.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
