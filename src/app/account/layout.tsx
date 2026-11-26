
import { UserRound } from "lucide-react";
import AccountSidebar from "../_components/AccountSidebar/AccountSidebar";
import Link from "next/link";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-linear-to-r from-[#16a34a] via-[#22c55e] to-[#4ade80] text-white">
        <div className="mx-auto max-w-384 px-4 py-14 sm:px-6 lg:py-14">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-2 text-xs text-white/80"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span aria-current="page" className="text-white">
              My Account
            </span>
          </nav>

          <div className="flex items-center gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/20 shadow-inner shadow-white/10">
              <UserRound className="size-6 fill-white" />
            </span>

            <div>
              <h1 className="text-3xl font-bold leading-9 tracking-tight">
                My Account
              </h1>
              <p className="mt-1 text-sm text-white/85">
                Manage your addresses and account settings
              </p>
            </div>
          </div>
        </div>
      </header>

<div className="mx-auto grid max-w-384 items-start gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[288px_minmax(0,1fr)] lg:gap-8 lg:py-8">
  <AccountSidebar />

  <main className="min-w-0">
    {children}
  </main>
</div>
    </div>
  );
}