import { useTranslations } from "next-intl";
import RevealOnScroll from "@/components/RevealOnScroll";
import FramedImage from "@/components/FramedImage";

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
    </svg>
  );
}

/**
 * "እንኳን ደህና መጡ" welcome section — drop-cap first paragraph paired with a
 * FramedImage of the church grounds.
 */
export default function AboutWelcome() {
  const t = useTranslations("home");

  return (
    <section
      id="about"
      style={{ scrollMarginTop: "76px", padding: "clamp(40px,6vw,80px) 0" }}
    >
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-8 px-8 md:gap-14">
        <RevealOnScroll className="min-w-[290px] flex-[1_1_360px]">
          <div className="mb-1.5 font-fell text-[13px] tracking-[.2em] text-primary-600">
            {t("welcomeEyebrow")}
          </div>
          <h2
            className="mb-5 font-ethiopic font-bold leading-[1.1]"
            style={{ fontSize: "clamp(30px,4vw,46px)", color: "var(--color-primary-700)" }}
          >
            {t("welcomeTitle")}
          </h2>
          <p
            className="drop-cap mb-4 font-cardo"
            style={{ fontSize: "clamp(17px,1.9vw,20px)", lineHeight: 1.75, color: "var(--color-ink-soft)" }}
          >
            {t("welcomeP1")}
          </p>
          <p
            className="font-cardo"
            style={{ fontSize: "clamp(17px,1.9vw,20px)", lineHeight: 1.75, color: "var(--color-ink-soft)" }}
          >
            {t("welcomeP2")}
          </p>
          <div className="mt-6 flex items-center gap-3.5">
            <span className="h-10 w-10 flex-none text-accent-green">
              <CrossIcon className="h-full w-full" />
            </span>
            <span className="font-garamond text-[19px] italic text-primary-600">
              {t("welcomeVerse")}
            </span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="min-w-[270px] flex-[0_1_380px]">
          <div className="pt-6">
            <FramedImage
              src="/images/about/clergy-procession.jpg"
              alt="የገዳሙ ካህናት ሰልፍ"
              borderColor="purple"
              caption="ቤተ ማርያም"
              aspectRatio="4 / 3"
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
