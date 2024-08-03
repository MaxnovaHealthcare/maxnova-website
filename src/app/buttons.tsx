"use client";

import React from "react";
import Link from "next/link";

interface CTAButtonsProps {
  text: string;
  onClick?: () => any;
  bgcolor: string;
  cta: string;
}

const CTAButtons: React.FC<CTAButtonsProps> = ({
  text,
  onClick,
  bgcolor,
  cta,
}) => {
  return (
    <Link
      onClick={onClick}
      className={`h-fit w-fit rounded-full px-4 py-3 text-min font-medium capitalize ${bgcolor}`}
      href={cta}
    >
      {text}
    </Link>
  );
};

export default CTAButtons;
