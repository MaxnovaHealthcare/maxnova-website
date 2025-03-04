import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { Suspense } from "react";
import Nav from "./nav";
import Footer from "./footer";
import Image from "next/image";
import {
  ContactContextProvider,
  useContactContext,
} from "./context/contact-context";
import Link from "next/link";
import ContactPage from "./contact";
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
        className={`font-helvetica ${inter.className} flex max-w-[1440px] flex-col items-center justify-center selection:bg-accent1`}
      >
        <ContactContextProvider>
          <Nav />
          <Link
            href={`https://wa.me/+917082210621`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-10 right-10 z-50 flex h-16 w-16 items-center justify-center"
          >
            <Image
              src={whastapp}
              alt="whastapp"
              fill
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
