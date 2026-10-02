"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global Error Boundary:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center p-6 bg-[#0f172a] text-slate-100 font-sans">
        <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center gap-4">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
            Critical Global Error
          </span>
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="text-sm text-slate-400">
            {error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => reset()}
            className="px-5 py-2 text-xs font-mono rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-colors"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
