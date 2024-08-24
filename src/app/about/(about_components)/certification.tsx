"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Certificate {
  image: string;
  image_alt: string;
  text: string;
}

async function getCertData(): Promise<Certificate[]> {
  const res = await fetch("http://localhost:4000/api/utils/get-certificate");
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json();
}

export default function Certification() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const data = await getCertData();
        setCertificates(data);
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchCertificates();
  }, []);

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center gap-6 p-12 px-4 max-md:px-0">
      <div className="flex w-1/2 flex-col items-center justify-center gap-4 max-md:w-full">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5, ease: "linear" }}
          className="text-center font-humane font-bold max-md:text-8xl lg:text-max"
        >
          YOU CAN TRUST ON US WE ARE AUTHENTIC
        </motion.h1>
      </div>
      {error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <div className="grid h-full grid-cols-2 grid-rows-subgrid gap-24 max-md:grid-cols-1">
          {certificates.map((certificate, index) => (
            <CertificateCard key={index} certificate={certificate} />
          ))}
        </div>
      )}
    </section>
  );
}

function CertificateCard({ certificate }: { certificate: Certificate }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex h-full w-full flex-col items-center justify-center gap-6"
    >
      <div className="relative flex h-[40rem] w-[27.5rem] items-center justify-center overflow-hidden rounded-3xl border bg-accent1 max-md:h-[65vh] max-md:w-full">
        <Image
          src={certificate.image}
          alt={certificate.image_alt}
          fill
          className="h-full w-full overflow-hidden rounded-3xl object-cover"
        />
      </div>
      <h1 className="w-4/5 text-center text-head font-semibold">
        {certificate.text}
      </h1>
    </motion.div>
  );
}
