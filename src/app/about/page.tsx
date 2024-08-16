"use client";

import React, { useEffect } from "react";
import Hero from "./(about_components)/heroabout";
import About from "./(about_components)/aboutus";
import Certification from "./(about_components)/certification";
import { Page } from "../page";

export default function AboutPage() {
  return (
    <Page>
      <Hero />
      <About />
      <Certification />
    </Page>
  );
}
