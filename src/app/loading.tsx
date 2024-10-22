"use client";

import React, { useEffect, useState, ReactNode } from "react";

export default function DelayedLoading({ children }: { children?: ReactNode }) {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);
  return showLoading ? (
    <div className="flex h-screen w-screen items-center justify-center bg-accent1 text-center font-humane text-9xl text-primary">
      Manufacturing...
    </div>
  ) : (
    <>{children}</>
  );
}
