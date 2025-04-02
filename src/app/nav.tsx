"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import hamicon from "../../public/images/hamicon.svg";
import logo from "../../public/images/logod.png";
import ContactPage from "./contact";
import { useContactContext } from "./context/contact-context";

interface Vertical {
  _id: string;
  name: string;
}

export default function Nav() {
  const { open, toggleContact } = useContactContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [verticals, setVerticals] = useState<Vertical[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVerticalsOpen, setIsVerticalsOpen] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/category`,
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setVerticals(data.allCategory || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch categories",
        );
        console.error("Error fetching categories:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector("nav");
      if (isMenuOpen && nav && !nav.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }

      // Don't close verticals dropdown if clicking within it
      const verticalsMenu = document.querySelector(".verticals-menu");
      const verticalsButton = document.querySelector(".verticals-button");
      if (
        isVerticalsOpen &&
        !verticalsMenu?.contains(event.target as Node) &&
        !verticalsButton?.contains(event.target as Node)
      ) {
        setIsVerticalsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isVerticalsOpen]);
  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT" },
    { type: "verticals" },
    { href: "/pcd-franchise", label: "PCD FRANCHISE" },
    { href: "/private-label", label: "PRIVATE LABEL" },
    { href: "/custom-formulations", label: "CUSTOM FORMULATIONS" },
  ];

  return (
    <header className="fixed top-0 z-[9999] flex w-screen items-center justify-center border-b-2 border-[#97bbd16e] bg-[#97bbd12b] font-helvetica font-semibold">
      <nav className="flex w-full max-w-[1440px] items-center justify-between py-3 font-semibold text-secondary backdrop-blur-md transition-all duration-300 max-xl:px-6 lg:px-12">
        <Link href="/" className="flex w-auto items-center">
          <Image src={logo} alt="MAXNOVA" className="h-8 w-auto" priority />
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          <Image src={hamicon} alt="" className="h-6 w-6" />
        </button>
        <div
          className={`flex-1 items-center justify-between max-md:flex-col max-md:justify-start max-md:gap-6 max-md:text-center max-md:text-xl md:flex ${
            isMenuOpen
              ? "absolute left-0 right-0 top-16 flex h-fit bg-primary p-4 shadow-lg max-md:p-12"
              : "hidden"
          }`}
        >
          <ul className="flex w-full flex-col items-center gap-6 md:flex-row md:justify-center">
            {navLinks.map((link, index) => {
              if (link.type === "verticals") {
                return (
                  <li key="verticals" className="relative flex max-md:flex-col">
                    <button
                      className="verticals-button flex items-center gap-1 transition-colors hover:text-accent2"
                      onClick={() => setIsVerticalsOpen(!isVerticalsOpen)}
                      aria-expanded={isVerticalsOpen}
                    >
                      VERTICALS
                      <svg
                        className={`h-4 w-4 transform transition-transform ${isVerticalsOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {isVerticalsOpen && (
                      <ul className="verticals-menu absolute left-0 mt-[1.75rem] w-48 rounded-lg border-[#97bbd16e] bg-primary py-2 shadow-lg max-md:relative">
                        {isLoading && (
                          <li className="px-4 py-2 text-gray-500">
                            Loading...
                          </li>
                        )}
                        {error && (
                          <li className="px-4 py-2 text-red-500">
                            Error loading verticals
                          </li>
                        )}
                        {!isLoading &&
                          !error &&
                          verticals.map((vertical) => (
                            <li key={vertical._id}>
                              <Link
                                href={`/verticals/${vertical._id}`}
                                onClick={() => {
                                  setIsVerticalsOpen(false);
                                  setIsMenuOpen(false);
                                }}
                                className="block px-4 py-2 transition-colors hover:bg-accent1"
                              >
                                {vertical.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <Link
                    href={link.href!}
                    onClick={() => setIsMenuOpen(false)}
                    className="transition-colors hover:text-accent2"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            onClick={toggleContact}
            className="w-fit text-nowrap rounded-full bg-accent2 px-4 py-3 text-min font-semibold text-primary transition-colors hover:bg-opacity-90 md:mt-0 md:w-auto"
          >
            Contact Us
          </button>
        </div>
      </nav>

      {open && <ContactPage className="" onClick={toggleContact} />}
    </header>
  );
}
