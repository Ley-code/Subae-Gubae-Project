import { getTranslations } from "next-intl/server";
import RevealOnScroll from "@/components/RevealOnScroll";
import RegistrationForm from "@/components/RegistrationForm";

export default async function RegisterPage() {
  const t = await getTranslations("register");

  return (
    <div style={{ padding: "clamp(40px,6vw,80px) 0" }}>
      <div className="mx-auto max-w-[640px] px-8">
        <RevealOnScroll className="mb-8 text-center">
          <h1
            className="m-0 mb-2 font-ethiopic font-bold"
            style={{ fontSize: "clamp(28px,4vw,44px)", color: "var(--color-primary-700)" }}
          >
            {t("title")}
          </h1>
          <p className="font-cardo" style={{ color: "var(--color-ink-soft)" }}>
            {t("subtitle")}
          </p>
        </RevealOnScroll>

        <RevealOnScroll
          className="rounded-lg border-[1.5px] p-8"
          style={{
            borderColor: "var(--color-accent-gold)",
            background: "linear-gradient(160deg, rgba(244,239,250,.7), rgba(230,219,241,.4))",
          }}
        >
          <RegistrationForm />
        </RevealOnScroll>
      </div>
    </div>
  );
}
