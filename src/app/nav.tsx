"use client";

import React, { useState } from "react";
import Link from "next/link";
import CTAButtons from "./buttons";
import { motion } from "framer-motion";
import ContactPage from "./contact";

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
          className="flex w-1/6 items-center justify-start font-humane text-5xl font-bold"
        >
          logo
        </Link>
        <motion.div className="flex w-4/6 items-center justify-around gap-6 text-min font-medium">
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
        <div className="flex w-1/6 items-center justify-end">
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
