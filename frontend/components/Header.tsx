"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const NAV_KEYS = [
  ["home", "/"],
  ["history", "/history"],
  ["news", "/news"],
  ["events", "/events"],
  ["gallery", "/gallery"],
  ["articles", "/articles"],
  ["mezmur", "/mezmur"],
  ["materials", "/materials"],
  ["register", "/register"],
] as const;

export default function Header() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 border-b-2"
      style={{
        background: "linear-gradient(180deg, var(--color-primary-950), var(--color-primary-800))",
        borderColor: "var(--color-accent-gold)",
        boxShadow: "0 6px 20px rgba(15,8,20,.4)",
      }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-5 px-6 py-[11px]">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <span
            className="relative h-[38px] w-[38px] flex-none"
            style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,.5))" }}
          >
            <Image
              src="/images/logo/logo-transparent.png"
              alt="የመሠረተ ሃይማኖት ሰንበት ት/ቤት አርማ"
              fill
              className="object-contain"
              priority
            />
          </span>
          <span className="flex flex-col leading-[1.05]">
            <span className="font-ethiopic text-[16px] font-bold text-parchment">
              {t("site.name")}
            </span>
            <span className="font-fell text-[11px] tracking-[.16em] text-accent-gold">
              {t("site.tagline")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 font-ethiopic text-[15px] font-medium md:flex">
          {NAV_KEYS.map(([key, href]) => (
            <Link key={key} className="navlink" href={href}>
              {t(`nav.${key}`)}
            </Link>
          ))}
          <Link
            href="/admin/login"
            className="rounded border px-4 py-1.5 text-sm no-underline"
            style={{
              borderColor: "var(--color-accent-gold)",
              color: "var(--color-accent-gold-light)",
            }}
          >
            {t("nav.login")}
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-none flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className="h-[2px] w-6" style={{ background: "var(--color-accent-gold)" }} />
          <span className="h-[2px] w-6" style={{ background: "var(--color-accent-gold)" }} />
          <span className="h-[2px] w-6" style={{ background: "var(--color-accent-gold)" }} />
        </button>
      </div>

      {open && (
        <nav
          className="flex flex-col gap-1 border-t px-6 py-4 font-ethiopic text-[15px] font-medium md:hidden"
          style={{ borderColor: "rgba(201,151,31,.35)" }}
        >
          {NAV_KEYS.map(([key, href]) => (
            <Link
              key={key}
              className="navlink py-2"
              href={href}
              onClick={() => setOpen(false)}
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
          <Link
            href="/admin/login"
            className="navlink py-2"
            style={{ color: "var(--color-accent-gold-light)" }}
            onClick={() => setOpen(false)}
          >
            {t("nav.login")}
          </Link>
        </nav>
      )}
    </header>
  );
}
