"use client";

import React from "react";

export default function Nav() {
  return (
    <nav className="w-full h-fit px-12 py-4">
      <ul className="flex justify-between items-center">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}