import {
  FaApple,
  FaArrowRight,
  FaEnvelope,
  FaGooglePlay,
  FaLeaf,
  FaStar,
  FaTag,
  FaTruck,
} from "react-icons/fa6";

const newsletterPerks = [
  { label: "Fresh Picks Weekly", icon: FaLeaf },
  { label: "Free Delivery Codes", icon: FaTruck },
  { label: "Members-Only Deals", icon: FaTag },
];

export default function Newsletter() {
  return (
    <section className="newsletter-section px-4 py-12 sm:px-[30px] sm:py-16">
      <div className="newsletter-card mx-auto grid max-w-[1440px] gap-8 rounded-[32px] border border-emerald-100/80 p-6 sm:p-10 lg:grid-cols-[1.55fr_0.95fr] lg:gap-8 lg:rounded-[40px] lg:p-14">
        <div className="flex flex-col justify-center lg:pr-8">
          <div className="mb-6 flex items-center gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-xl text-white shadow-lg shadow-emerald-500/20">
              <FaEnvelope aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Newsletter
              </p>
              <p className="text-sm text-slate-500">50,000+ subscribers</p>
            </div>
          </div>

          <h2 className="max-w-2xl text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            Get the Freshest Updates{" "}
            <span className="inline-block text-emerald-600">Delivered Free</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-500">
            Weekly recipes, seasonal offers &amp; exclusive member perks.
          </p>

          <ul className="mt-6 flex flex-wrap gap-3">
            {newsletterPerks.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex min-h-12 items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 text-sm text-slate-700 shadow-sm"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Icon aria-hidden="true" className="size-3.5" />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <form className="mt-7 flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              className="h-14 min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-5 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            />
            <button
              type="button"
              className="flex h-14 shrink-0 items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-7 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
            >
              Subscribe
              <FaArrowRight aria-hidden="true" />
            </button>
          </form>
          <p className="mt-3 text-xs text-slate-400">
            ✨ Unsubscribe anytime. No spam, ever.
          </p>
        </div>

        <div className="border-t border-emerald-100 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div className="flex h-full flex-col justify-center rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-400">
              <span aria-hidden="true">📱</span>
              Mobile App
            </span>
            <h3 className="text-2xl font-bold">Shop Faster on Our App</h3>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Get app-exclusive deals &amp; 15% off your first order.
            </p>

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                className="flex h-[60px] items-center gap-4 rounded-xl border border-white/5 bg-slate-700/80 px-5 text-left transition hover:bg-slate-700"
              >
                <FaApple aria-hidden="true" className="size-5" />
                <span className="leading-tight">
                  <span className="block text-[10px] uppercase tracking-wide text-slate-300">
                    Download on
                  </span>
                  <span className="block text-sm font-semibold">App Store</span>
                </span>
              </button>
              <button
                type="button"
                className="flex h-[60px] items-center gap-4 rounded-xl border border-white/5 bg-slate-700/80 px-5 text-left transition hover:bg-slate-700"
              >
                <FaGooglePlay aria-hidden="true" className="size-5" />
                <span className="leading-tight">
                  <span className="block text-[10px] uppercase tracking-wide text-slate-300">
                    Get it on
                  </span>
                  <span className="block text-sm font-semibold">Google Play</span>
                </span>
              </button>
            </div>

            <div className="mt-6 flex items-center gap-3 text-sm text-slate-400">
              <span className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar aria-hidden="true" key={index} className="size-3.5" />
                ))}
              </span>
              <span>4.9 · 100K+ downloads</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
