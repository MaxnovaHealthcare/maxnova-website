import React, { Suspense } from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

interface SplinedivProps {
  url: string;
}

const Splinediv: React.FC<SplinedivProps> = ({ url }) => {
  if (!url) {
    console.error("The 'url' prop is required.");
    return <div>Error: Spline URL is missing.</div>;
  }

  return (
    <div className="h-full w-full max-md:hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <Spline scene={url} />
      </Suspense>
    </div>
  );
};

export default Splinediv;
