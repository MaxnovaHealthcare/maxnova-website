"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/whiteblanklogo.png";
import facebook from "../../public/images/facebook.png";
import instagram from "../../public/images/instagram.png";
import twitter from "../../public/images/twitter.png";
import linkedin from "../../public/images/linkedin.png";

async function getcompanyData() {
  const res = await fetch(
    "https://maxnovabackend-38x5s.ondigitalocean.app/api/company",
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function Footer() {
  const [data, setData] = useState(null);

  React.useEffect(() => {
    getcompanyData()
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="bg-footer flex w-screen flex-col items-center justify-center gap-24 p-12 py-24 text-primary">
      <div className="flex h-fit w-full items-start justify-center gap-24">
        <div className="flex h-fit w-fit flex-col gap-4">
          <h1 className="text-para font-semibold">Explore</h1>
          <div className="flex flex-col gap-2 text-min">
            <Links link="/" text="Home" />
            <Links link="/about" text="About" />
            <Links link="/pcd-franchise" text="PCD Franchise" />
            <Links link="/private-label" text="Private Label" />
            <Links link="/custom-formulations" text="Custom Formulations" />
          </div>
        </div>
        <div className="flex h-fit w-fit flex-col gap-4">
          <h1 className="text-para font-semibold">PCD Franchise</h1>
          <div className="flex flex-col gap-2 text-min">
            {(data as any)?.allCompany?.map((brand: any, index: number) => (
              <Links
                key={index}
                link={`/pcd-franchise/${brand.slug}`}
                text={brand.name}
              />
            ))}
          </div>
        </div>
        <div className="flex h-fit w-fit flex-col gap-4">
          <h1 className="text-para font-semibold">Other Services</h1>
          <div className="flex flex-col gap-2 text-min">
            <Links link="/custom-formulations" text="Custom Formulations" />
            <Links link="/private-label" text="Private Labels" />
          </div>
        </div>
      </div>
      <div className="flex h-fit w-full flex-col items-center justify-center gap-4">
        <Image src={logo} alt="Logo" className="h-auto w-40" />
        <p className="text-min">
          © 2024 Maxnova Healthcare. All rights reserved
        </p>
        <div className="flex w-fit gap-2">
          <Link
            href={"https://www.facebook.com/MaxnovaHealthcareAmbala"}
            className="h-fit w-fit"
          >
            <Image src={facebook} alt="Facebook" width={24} height={24} />
          </Link>
          <Link
            href={
              "https://www.instagram.com/maxnovahealthcare_/?igsh=MmkzNHV4a2pldTlx"
            }
            className="h-fit w-fit"
          >
            <Image src={instagram} alt="Instagram" width={24} height={24} />
          </Link>
          <Link href={"https://x.com/maxnovahealth"} className="h-fit w-fit">
            <Image src={twitter} alt="Twitter" width={24} height={24} />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/maxnova-healthcare-959579163/"}
          >
            <Image src={linkedin} alt="LinkedIn" width={24} height={24} />
          </Link>
        </div>
      </div>
    </section>
  );
}

interface LinkProps {
  link: string;
  text: string;
}

function Links({ link, text }: LinkProps) {
  return (
    <Link
      href={link}
      className="h-fit w-fit font-helvetica text-min text-primary hover:font-medium hover:text-accent2"
    >
      {text}
    </Link>
  );
}
