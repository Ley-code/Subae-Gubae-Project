import Link from "next/link";
import { getTranslations } from "next-intl/server";
import RevealOnScroll from "@/components/RevealOnScroll";

export default async function RegisterSuccessPage() {
  const t = await getTranslations("register");

  return (
    <div style={{ padding: "clamp(60px,10vw,120px) 0" }}>
      <RevealOnScroll className="mx-auto max-w-[560px] px-8 text-center">
        <h1
          className="m-0 mb-4 font-ethiopic font-bold"
          style={{ fontSize: "clamp(28px,4vw,42px)", color: "var(--color-accent-green-dark)" }}
        >
          {t("successTitle")}
        </h1>
        <p className="mb-8 font-cardo text-lg" style={{ color: "var(--color-ink-soft)" }}>
          {t("successBody")}
        </p>
        <Link
          href="/"
          className="btnp inline-block rounded px-6 py-3 font-ethiopic font-semibold no-underline"
          style={{
            background: "linear-gradient(180deg, var(--color-accent-gold-light), var(--color-accent-gold))",
            color: "var(--color-primary-900)",
          }}
        >
          {t("backHome")}
        </Link>
      </RevealOnScroll>
    </div>
  );
}
