import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "Team Dromos - Hyperloop Technology",
  description: "Young engineers and scientists working on Hyperloop technology - the future of high-speed transportation. 2nd place Global Hyperloop Competition 2025.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rajdhani.variable} antialiased`}
        style={{ fontFamily: 'var(--font-rajdhani), sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
