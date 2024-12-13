"use client";

import React, { useState, useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

interface faqProps {
  faqs: any[];
}
export default function FaqSection({ faqs }: faqProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={ref}
      className="flex min-h-screen w-full flex-col justify-start gap-12 p-12 py-36 max-md:m-0 max-md:h-fit max-md:flex-col max-md:px-0 max-md:py-24 lg:px-10"
    >
      <motion.h1
        style={{ y: y1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5, ease: "linear" }}
        className="w-fit font-humane font-bold uppercase max-md:text-8xl lg:text-max"
      >
        Got questions?
        <br />
        We have answers.
      </motion.h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {faqs.map((item, i) => (
          <QuestionBox key={i} question={item.ques} answer={item.ans} />
        ))}
      </div>
    </section>
  );
}

interface QuestionBoxProps {
  question: string;
  answer: string;
}

const QuestionBox = ({ question, answer }: QuestionBoxProps) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div
      onClick={toggleOpen}
      className={`flex h-fit w-full cursor-pointer flex-col gap-2 rounded-md border border-secondary p-4`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-subhead">{question}</h2>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full border border-secondary transition-transform duration-300`}
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" /> {/* Minus Line */}
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" /> {/* Vertical Line */}
              <line x1="5" y1="12" x2="19" y2="12" /> {/* Horizontal Line */}
            </svg>
          )}
        </div>
      </div>
      <motion.div
        initial={false}
        animate={{
          height: open ? contentRef.current?.scrollHeight : 0, // Use scrollHeight for accurate measurement
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div ref={contentRef}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: 0.3, delay: open ? 0.1 : 0 }}
            className="text-min font-light text-gray-700"
          >
            {answer}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};
