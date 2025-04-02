"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Certificate {
  id: string;
  image: string;
  image_alt: string;
  text: string;
  desc: string;
}

const useCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/utils/get-certificate`,
        );
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        setCertificates(await res.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { certificates, error, loading };
};

const LoadingState = () => (
  <div className="flex h-[80vh] w-full items-center justify-center">
    <p className="text-para">Loading certificates...</p>
  </div>
);

const ErrorState = ({ error }: { error: string }) => (
  <div className="flex h-[80vh] w-full items-center justify-center">
    <p className="text-para text-red-500">Error: {error}</p>
  </div>
);

const EmptyState = () => (
  <div className="flex h-[80vh] w-full items-center justify-center">
    <p className="text-para">No certificates available</p>
  </div>
);

const CertificateCard = ({
  certificate,
  isActive,
  onClick,
}: {
  certificate: Certificate;
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
}) => (
  <motion.div
    className="relative flex h-fit w-fit cursor-pointer items-center justify-center"
    onClick={(e: React.MouseEvent) => {
      e.preventDefault();
      onClick(e);
    }}
    role="button"
    tabIndex={0}
  >
    <motion.div
      className={`aspect-[1/1.414] h-auto w-[20rem] overflow-hidden rounded-2xl border filter transition-transform duration-500 max-md:w-[16rem] ${isActive ? "scale-100" : "scale-90"} `}
    >
      <Image
        src={certificate.image}
        alt={certificate.image_alt}
        fill
        quality={100}
        className={`h-full w-full rounded-2xl object-cover ${isActive ? "z-10" : "z-0 blur-[2px]"}`}
        loading="lazy"
      />
    </motion.div>
  </motion.div>
);

export default function Certification() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="flex w-full flex-col items-center justify-center gap-12 overflow-hidden max-md:px-0"
    >
      <Certified />
    </section>
  );
}

const Certified = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const { certificates, error, loading } = useCertificates();

  const handleCardClick = useCallback((index: number) => {
    setCurrentIndex(index);
    if (rightImageRef.current) {
      const container = rightImageRef.current;
      const cardWidth = container.children[index]?.clientWidth || 0;
      const scrollPosition =
        index * cardWidth - container.clientWidth / 2 + cardWidth / 2;
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const handleNext = () => {
    if (certificates.length > 0) {
      handleCardClick((currentIndex + 1) % certificates.length);
    }
  };

  const handlePrev = () => {
    if (certificates.length > 0) {
      handleCardClick(
        (currentIndex - 1 + certificates.length) % certificates.length,
      );
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (certificates.length === 0) return <EmptyState />;

  return (
    <main className="flex w-full flex-col items-center justify-center gap-6 overflow-hidden bg-primary py-24 max-md:py-2 md:flex-row">
      <div className="flex h-[30rem] w-full flex-col justify-between gap-6 max-md:h-fit max-md:w-full max-md:py-4 md:w-[50%]">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="font-humane font-bold uppercase text-accent2 max-md:text-8xl lg:text-max"
        >
          Your Trusted Partner
        </motion.h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={certificates[currentIndex]?.id}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex w-full flex-col gap-2 max-md:w-full md:gap-4"
          >
            <h2 className="text-pretty text-subhead font-semibold max-md:w-full max-md:text-center max-md:text-xl">
              {certificates[currentIndex]?.text}
            </h2>
            <p className="text-pretty text-para font-normal max-md:w-full max-md:text-center max-md:text-sm">
              {certificates[currentIndex]?.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative flex h-fit w-full flex-col items-center justify-center overflow-x-hidden">
        <div
          className="scrollbar-none relative flex h-fit w-full overflow-x-auto max-md:w-screen max-md:p-4 md:p-12"
          ref={rightImageRef}
          aria-label="Certificate Gallery"
          style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
        >
          {certificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.id || index}
              certificate={certificate}
              isActive={currentIndex === index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
        <div className="flex w-fit gap-4">
          <button
            onClick={handlePrev}
            className="h-fit w-fit rounded-full bg-accent2 p-4 text-primary"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="h-fit w-fit rounded-full bg-accent2 p-4 text-primary"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </main>
  );
};
