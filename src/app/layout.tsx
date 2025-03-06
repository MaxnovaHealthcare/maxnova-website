import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Nav from "./nav";
import Footer from "./footer";
import Image from "next/image";
import HeroSection from "./(home_components)/hero.jsx";
import {
  ContactContextProvider,
  useContactContext,
} from "./context/contact-context";
import Link from "next/link";
import whastapp from "../../public/images/whastappicon.svg";

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
        className={`font-helvetica ${inter.className} flex w-screen min-w-[320px] max-w-[1440px] flex-col items-center justify-center overflow-x-hidden selection:bg-accent1`}
      >
        <ContactContextProvider>
          <Nav />
          <Link
            href="https://wa.me/+917082210621"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-10 right-10 z-50 flex h-16 w-16 items-center justify-center"
          >
            <Image
              src={whastapp}
              alt="whastapp"
              fill
              quality={100}
              priority
              className="h-full w-full"
            />
          </Link>
          {children}
          <Footer />
        </ContactContextProvider>
      </body>
    </html>
  );
}
