"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ContactPage from "./contact";
import logo from "../../public/images/logowhite.png";

export default function Nav() {
  let [isOpen, setOpen] = useState(false);
  const HandleOnClick = () => {
    setOpen(!isOpen);
  };
  return (
    <main className="fixed top-0 flex h-fit w-screen items-center justify-center">
      <nav className="bg-seco z-50 mt-4 flex h-fit w-10/12 items-center justify-between gap-6 rounded-full py-1 md:px-12">
        <Link
          href="/"
          className="flex h-full w-1/6 items-center justify-start gap-2 py-2 font-humane font-semibold"
        >
          {logo ? (
            <Image src={logo} alt="MAXNOVA" className="h-7 w-auto" />
          ) : (
            <span>MAXNOVA HEALTHCARE</span>
          )}
        </Link>
        <motion.div className="flex w-4/6 items-center justify-around text-min font-medium">
          <motion.span>
            <Link href="/about">ABOUT</Link>
          </motion.span>
          <motion.span>
            <Link href="/pcd">PCD FRANCHISE</Link>
          </motion.span>
          <motion.span>
            <Link href="/private-label">PRIVATE LABEL</Link>
          </motion.span>
          <motion.span>
            <Link href="/custom-form">CUSTOM FORMULATIONS</Link>
          </motion.span>
        </motion.div>
        <div className="flex h-fit w-1/6 items-center justify-end py-2">
          <span
            onClick={HandleOnClick}
            className="flex h-fit w-fit items-center justify-center rounded-3xl"
          >
            <Link className={`bg-prim rounded-full px-4 py-2 text-min`} href="">
              Contact Us
            </Link>
          </span>
        </div>
      </nav>
      {isOpen ? (
        <ContactPage className="block" />
      ) : (
        <ContactPage className="hidden" />
      )}
    </main>
  );
}
