"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center bg-[#f8fafc] px-4 py-16">
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        <div className="mb-8 flex size-24 items-center justify-center rounded-full bg-red-50">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-red-100 text-red-500">
            <AlertTriangle className="size-9" strokeWidth={1.8} />
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-[#0f172a] md:text-3xl">
          Something Went Wrong
        </h1>
        <p className="mb-2 max-w-sm text-sm leading-6 text-gray-500 md:text-base">
          We hit an unexpected problem while loading this page. Please try again, and if
          it keeps happening, come back in a little while.
        </p>

        {error.digest && (
          <p className="mb-6 text-xs text-gray-400">Error ID: {error.digest}</p>
        )}

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            <RefreshCw className="size-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-green-600 hover:text-green-600"
          >
            <Home className="size-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}