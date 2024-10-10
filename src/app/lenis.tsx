"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

interface LenisScrollrProps {
  children: React.ReactNode;
}

export default function LenisScroll({ children }: LenisScrollrProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: function (t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      smoothWheel: true,
      autoResize: true,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
