import { getTranslations } from "next-intl/server";
import RevealOnScroll from "@/components/RevealOnScroll";

export default async function ForumPage() {
  const t = await getTranslations("forum");

  return (
    <div style={{ padding: "clamp(60px,10vw,120px) 0" }}>
      <RevealOnScroll className="mx-auto max-w-[600px] px-8 text-center">
        <h1
          className="m-0 mb-4 font-ethiopic font-bold"
          style={{ fontSize: "clamp(28px,4vw,42px)", color: "var(--color-primary-700)" }}
        >
          {t("title")}
        </h1>
        <p className="font-cardo text-lg" style={{ color: "var(--color-ink-soft)" }}>
          {t("comingSoon")}
        </p>
      </RevealOnScroll>
    </div>
  );
}
