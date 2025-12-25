import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LegalAI - Free Legal Advice for Everyone | 24/7 AI Legal Advisor",
  description: "Get instant legal guidance in any language. Free legal advice powered by OpenAI GPT-4o. Understand your rights, solve legal problems, and navigate the system without expensive lawyers. Available 24/7.",
  keywords: "legal advice, free legal help, AI legal advisor, legal consultation, legal guidance, legal assistance, GPT-4o, multilingual legal support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
