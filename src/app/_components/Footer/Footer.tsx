import Link from "next/link";
import {
  FaCartShopping,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaFacebookF,
  FaHeadphones,
  FaLocationDot,
  FaPhone,
  FaRotateLeft,
  FaShieldHalved,
  FaTruck,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

const benefits = [
  { title: "Free Shipping", description: "On orders over 500 EGP", icon: FaTruck },
  { title: "Easy Returns", description: "14-day return policy", icon: FaRotateLeft },
  { title: "Secure Payment", description: "100% secure checkout", icon: FaShieldHalved },
  { title: "24/7 Support", description: "Contact us anytime", icon: FaHeadphones },
];

const footerGroups = [
  {
    title: "Shop",
    links: [
      ["All Products", "/products"],
      ["Categories", "/categories"],
      ["Brands", "/brands"],
      ["Electronics", "/categories/6439d2d167d9aa4ca970649f"],
      ["Men's Fashion", "/categories/6439d5b90049ad0b52b90048"],
      ["Women's Fashion", "/categories/6439d58a0049ad0b52b9003f"],
    ],
  },
  {
    title: "Account",
    links: [
      ["My Account", "/account"],
      ["Order History", "/orders"],
      ["Wishlist", "/wishlist"],
      ["Shopping Cart", "/cart"],
      ["Sign In", "/signIn"],
      ["Create Account", "/signUp"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Contact Us", "mailto:support@freshcart.com"],
      ["Help Center", "mailto:support@freshcart.com"],
      ["Shipping Info", "mailto:support@freshcart.com"],
      ["Returns & Refunds", "mailto:support@freshcart.com"],
      ["Track Order", "/orders"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/privacy"],
      ["Terms of Service", "/terms"],
      ["Cookie Policy", "/cookies"],
    ],
  },
];

const socialLinks = [
  { label: "Facebook", icon: FaFacebookF },
  { label: "Twitter", icon: FaTwitter },
  { label: "Instagram", icon: FaInstagram },
  { label: "YouTube", icon: FaYoutube },
];

export default function Footer() {
  return (
    <footer>
      <section className="bg-emerald-50 py-6">
        <div className="mx-auto grid max-w-360 grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {benefits.map(({ title, description, icon: Icon }) => (
            <div key={title} className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-lg text-emerald-600">
                <Icon aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-800">{title}</span>
                <span className="mt-1 block text-xs text-slate-500">{description}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-slate-900 text-slate-400">
        <div className="mx-auto grid max-w-360 gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-[1.8fr_repeat(4,1fr)] lg:gap-12 lg:py-14">
          <div>
            <Link
              href="/"
              className="mb-7 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-[26px] font-bold tracking-tight text-slate-900"
            >
              <FaCartShopping aria-hidden="true" className="text-emerald-600" />
              FreshCart
            </Link>
            <p className="max-w-sm text-sm leading-[1.65]">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at competitive
              prices with a seamless shopping experience.
            </p>

            <address className="mt-6 flex flex-col gap-3 text-sm not-italic">
              <a className="flex items-center gap-3 transition hover:text-emerald-400" href="tel:+18001234567">
                <FaPhone aria-hidden="true" className="text-emerald-500" />
                +1 (800) 123-4567
              </a>
              <a className="flex items-center gap-3 transition hover:text-emerald-400" href="mailto:support@freshcart.com">
                <FaEnvelope aria-hidden="true" className="text-emerald-500" />
                support@freshcart.com
              </a>
              <span className="flex items-center gap-3">
                <FaLocationDot aria-hidden="true" className="text-emerald-500" />
                123 Commerce Street, New York, NY 10001
              </span>
            </address>

            <div className="mt-7 flex gap-3">
              {socialLinks.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-emerald-600 hover:text-white"
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {footerGroups.map(({ title, links }) => (
            <nav key={title} aria-label={title}>
              <h2 className="mb-6 text-base font-semibold text-white">{title}</h2>
              <ul className="flex flex-col gap-3.5">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm transition-colors hover:text-emerald-400"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-slate-800">
          <div className="mx-auto flex max-w-360 flex-col gap-4 px-4 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 FreshCart. All rights reserved.</p>
            <div className="flex items-center gap-5 text-xl text-slate-400" aria-label="Accepted payment methods">
              <FaCcVisa aria-label="Visa" /> <span className="text-xs">Visa</span>
              <FaCcMastercard aria-label="Mastercard" /> <span className="text-xs">Mastercard</span>
              <FaCcPaypal aria-label="PayPal" /> <span className="text-xs">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
