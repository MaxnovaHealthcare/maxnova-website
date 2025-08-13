"use client";

import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-prim z-0 m-0 flex min-h-screen w-full flex-col">
      <section className="relative flex h-[60vh] w-full items-center justify-center bg-gradient-to-b from-primary to-accent1">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-helvetica text-6xl font-bold text-white max-md:text-4xl lg:text-8xl">
            Privacy Policy
          </h1>
          <p className="mt-4 font-helvetica text-para text-white/90 max-md:text-min">
            Your privacy and data protection are our top priorities
          </p>
        </div>
      </section>

      <section className="container mx-auto w-full max-w-4xl px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <div className="space-y-8 text-secondary">
            <div>
              <h2 className="mb-4 font-helvetica text-head font-bold text-accent2">
                1. Introduction
              </h2>
              <p className="font-helvetica text-para leading-relaxed text-secondary">
                Welcome to Maxnova Healthcare ("we," "us," or "our"). We are
                committed to protecting the privacy and security of your
                personal information. This Privacy Policy outlines how we
                collect, use, disclose, and safeguard your data when you visit
                our website, https://maxnovahealthcare.com, and interact with
                our services.
              </p>
              <p className="mt-4 font-helvetica text-para leading-relaxed text-secondary">
                We process your data in compliance with the General Data
                Protection Regulation (GDPR) and other relevant data protection
                laws.
              </p>
            </div>

            <div>
              <h2 className="mb-4 font-helvetica text-head font-bold text-accent2">
                2. Who We Are (Data Controller)
              </h2>
              <p className="font-helvetica text-para leading-relaxed text-secondary">
                The data controller responsible for your personal information
                is:
              </p>
              <div className="mt-4 rounded-lg bg-primary p-4">
                <p className="font-helvetica text-para font-medium text-secondary">
                  MAXNOVA HEALTHCARE
                  <br />
                  PLOT NO 102 SS COMPLEX, MANDHAUR, Baldev Nagar, Ambala,
                  <br />
                  Haryana 134007
                  <br />
                  Email: promotion@maxnovahealthcare.com
                </p>
              </div>
            </div>

            <div>
              <h2 className="mb-4 font-helvetica text-head font-bold text-accent2">
                3. What Personal Data We Collect and Why
              </h2>
              <p className="mb-4 font-helvetica text-para leading-relaxed text-secondary">
                We collect personal information that you voluntarily provide to
                us and data that is automatically collected when you use our
                website.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-helvetica text-subhead font-semibold text-accent2">
                    Information You Provide to Us:
                  </h3>
                  <ul className="ml-4 list-inside list-disc space-y-2 text-secondary">
                    <li className="font-helvetica text-para">
                      <strong>Contact Forms & Inquiries:</strong> When you
                      contact us for information about our products, PCD Pharma
                      Franchise, or third-party manufacturing services, we may
                      collect your name, email address, phone number, company
                      name, and any other information you provide in your
                      message.
                    </li>
                    <li className="font-helvetica text-para">
                      <strong>Communications:</strong> If you communicate with
                      us via email or other channels, we will collect the
                      information contained in your communications.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 font-helvetica text-subhead font-semibold text-accent2">
                    Information We Collect Automatically:
                  </h3>
                  <ul className="ml-4 list-inside list-disc space-y-2 text-secondary">
                    <li className="font-helvetica text-para">
                      <strong>Log and Usage Data:</strong> Like many websites,
                      we automatically collect information when you access and
                      use our site. This may include your IP address, browser
                      type, operating system, referral URLs, pages viewed, and
                      dates/times of your visits.
                    </li>
                    <li className="font-helvetica text-para">
                      <strong>Cookies and Tracking Technologies:</strong> We use
                      cookies to operate and administer our site, gather usage
                      data, and improve your experience.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 font-helvetica text-head font-bold text-accent2">
                4. How We Use Your Personal Data
              </h2>
              <p className="mb-4 font-helvetica text-para leading-relaxed text-secondary">
                We use your personal data for the following purposes:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-2 text-secondary">
                <li className="font-helvetica text-para">
                  <strong>To Provide and Manage Our Services:</strong> To
                  respond to your inquiries, provide you with information about
                  our products and services, and fulfill any contractual
                  obligations.
                </li>
                <li className="font-helvetica text-para">
                  <strong>To Improve Our Website:</strong> To understand how
                  users interact with our website so we can enhance user
                  experience and improve our services.
                </li>
                <li className="font-helvetica text-para">
                  <strong>For Business and Legal Purposes:</strong> To comply
                  with our legal obligations, regulatory requirements (such as
                  in the pharmaceutical industry), and to protect our business
                  interests and rights.
                </li>
                <li className="font-helvetica text-para">
                  <strong>Marketing (with your consent):</strong> Where you have
                  given us explicit consent, we may use your information to send
                  you marketing communications about our products and services.
                  You can withdraw this consent at any time.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 font-helvetica text-head font-bold text-accent2">
                5. Legal Basis for Processing Your Data
              </h2>
              <p className="mb-4 font-helvetica text-para leading-relaxed text-secondary">
                Under GDPR, we rely on the following legal bases to process your
                personal data:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-2 text-secondary">
                <li className="font-helvetica text-para">
                  <strong>Legitimate Interest:</strong> We process your data to
                  respond to your business-to-business inquiries and to manage
                  and improve our website and services.
                </li>
                <li className="font-helvetica text-para">
                  <strong>Consent:</strong> For sending marketing communications
                  and for the use of non-essential cookies.
                </li>
                <li className="font-helvetica text-para">
                  <strong>Legal Obligation:</strong> To comply with applicable
                  laws and regulations, particularly within the pharmaceutical
                  sector.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 font-helvetica text-head font-bold text-accent2">
                6. Data Sharing and Disclosure
              </h2>
              <p className="mb-4 font-helvetica text-para leading-relaxed text-secondary">
                We do not sell your personal data. We may share your information
                with the following third parties only in the ways that are
                described in this Privacy Policy:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-2 text-secondary">
                <li className="font-helvetica text-para">
                  <strong>Service Providers:</strong> We may share data with
                  third-party vendors and service providers who perform services
                  for us (e.g., website hosting, analytics).
                </li>
                <li className="font-helvetica text-para">
                  <strong>Legal and Regulatory Authorities:</strong> We may
                  disclose your information if required to do so by law or in
                  response to valid requests by public authorities.
                </li>
                <li className="font-helvetica text-para">
                  <strong>Business Transfers:</strong> In the event of a merger,
                  acquisition, or sale of assets, your personal data may be
                  transferred.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 font-helvetica text-head font-bold text-accent2">
                7. International Data Transfers
              </h2>
              <p className="font-helvetica text-para leading-relaxed text-secondary">
                As we are based in India, any personal data we collect may be
                transferred to and processed in India. If you are a resident of
                the European Economic Area (EEA), please note that we will take
                appropriate measures to ensure your personal data receives an
                adequate level of protection in accordance with GDPR, such as
                implementing Standard Contractual Clauses approved by the
                European Commission.
              </p>
            </div>
            <div>
              <h2 className="mb-4 font-helvetica text-head font-bold text-accent2">
                8. Your Rights Under GDPR
              </h2>
              <p className="mb-4 font-helvetica text-para leading-relaxed text-secondary">
                If you are a resident of the EEA, you have the following rights
                regarding your personal data:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-2 text-secondary">
                <li className="font-helvetica text-para">
                  <strong>The right to access</strong> – You have the right to
                  request copies of your personal data.
                </li>
                <li className="font-helvetica text-para">
                  <strong>The right to rectification</strong> – You have the
                  right to request that we correct any information you believe
                  is inaccurate or complete information you believe is
                  incomplete.
                </li>
                <li className="font-helvetica text-para">
                  <strong>The right to erasure</strong> – You have the right to
                  request that we erase your personal data, under certain
                  conditions.
                </li>
                <li className="font-helvetica text-para">
                  <strong>The right to restrict processing</strong> – You have
                  the right to request that we restrict the processing of your
                  personal data, under certain conditions.
                </li>
                <li className="font-helvetica text-para">
                  <strong>The right to object to processing</strong> – You have
                  the right to object to our processing of your personal data,
                  under certain conditions.
                </li>
                <li className="font-helvetica text-para">
                  <strong>The right to data portability</strong> – You have the
                  right to request that we transfer the data that we have
                  collected to another organization, or directly to you, under
                  certain conditions.
                </li>
              </ul>
              <p className="mt-4 font-helvetica text-para leading-relaxed text-secondary">
                To exercise any of these rights, please contact us at{" "}
                <a
                  href="mailto:promotion@maxnovahealthcare.com"
                  className="text-accent2 hover:underline"
                >
                  promotion@maxnovahealthcare.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="mb-4 font-helvetica text-head font-bold text-accent2">
                9. Data Security
              </h2>
              <p className="font-helvetica text-para leading-relaxed text-secondary">
                We have implemented appropriate technical and organizational
                security measures designed to protect the security of any
                personal information we process. However, please remember that
                no method of transmission over the Internet or method of
                electronic storage is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="mb-4 font-helvetica text-head font-bold text-accent2">
                10. Data Retention
              </h2>
              <p className="font-helvetica text-para leading-relaxed text-secondary">
                We will only retain your personal data for as long as necessary
                to fulfill the purposes we collected it for, including for the
                purposes of satisfying any legal, accounting, or reporting
                requirements.
              </p>
            </div>
            <div>
              <h2 className="mb-4 font-helvetica text-head font-bold text-accent2">
                11. Cookies and Tracking Technologies
              </h2>
              <p className="font-helvetica text-para leading-relaxed text-secondary">
                We use cookies to help improve your experience on our website.
                Cookies are small data files stored on your browser by a
                website. You can instruct your browser to refuse all cookies or
                to indicate when a cookie is being sent. However, if you do not
                accept cookies, you may not be able to use some portions of our
                site.
              </p>
            </div>
            <div>
              <h2 className="mb-4 font-helvetica text-head font-bold text-accent2">
                12. Children's Privacy
              </h2>
              <p className="font-helvetica text-para leading-relaxed text-secondary">
                Our services are not intended for use by children under the age
                of 16. We do not knowingly collect personal data from children
                under 16.
              </p>
            </div>
            <div className="mt-8 rounded-lg bg-accent1/10 p-6">
              <h3 className="mb-2 font-helvetica text-subhead font-semibold text-accent2">
                Contact Us
              </h3>
              <p className="font-helvetica text-para text-secondary">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us at:
              </p>
              <p className="mt-2 font-helvetica text-para text-secondary">
                Email:{" "}
                <a
                  href="mailto:promotion@maxnovahealthcare.com"
                  className="text-accent2 hover:underline"
                >
                  promotion@maxnovahealthcare.com
                </a>
              </p>
              <p className="mt-1 font-helvetica text-para text-secondary">
                Address: MAXNOVA HEALTHCARE, PLOT NO 102 SS COMPLEX, MANDHAUR,
                Baldev Nagar, Ambala, Haryana 134007
              </p>
            </div>
            <div className="mt-8 border-t border-secondary/20 pt-8 text-center text-min text-secondary/60">
              <p className="font-helvetica">Last updated: 12th August 2025</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
