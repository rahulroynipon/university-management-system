"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import useMobile from "@/hook/useMobile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isHidden = pathname.startsWith("/dashboard");
  const isMobile = useMobile();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position={isMobile ? "top-center" : "bottom-right"}
          duration={3000}
          closeButton
          richColors
          gutter={8}
        />
        {!isHidden ? <Header /> : null}
        <main>{children}</main>
        {!isHidden ? <Footer /> : null}
      </body>
    </html>
  );
}
