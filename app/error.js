"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Root Error Boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-bg-primary text-text-primary">
      <div className="max-w-md flex flex-col items-center gap-4">
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
          Application Error
        </span>
        <h2 className="text-2xl font-bold font-cormorant tracking-tight">
          Something went wrong
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed font-light">
          {error?.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={() => reset()}
          className="mt-2 px-5 py-2 text-xs font-mono rounded-full bg-text-primary text-text-inverse font-semibold hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
