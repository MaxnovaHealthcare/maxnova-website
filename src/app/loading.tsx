"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, delay, motion } from "framer-motion";

export default function PageLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();
  const firstLoad = useRef(true);

  useEffect(() => {
    document.body.classList.add("loading");

    if (firstLoad.current) {
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

        setTimeout(() => {
          setIsLoading(false);
          setAnimationCompleted(true);
          setIsInitialLoad(true);
          firstLoad.current = false;

          setTimeout(() => {
            document.body.classList.remove("loading");
          }, 300);
        }, 3000);
      };
      preloadImages();
    }
  }, []);

  useEffect(() => {
    if (!firstLoad.current) {
      document.body.classList.add("loading");
      setIsLoading(true);
      setAnimationCompleted(false);
      setIsInitialLoad(false);

      const transitionTimeout = setTimeout(() => {
        setAnimationCompleted(true);
        setIsLoading(false);

        setTimeout(() => {
          document.body.classList.remove("loading");
        }, 300);
      }, 500);

      return () => clearTimeout(transitionTimeout);
    }
  }, [pathname]);

  if (!isLoading && animationCompleted) {
    return children;
  }

  return isInitialLoad ? <Loading /> : <BlackScreen />;
}

const loadingTexts = [
  "Picking Formulations ...",
  "Starting Manufacturing ...",
  "Printing Labels ...",
  "Finalizing Products ...",
];

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.25, duration: 0.25 },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

export function Loading() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [cycleComplete, setCycleComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => {
        if (prev + 1 === loadingTexts.length) {
          setCycleComplete(true);
        }
        return (prev + 1) % loadingTexts.length;
      });
    }, 1000);

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
        className="absolute flex gap-1 text-center font-humane text-9xl font-medium uppercase text-primary max-md:text-6xl"
      >
        {loadingTexts[currentTextIndex].split(" ").map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={i}
          >
            {char}
            <br />
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

function BlackScreen() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-accent1 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </AnimatePresence>
  );
}
