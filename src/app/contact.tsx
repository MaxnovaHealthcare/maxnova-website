"use client";

import React, { useState } from "react";
import Link from "next/link";
import CTAButtons from "./buttons";

interface ContactPageProps {
  product?: {
    company_name: string;
    category_name: string;
    name: string;
  };
  className?: string;
  onClick?: () => void;
  address?: string;
  numb1?: string;
  numb2?: string;
  mail?: string;
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
    product,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    e.preventDefault();
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <main
      className={`absolute top-0 z-[3] bg-secondary bg-opacity-35 p-20 pb-16 pt-24 backdrop-blur-md md:h-screen md:w-screen ${className}`}
    >
      <section className="bg-seco relative flex h-full w-full flex-row-reverse items-center justify-between gap-32 rounded-3xl p-16 py-28">
        <span
          onClick={onClick}
          className="absolute left-12 top-12 flex h-auto min-h-10 w-auto min-w-10 cursor-pointer items-center justify-center rounded-full border-[0.5px] border-[#f2f0ea] font-helvetica text-subhead font-light"
        >
          ←
        </span>
        <div className="flex h-full w-1/4 flex-col items-start justify-center gap-6">
          <div className="flex h-full w-full flex-col gap-4">
            <h1 className="text-min font-semibold">Contact Us</h1>
            <h1 className="font-humane text-max font-semibold">
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
        <div className="flex h-full w-3/4 flex-col items-start justify-start gap-12">
          <div className="text-para font-medium">
            {product
              ? `${product.company_name} > ${product.category_name} > ${product.name}`
              : `General Form`}
          </div>
          <h1 className="text-subhead font-semibold">
            {`Let us know why you're getting in touch.`}
          </h1>
          <form
            className="col-span-2 grid w-full grid-cols-2 gap-8"
            onSubmit={handleSubmit}
          >
            {formFields.map((field) => (
              <div
                key={field.label}
                className="flex w-full flex-col items-start justify-start gap-2"
              >
                <label className="text-para font-medium">{field.label}</label>
                {field.isTextArea ? (
                  <textarea
                    name={field.label.toLowerCase().replace(" ", "")}
                    className="h-10 w-full border-b-2 border-[#e9e3d5] bg-secondary bg-opacity-0 p-2 transition-all duration-300 focus:text-[1.2rem] focus:outline-none"
                    placeholder={field.placeholder}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.label.toLowerCase().replace(" ", "")}
                    className="h-10 w-full border-b-2 border-[#e9e3d5] bg-secondary bg-opacity-0 p-2 transition-all duration-300 focus:text-[1.2rem] focus:outline-none"
                    placeholder={field.placeholder}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}
            <div className="flex w-full items-center justify-start gap-4">
              <CTAButtons text="Submit" bgcolor="bg-prim" cta="#" />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
