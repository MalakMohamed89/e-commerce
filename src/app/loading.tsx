import { Apple, Carrot, Cherry, Milk, ShoppingCart } from "lucide-react";

const floaters = [
  { Icon: Apple, className: "left-[12%] top-[22%]", delay: "0ms" },
  { Icon: Carrot, className: "right-[14%] top-[28%]", delay: "300ms" },
  { Icon: Milk, className: "left-[18%] bottom-[24%]", delay: "600ms" },
  { Icon: Cherry, className: "right-[20%] bottom-[20%]", delay: "900ms" },
];

export default function Loading() {
  return (
    <main
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="relative flex min-h-[70vh] flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#f0fdf4_0%,#f8fafc_60%)] px-4"
    >
      {/* Floating groceries */}
      {floaters.map(({ Icon, className, delay }, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`absolute hidden text-green-500/25 motion-reduce:animate-none sm:block animate-bounce ${className}`}
          style={{ animationDelay: delay, animationDuration: "2.4s" }}
        >
          <Icon className="size-10" strokeWidth={1.6} />
        </span>
      ))}

      <div className="flex flex-col items-center text-center">
        {/* Logo badge */}
        <div className="relative flex size-28 items-center justify-center">
          {/* pulse rings */}
          <span className="absolute inset-0 animate-ping rounded-full bg-green-400/20 motion-reduce:animate-none" />
          <span
            className="absolute inset-2 animate-ping rounded-full bg-green-400/20 motion-reduce:animate-none"
            style={{ animationDelay: "400ms" }}
          />

          {/* spinning ring */}
          <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-green-100 border-t-green-600 motion-reduce:animate-none" />

          {/* cart */}
          <div className="relative flex size-16 items-center justify-center rounded-2xl bg-[linear-gradient(149.69deg,#16a34a_0%,#22c55e_50%,#4ade80_100%)] text-white shadow-lg shadow-green-600/30">
            <ShoppingCart className="size-8" strokeWidth={2} />
          </div>
        </div>

        {/* Wordmark */}
        <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-[#0f172a]">
          Fresh<span className="text-green-600">Cart</span>
        </h1>

        {/* Message + dots */}
        <p className="mt-2 flex items-center gap-1 text-sm text-gray-500 md:text-base">
          Getting fresh groceries ready for you
          <span className="ml-1 flex items-end gap-1" aria-hidden="true">
            {[0, 150, 300].map((delay) => (
              <span
                key={delay}
                className="size-1.5 animate-bounce rounded-full bg-green-600 motion-reduce:animate-none"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </span>
        </p>

        {/* Indeterminate progress bar */}
        <div className="mt-6 h-1.5 w-56 overflow-hidden rounded-full bg-green-100">
          <div className="h-full w-1/3 animate-[loading-bar_1.4s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,#16a34a,#4ade80)] motion-reduce:animate-none" />
        </div>
      </div>

      <span className="sr-only">Loading...</span>
    </main>
  );
}