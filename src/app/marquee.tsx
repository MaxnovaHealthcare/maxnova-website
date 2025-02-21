"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
}

function MarqueeEffect({
  children,
  direction = "left",
  speed = 10,
}: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const [totalChildren, setTotalChildren] = useState(1);
  const [childWidth, setChildWidth] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const updateDimensions = useCallback(() => {
    if (containerRef.current && childRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const singleChildWidth = childRef.current.offsetWidth;

      if (singleChildWidth > 0) {
        setChildWidth(singleChildWidth);
        setTotalChildren(Math.ceil(containerWidth / singleChildWidth) + 4);
      }
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  const moveDistance = childWidth * (totalChildren - 2);
  const animationDuration = moveDistance / (speed * 10);

  useEffect(() => {
    if (!isHovered) {
      const controls = animate(
        x,
        direction === "right" ? [-moveDistance, 0] : [0, -moveDistance],
        {
          ease: "linear",
          duration: animationDuration,
          repeat: Infinity,
          repeatType: "loop",
        },
      );

      return controls.stop;
    }
  }, [isHovered, x, moveDistance, animationDuration, direction]);

  return (
    <div
      ref={containerRef}
      className="m-0 flex h-fit w-full overflow-hidden whitespace-nowrap p-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex h-fit w-fit flex-nowrap justify-start whitespace-nowrap"
        style={{ x }}
      >
        {Array.from({ length: totalChildren }, (_, i) =>
          React.Children.map(children, (child, index) => (
            <div
              key={`${i}-${index}`}
              ref={i === 0 && index === 0 ? childRef : undefined}
              className="flex-shrink-0 px-[12px]"
            >
              {child}
            </div>
          )),
        )}
      </motion.div>
    </div>
  );
}

export default MarqueeEffect;
