"use client";

import React, { useState } from "react";
import Link from "next/link";
import CTAButtons from "./buttons";
import { useContactContext } from "./context/contact-context";
import { motion, AnimatePresence } from "framer-motion";

interface ContactPageProps {
  className?: string;
  onClick?: () => void;
  address?: string;
  numb1?: string;
  numb2?: string;
  mail?: string;
  isGeneral?: boolean;
}

const formFields = [
  { label: "Full Name", type: "text", placeholder: "Enter Your Name" },
  { label: "Phone no.", type: "number", placeholder: "Enter Your Phone no." },
  { label: "Email", type: "email", placeholder: "Your Email" },
  {
    label: "Message",
    type: "text",
    placeholder: "Tell us about your query",
    isTextArea: true,
  },
];

const contactInfo = [
  {
    label: "Where",
    content: (address: string) =>
      `MAXNOVA HEALTHCARE Ambala Chandigarh Expy, Baldev Nagar, Ambala City, Haryana 134007${address}`,
    link: "https://maps.app.goo.gl/NpL5ffHfyz8eXX1K8",
  },
  {
    label: "Phone no.",
    content: (numb1: string, numb2: string) =>
      `+91 9034061629${numb1} \n +91 9728461626${numb2}`,
  },
  {
    label: "Mail to:",
    content: (mail: string) => `gm@maxnovahealthcare.com${mail}`,
    link: (mail: string) => `mailto:${mail}`,
  },
];

export default function ContactPage(props: ContactPageProps) {
  const {
    className,
    onClick,
    address = "",
    numb1 = "",
    numb2 = "",
    mail = "",
  } = props;

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const { data } = useContactContext();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    e.preventDefault();
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("./send-whatsapp-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Your message was sent successfully!");
      } else {
        alert("There was an issue sending your message.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed left-0 top-0 z-[50] flex h-full w-full items-center justify-center overflow-hidden bg-accent1/20 bg-fixed px-16 pb-2 pt-[5.25rem] text-primary filter backdrop-blur max-md:p-2 max-md:px-2 max-md:pt-2"
        onClick={onclick}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative flex h-full gap-12 w-full overflow-x-hidden overflow-y-visible rounded-3xl bg-accent2 p-16 max-md:mt-32 max-md:flex-col max-md:gap-16 max-md:p-2 max-md:pb-20 max-md:pt-16"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <span
            onClick={onClick}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary text-min font-bold text-primary transition-all duration-150 hover:cursor-pointer hover:bg-accent3"
          >
            ✕
          </span>
          <div className="flex h-fit w-2/5 flex-col items-start justify-center gap-6 max-md:hidden">
            <div className="flex h-full w-full flex-col gap-4">
              <h1 className="text-min font-semibold">Contact Us</h1>
              <h1 className="text-pretty font-humane font-bold uppercase text-primary max-md:text-8xl lg:text-max">
                Start Your Product Journey
              </h1>
            </div>
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex h-fit w-full flex-col items-start justify-start gap-2"
              >
                <h1 className="text-min font-semibold">{info.label}</h1>
                {info.link ? (
                  <Link
                    href={
                      typeof info.link === "function"
                        ? info.link(mail)
                        : info.link
                    }
                    target="_blank"
                    className="text-base underline underline-offset-4"
                  >
                    {info.content(address)}
                  </Link>
                ) : (
                  <p className="text-base">{info.content(numb1, numb2)}</p>
                )}
              </div>
            ))}
          </div>
          <div className="flex h-full w-3/5 flex-col items-start justify-start gap-8 max-md:w-full max-md:gap-4">
            <div className="text-para font-normal">
              {data
                ? `${data.company_name} > ${data.category_name} > ${data.name}`
                : `General Form`}
            </div>
            <h1 className="text-subhead max-md:text-xl">{`No pressure. Just real answers and a clear next step!`}</h1>
            <form
              className="col-span-2 grid w-full grid-cols-2 gap-8 max-md:grid-cols-1"
              onSubmit={handleSubmit}
            >
              {formFields.map((field) => (
                <div
                  key={field.label}
                  className="flex w-full flex-col items-start justify-start gap-2"
                >
                  <label className="text-para font-normal">{field.label}</label>
                  {field.isTextArea ? (
                    <textarea
                      name={field.label.toLowerCase().replace(" ", "")}
                      className="h-10 w-full border-b-2 border-primary bg-secondary bg-opacity-0 p-2 transition-all duration-300 focus:text-[1.2rem] focus:outline-none"
                      placeholder={field.placeholder}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      required
                      type={field.type}
                      name={field.label.toLowerCase().replace(" ", "")}
                      className="h-10 w-full border-b-2 border-primary bg-secondary bg-opacity-0 p-2 transition-all duration-300 focus:text-[1.2rem] focus:outline-none"
                      placeholder={field.placeholder}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
              <div className="flex w-full items-center justify-start gap-4">
                <Link
                  className={`h-fit w-fit rounded-full bg-accent1 px-6 py-2 text-[1.1rem] font-medium capitalize text-primary`}
                  href="#"
                >
                  Submit
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
