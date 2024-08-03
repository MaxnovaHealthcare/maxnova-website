"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ContactPage from "./contact";
import logo from "../../public/images/logowhite.png";

export default function Nav() {
  const [contactOpen, setContactOpen] = useState(false);

  const toggleContact = () => {
    setContactOpen((prev) => !prev);
  };

  return (
    <main className="fixed top-0 z-50 flex h-fit w-screen items-center justify-center">
      <nav className="bg-seco z-[4] mt-4 flex h-fit w-11/12 items-center justify-between gap-6 rounded-full py-1 md:px-12">
        <div className="flex h-full w-1/4 items-center justify-start gap-2 py-2 font-humane font-semibold">
          <Link href="/">
            <Image src={logo} alt="MAXNOVA" className="h-7 w-auto" />
          </Link>
        </div>
        <motion.div className="flex w-1/2 items-center justify-around text-min font-medium">
          <motion.span>
            <Link href="/about">ABOUT</Link>
          </motion.span>
          <motion.span>
            <Link href="/pcd-franchise">PCD FRANCHISE</Link>
          </motion.span>
          <motion.span>
            <Link href="/private-label">PRIVATE LABEL</Link>
          </motion.span>
          <motion.span>
            <Link href="/custom-formulations">CUSTOM FORMULATIONS</Link>
          </motion.span>
        </motion.div>
        <div className="flex h-fit w-1/4 items-center justify-end py-2">
          <span
            onClick={toggleContact}
            className="flex h-fit w-fit items-center justify-center rounded-3xl"
          >
            <Link className="bg-prim rounded-full px-4 py-2 text-min" href="#">
              Contact Us
            </Link>
          </span>
        </div>
      </nav>
      <ContactPage
        className={contactOpen ? "block" : "hidden"}
        onClick={toggleContact}
      />
    </main>
  );
}
