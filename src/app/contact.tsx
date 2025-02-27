"use client";

import React, { useState } from "react";
import Link from "next/link";
import CTAButtons from "./buttons";
import { useContactContext } from "./context/contact-context";
import { motion } from "framer-motion";

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
    console.log(formData);
    try {
      const response = await fetch("./send-whatsapp-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);
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
    <main
      className={`absolute top-0 z-[3] h-screen w-full bg-accent2 bg-opacity-50 p-20 pb-16 pt-24 backdrop-blur-md max-md:p-2 max-md:pt-24 ${className}`}
    >
      <motion.section
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex h-full w-full flex-row-reverse items-center justify-between gap-32 rounded-3xl bg-accent2 p-16 py-24 text-primary max-md:h-fit max-md:flex-col-reverse max-md:gap-12 max-md:overflow-visible max-md:p-4 max-md:pt-8"
      >
        <span
          onClick={onClick}
          className="absolute top-12 flex h-10 w-10 cursor-pointer items-center justify-center rounded-3xl text-xl font-light max-md:right-4 max-md:top-4 lg:left-12"
        >
          ←
        </span>
        <div className="flex h-full w-[35%] flex-col items-start justify-center gap-6 max-md:hidden">
          <div className="flex h-full w-full flex-col gap-4">
            <h1 className="text-min font-semibold">Contact Us</h1>
            <h1 className="font-humane font-bold text-primary max-md:text-8xl lg:text-max">
              WHERE DO WE START?
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
        <div className="flex h-full w-[65%] flex-col items-start justify-start gap-8 max-md:w-full max-md:gap-4">
          <div className="text-para font-normal">
            {data
              ? `${data.company_name} > ${data.category_name} > ${data.name}`
              : `General Form`}
          </div>
          <h1 className="text-subhead font-semibold">
            {`Let us know why you're getting in touch.`}
          </h1>
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
              <CTAButtons text="Submit" cta="#" />
            </div>
          </form>
        </div>
      </motion.section>
    </main>
  );
}
