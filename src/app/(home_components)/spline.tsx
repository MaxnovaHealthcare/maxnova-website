import React, { Suspense } from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function Splinediv() {
  return (
    <div className="h-full w-full max-md:hidden">
      <Suspense fallback={<div>Loading...</div>}>
        {/* <Spline scene="https://prod.spline.design/9cr2lPV5gd2nA4zm/scene.splinecode" /> */}
      </Suspense>
    </div>
  );
}
