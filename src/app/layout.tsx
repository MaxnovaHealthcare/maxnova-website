import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { Suspense } from "react";
import Nav from "./nav";
import Footer from "./footer";
import DelayedLoading from "./loading";
import LenisScroll from "./lenis";
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
    <html lang="en">
      <LenisScroll>
        <body
          className={`font-helvetica ${inter.className} selection:bg-accent1`}
        >
          <ContactContextProvider>
            <DelayedLoading>
              <Nav />
              {children}
              <Footer />
            </DelayedLoading>
          </ContactContextProvider>
        </body>
      </LenisScroll>
    </html>
  );
}
