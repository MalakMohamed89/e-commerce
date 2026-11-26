"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, MapPin, Settings } from "lucide-react";

export default function AccountSidebar() {
  const pathname = usePathname();

  const links = [
    {
      title: "My Addresses",
      href: "/account/addresses",
      icon: MapPin,
    },
    {
      title: "Settings",
      href: "/account/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm"
      aria-label="Account sections"
    >
      <h2 className="border-b border-[#f3f4f6] px-4 py-3 text-sm font-semibold">
        My Account
      </h2>

      <nav className="grid gap-1 p-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-left text-sm transition-colors ${
                isActive
                  ? "bg-[#f0fdf4] font-medium text-[#008236]"
                  : "text-[#4a5565] hover:bg-[#f9fafb] hover:text-[#15803d]"
              }`}
            >
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-lg ${
                  isActive
                    ? "bg-[#16a34a] text-white"
                    : "bg-[#f3f4f6] text-[#6a7282]"
                }`}
              >
                <Icon className="size-4" />
              </span>

              <span className="flex-1">{link.title}</span>
              <ChevronRight className="size-4" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}