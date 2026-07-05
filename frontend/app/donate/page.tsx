import { getTranslations } from "next-intl/server";
import RevealOnScroll from "@/components/RevealOnScroll";
import DonationInterestForm from "@/components/DonationInterestForm";

export default async function DonatePage() {
  const t = await getTranslations("donate");

  return (
    <div style={{ padding: "clamp(40px,6vw,80px) 0" }}>
      <div className="mx-auto max-w-[600px] px-8">
        <RevealOnScroll className="mb-8 text-center">
          <h1
            className="m-0 mb-4 font-ethiopic font-bold"
            style={{ fontSize: "clamp(28px,4vw,42px)", color: "var(--color-primary-700)" }}
          >
            {t("title")}
          </h1>
          <p className="font-cardo text-base" style={{ color: "var(--color-ink-soft)" }}>
            {t("intro")}
          </p>
        </RevealOnScroll>

        <RevealOnScroll
          className="mb-8 rounded-lg border-[1.5px] p-6"
          style={{
            borderColor: "var(--color-accent-gold)",
            background: "linear-gradient(160deg, rgba(244,239,250,.7), rgba(230,219,241,.4))",
          }}
        >
          <div className="mb-3 flex justify-between font-ethiopic">
            <span style={{ color: "var(--color-primary-700)" }}>{t("telebirr")}</span>
            <span style={{ color: "var(--color-ink-soft)" }}>xxxx-xxxx</span>
          </div>
          <div className="flex justify-between font-ethiopic">
            <span style={{ color: "var(--color-primary-700)" }}>{t("bank")}</span>
            <span style={{ color: "var(--color-ink-soft)" }}>xxxx-xxxx-xxxx</span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll
          className="rounded-lg border-[1.5px] p-6"
          style={{
            borderColor: "var(--color-accent-gold)",
            background: "linear-gradient(160deg, rgba(244,239,250,.7), rgba(230,219,241,.4))",
          }}
        >
          <h2 className="m-0 mb-2 font-ethiopic text-lg font-bold" style={{ color: "var(--color-primary-700)" }}>
            {t("interestTitle")}
          </h2>
          <p className="mb-4 font-cardo text-sm" style={{ color: "var(--color-ink-soft)" }}>
            {t("interestBody")}
          </p>
          <DonationInterestForm />
        </RevealOnScroll>
      </div>
    </div>
  );
}
