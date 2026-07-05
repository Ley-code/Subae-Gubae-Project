import { useTranslations } from "next-intl";
import RevealOnScroll from "@/components/RevealOnScroll";
import FramedImage from "@/components/FramedImage";

/**
 * Mezmur section — replaces the AI-generated mezmur.png with a real photo
 * from /images/mezmur/. Keeps the drum-pulse glow accent divs, recolored.
 */
export default function MezmurTeaser() {
  const t = useTranslations("home");

  return (
    <section
      id="mezmur"
      style={{ scrollMarginTop: "76px", padding: "clamp(30px,4vw,50px) 0 clamp(50px,7vw,90px)" }}
    >
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-8 px-8 md:gap-14">
        <RevealOnScroll className="order-1 min-w-[290px] flex-[1_1_340px]">
          <div className="mb-1.5 font-fell text-[13px] tracking-[.2em] text-primary-600">
            {t("mezmurEyebrow")}
          </div>
          <h2
            className="mb-5 font-ethiopic font-extrabold leading-none"
            style={{ fontSize: "clamp(38px,5.5vw,66px)", color: "var(--color-accent-green)" }}
          >
            {t("mezmurTitle")}
          </h2>
          <p
            className="mb-4 font-cardo"
            style={{ fontSize: "clamp(17px,1.9vw,20px)", lineHeight: 1.78, color: "var(--color-ink-soft)" }}
          >
            {t("mezmurP1")}
          </p>
          <p
            className="mb-6 font-cardo"
            style={{ fontSize: "clamp(17px,1.9vw,20px)", lineHeight: 1.78, color: "var(--color-ink-soft)" }}
          >
            {t("mezmurP2")}
          </p>
          <div className="flex flex-wrap gap-3.5 gap-y-3.5">
            <div className="flex items-baseline gap-2.5">
              <span className="font-garamond text-[34px] font-bold text-primary-600">
                {t("mezmurStat1Num")}
              </span>
              <span className="max-w-[14ch] font-cardo text-[15px]" style={{ color: "var(--color-ink-soft)" }}>
                {t("mezmurStat1Label")}
              </span>
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="font-garamond text-[34px] font-bold text-primary-600">
                {t("mezmurStat2Num")}
              </span>
              <span className="max-w-[16ch] font-cardo text-[15px]" style={{ color: "var(--color-ink-soft)" }}>
                {t("mezmurStat2Label")}
              </span>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="order-2 min-w-[280px] flex-[0_1_430px]">
          <div className="relative w-full pt-6">
            <FramedImage
              src="/images/mezmur/choir-children.jpg"
              alt="የመዘምራን ቡድን"
              borderColor="green"
              aspectRatio="4 / 3"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute z-[4] rounded-full"
              style={{
                left: "22%",
                top: "44%",
                width: "82px",
                height: "82px",
                background: "radial-gradient(circle, rgba(201,151,31,.6), transparent 70%)",
                animation: "drumPulse 1.7s ease-in-out infinite",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute z-[4] rounded-full"
              style={{
                right: "22%",
                top: "48%",
                width: "78px",
                height: "78px",
                background: "radial-gradient(circle, rgba(99,48,138,.6), transparent 70%)",
                animation: "drumPulse 1.7s ease-in-out infinite .85s",
              }}
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
