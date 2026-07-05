import Image from "next/image";
import { useTranslations } from "next-intl";

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={{ display: "block", fill: "currentColor" }}
    >
      <rect x="45" y="6" width="10" height="88" rx="3" />
      <rect x="6" y="45" width="88" height="10" rx="3" />
      <circle cx="50" cy="50" r="11" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="50" cy="9" r="4.5" />
      <circle cx="50" cy="91" r="4.5" />
      <circle cx="9" cy="50" r="4.5" />
      <circle cx="91" cy="50" r="4.5" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations();

  return (
    <footer
      className="relative border-t-2 py-14 md:py-[74px]"
      style={{
        background: "linear-gradient(180deg, var(--color-primary-800), var(--color-primary-950))",
        color: "var(--color-parchment-dark)",
        borderColor: "var(--color-accent-gold)",
      }}
    >
      <Image
        src="/textures/smoke.png"
        alt=""
        aria-hidden="true"
        width={170}
        height={220}
        className="pointer-events-none absolute right-[6%] -top-10 opacity-[.14] mix-blend-screen"
      />

      <div className="mx-auto flex max-w-[1120px] flex-wrap items-start justify-between gap-9 px-6">
        <div className="min-w-[260px] flex-[1_1_320px]">
          <div className="mb-4 flex items-center gap-3.5">
            <span className="h-[42px] w-[42px] flex-none text-accent-gold">
              <CrossIcon className="h-full w-full" />
            </span>
            <div className="leading-[1.15]">
              <div className="font-ethiopic text-xl font-bold text-parchment">
                {t("site.name")}
              </div>
              <div className="font-fell text-xs tracking-[.14em] text-accent-gold">
                {t("site.tagline")}
              </div>
            </div>
          </div>
          <p className="max-w-[44ch] font-cardo text-base leading-[1.7]" style={{ color: "var(--color-parchment-dark)" }}>
            {t("footer.about")}
          </p>
        </div>

        <div className="min-w-[190px] flex-[0_1_220px]">
          <div className="mb-3.5 font-fell text-xs tracking-[.16em] text-accent-gold-light">
            {t("footer.visitUs").toUpperCase()}
          </div>
          <p className="mb-2 font-cardo text-base">{t("footer.address")}</p>
          <p className="font-cardo text-base">
            {t("footer.schedule")}
            <br />
            {t("footer.email")}
          </p>
        </div>
      </div>

      <div
        className="mx-auto mt-9 flex max-w-[1120px] flex-wrap items-center justify-between gap-3 border-t px-6 pt-[22px]"
        style={{ borderColor: "rgba(201,151,31,.35)" }}
      >
        <span className="font-ethiopic text-[17px] text-accent-gold-light">{t("footer.glory")}</span>
        <span className="font-cardo text-sm" style={{ color: "var(--color-primary-300)" }}>
          &copy; {new Date().getFullYear()} {t("footer.copyright")}
        </span>
      </div>
    </footer>
  );
}
