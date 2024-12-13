import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
}

function MarqueeEffect({ children }: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const [totalChildren, setTotalChildren] = useState(1);
  const [childWidth, setChildWidth] = useState(0);
  const updateDimensions = useCallback(() => {
    if (containerRef.current && childRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const singleChildWidth = childRef.current.offsetWidth;

      setChildWidth(singleChildWidth);
      setTotalChildren(Math.ceil(containerWidth / singleChildWidth) + 2);
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  return (
    <div className="m-0 flex w-screen overflow-hidden whitespace-nowrap p-0">
      <motion.div
        ref={containerRef}
        className="flex w-fit flex-nowrap justify-start whitespace-nowrap"
        animate={{
          x: [0, -childWidth * totalChildren],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 10,
        }}
        initial={{ x: 0 }}
      >
        {Array.from({ length: totalChildren }, (_, i) =>
          React.Children.map(children, (child, index) => (
            <div
              key={`${i}-${index}`}
              ref={i === 0 && index === 0 ? childRef : undefined}
              className="flex-shrink-0 gap-[24px] px-[12px]"
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
