"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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

export default function DelayedLoading({ children }: { children?: ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setAnimationComplete(false);
    setCurrentTextIndex(0);
  }, [pathname]);

  useEffect(() => {
    if (isLoading && currentTextIndex < loadingTexts.length - 1) {
      const timeoutId = setTimeout(() => {
        setCurrentTextIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timeoutId);
    } else if (isLoading && currentTextIndex === loadingTexts.length - 1) {
      setTimeout(() => {
        setAnimationComplete(true);
        setIsLoading(false);
      }, 150);
    }
  }, [isLoading, currentTextIndex]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading || !animationComplete ? (
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
        ) : (
          children
        )}
      </AnimatePresence>
    </>
  );
}
