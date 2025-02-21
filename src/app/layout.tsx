import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { Suspense } from "react";
import Nav from "./nav";
import Footer from "./footer";
import {
  ContactContextProvider,
  useContactContext,
} from "./context/contact-context";
import ContactPage from "./contact";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maxnova Healthcare",
  description: "Maxnova Healthcare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex items-center justify-center">
      <body
        className={`font-helvetica ${inter.className} flex max-w-[1440px] flex-col items-center justify-center selection:bg-accent1`}
      >
        <ContactContextProvider>
          <Nav />
          {children}
          <Footer />
        </ContactContextProvider>
      </body>
    </html>
  );
}
