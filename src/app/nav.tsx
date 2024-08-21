"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import hamicon from "../../public/images/hamicon.png";
import ContactPage from "./contact";
import logo from "../../public/images/logowhite.png";
import { useContactContext } from "./context/contact-context";

export default function Nav() {
  const { open, toggleContact } = useContactContext();
  const [isopen, setisopen] = useState(false);
  const togglemenu = () => {
    setisopen(!isopen);
  };
  const classname = isopen ? "flex" : "hidden";
  return (
    <main className="fixed top-0 z-50 flex h-fit w-screen items-center justify-center">
      <nav className="bg-seco z-[4] mt-2 flex h-fit w-11/12 items-center justify-between gap-6 rounded-full py-2 max-xl:w-[95%] max-xl:px-6 max-md:mt-2 max-md:flex-wrap max-md:rounded-2xl lg:px-12">
        <Link
          href="/"
          className="flex h-fit w-1/4 items-center justify-start gap-2 font-humane font-semibold max-xl:w-1/5 max-md:w-1/3"
        >
          <Image src={logo} alt="MAXNOVA" className="h-8 w-auto" />
        </Link>
        <div
          onClick={togglemenu}
          className="hidden h-full items-center justify-end max-md:flex max-md:w-1/3"
        >
          <Image src={hamicon} alt="MAXNOVA" className="h-8 w-auto" />
        </div>
        <div
          className={`flex w-3/4 items-center justify-between max-xl:w-full max-md:flex-col max-md:gap-8 max-md:${classname}`}
        >
          <div className="flex w-full items-end justify-around gap-4 text-center text-min font-medium max-xl:gap-2 max-xl:text-xs max-md:flex-col max-md:justify-between max-md:gap-8 max-md:text-right max-md:text-subhead">
            <span>
              <Link onClick={togglemenu} href="/about">
                ABOUT
              </Link>
            </span>
            <span>
              <Link onClick={togglemenu} href="/pcd-franchise">
                PCD FRANCHISE
              </Link>
            </span>
            <span>
              <Link onClick={togglemenu} href="/private-label">
                PRIVATE LABEL
              </Link>
            </span>
            <span>
              <Link onClick={togglemenu} href="/custom-formulations">
                CUSTOM FORMULATIONS
              </Link>
            </span>
          </div>
          <div className="flex h-fit w-2/5 items-center justify-end max-md:mb-4 max-md:w-full">
            <span
              onClick={toggleContact}
              className="flex h-fit w-fit items-center justify-center rounded-3xl"
            >
              <Link
                onClick={togglemenu}
                className="bg-prim rounded-full px-4 py-3 text-min font-semibold max-md:py-3"
                href="#"
              >
                Contact Us
              </Link>
            </span>
          </div>
        </div>
      </nav>
      <ContactPage
        className={open ? "block" : "hidden"}
        onClick={toggleContact}
      />
    </main>
  );
}
