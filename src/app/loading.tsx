"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function PageLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const preloadImages = async () => {
      const imageElements = document.querySelectorAll("img");
      const imagePromises = Array.from(imageElements).map((img) => {
        if (!img.complete) {
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        }
        return Promise.resolve();
      });
      await Promise.all(imagePromises);
      setIsLoading(false);
    };
    preloadImages();
    const minLoadTime = setTimeout(() => {
      setAnimationCompleted(true);
    }, 5000);

    return () => clearTimeout(minLoadTime);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const minLoadTime = setTimeout(() => {
      setAnimationCompleted(true);
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(minLoadTime);
  }, [pathname]);

  return isLoading || !animationCompleted ? <Loading /> : children;
}
const loadingTexts = [
  "Picking Formulations...",
  "Starting Manufacturing...",
  "Printing Labels...",
  "Finalizing Product...",
];

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export function Loading() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000); // Each text stays for 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-accent1 text-center font-humane text-6xl text-primary"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        key={currentTextIndex}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.75 }}
        className="absolute flex gap-1 text-center font-humane text-9xl uppercase text-primary"
      >
        {loadingTexts[currentTextIndex].split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={i}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
