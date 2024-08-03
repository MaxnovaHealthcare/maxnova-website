import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import React, { Suspense } from "react";
import Nav from "./nav";
import Footer from "./footer";
import Loading from "./loading";
import { ContactContextProvider, useContactContext } from "../../context/contact-context";
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
      <body className={`font-helvetica ${inter.className}`}>
        <ContactContextProvider>
          <Suspense fallback={<Loading />}>
            <Nav />
            {children}
            <Footer />
          </Suspense>
        </ContactContextProvider>
      </body>
    </html>
  );
}
