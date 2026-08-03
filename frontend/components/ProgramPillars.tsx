import { useTranslations } from "next-intl";
import RevealOnScroll from "@/components/RevealOnScroll";

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

const PILLARS = [
  { key: 1, color: "var(--color-primary-600)" },
  { key: 2, color: "var(--color-accent-green)" },
  { key: 3, color: "var(--color-accent-gold)" },
] as const;

/**
 * Three-pillar Prayer/Teaching/Praise cards, one accent color per pillar
 * (purple/green/gold), echoing the logo's rainbow ring rather than reusing
 * one color twice as the original prototype did.
 */
export default function ProgramPillars() {
  const t = useTranslations("home");

  return (
    <section
      id="program"
      className="border-y"
      style={{
        scrollMarginTop: "76px",
        padding: "clamp(46px,7vw,86px) 0",
        background: "linear-gradient(180deg, rgba(99,48,138,.06), rgba(30,122,60,.06))",
        borderColor: "rgba(201,151,31,.4)",
      }}
    >
      <div className="mx-auto max-w-[1120px] px-8">
        <RevealOnScroll className="mb-11 text-center">
          <div className="mb-2 font-fell text-[14px] tracking-[.2em] text-primary-600">
            {t("programEyebrow")}
          </div>
          <h2
            className="m-0 font-ethiopic font-bold"
            style={{ fontSize: "clamp(32px,4.6vw,52px)", color: "var(--color-primary-700)" }}
          >
            {t("programTitle")}
          </h2>
        </RevealOnScroll>

        <div className="flex flex-wrap justify-center gap-6">
          {PILLARS.map(({ key, color }) => (
            <RevealOnScroll key={key} className="max-w-[340px] flex-[1_1_260px]">
              <div
                className="pillar h-full rounded-[10px] border-[1.5px] px-7 py-8"
                style={{
                  borderColor: "var(--color-accent-gold)",
                  background: "linear-gradient(160deg, rgba(244,239,250,.7), rgba(230,219,241,.4))",
                  boxShadow: "inset 0 0 0 4px rgba(99,48,138,.1)",
                }}
              >
                <div className="mb-4 h-[52px] w-[52px]" style={{ color }}>
                  <CrossIcon className="h-full w-full" />
                </div>
                <h3
                  className="mb-1 font-ethiopic text-[28px] font-bold"
                  style={{ color: "var(--color-primary-700)" }}
                >
                  {t(`pillar${key}Title`)}
                </h3>
                <div className="mb-3 font-fell text-sm tracking-[.14em]" style={{ color }}>
                  {t(`pillar${key}Time`)}
                </div>
                <p
                  className="m-0 font-cardo text-[18px]"
                  style={{ lineHeight: 1.7, color: "var(--color-ink-soft)" }}
                >
                  {t(`pillar${key}Desc`)}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
