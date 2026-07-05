"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

const LINKS = [
  ["dashboard", "/admin"],
  ["news", "/admin/news"],
  ["events", "/admin/events"],
  ["gallery", "/admin/gallery"],
  ["materials", "/admin/materials"],
  ["mezmur", "/admin/mezmur"],
  ["articles", "/admin/articles"],
  ["registrations", "/admin/registrations"],
  ["members", "/admin/members"],
] as const;

export default function AdminSidebar() {
  const t = useTranslations("admin.nav");
  const pathname = usePathname();

  return (
    <aside
      className="flex w-full flex-none flex-col gap-1 border-b-2 p-4 md:w-56 md:border-b-0 md:border-r-2 md:p-6"
      style={{
        background: "var(--color-primary-950)",
        borderColor: "var(--color-accent-gold)",
      }}
    >
      <nav className="flex flex-1 flex-col gap-1">
        {LINKS.map(([key, href]) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={key}
              href={href}
              className="rounded px-3 py-2 font-ethiopic text-sm no-underline"
              style={{
                background: active ? "var(--color-primary-700)" : "transparent",
                color: active ? "var(--color-parchment)" : "var(--color-parchment-dark)",
              }}
            >
              {t(key)}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 flex flex-col gap-1 border-t pt-4" style={{ borderColor: "rgba(201,151,31,.3)" }}>
        <Link href="/" className="rounded px-3 py-2 font-ethiopic text-sm no-underline" style={{ color: "var(--color-parchment-dark)" }}>
          {t("viewSite")}
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="rounded px-3 py-2 text-left font-ethiopic text-sm"
          style={{ color: "var(--color-accent-red)" }}
        >
          {t("logout")}
        </button>
      </div>
    </aside>
  );
}
