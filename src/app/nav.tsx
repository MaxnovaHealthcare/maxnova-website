"use client";

import React from "react";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="w-full h-fit px-12 py-4">
      <ul className="flex justify-between items-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}