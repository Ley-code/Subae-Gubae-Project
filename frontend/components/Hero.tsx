import Image from "next/image";
import { useTranslations } from "next-intl";
import RevealOnScroll from "@/components/RevealOnScroll";

/**
 * Homepage hero. The prototype used an AI-generated Mary icon as the framed
 * visual — replaced here with a real photo of the church exterior
 * (hero/church-exterior.jpg), evenly framed with no cropping. The logo lives
 * in the header instead of overlaid on this photo.
 */
export default function Hero() {
  const t = useTranslations("home");

  return (
    <section
      id="home"
      className="relative"
      style={{ scrollMarginTop: "76px", padding: "clamp(46px,7vw,92px) 0 clamp(30px,4vw,54px)" }}
    >
      <div className="mx-auto max-w-[1160px] px-8">
        <div
          className="relative rounded-xl border-2 p-7 md:p-14"
          style={{
            borderColor: "var(--color-accent-gold)",
            background:
              "linear-gradient(160deg, rgba(244,239,250,.55), rgba(230,219,241,.28))",
            boxShadow:
              "inset 0 0 0 7px rgba(99,48,138,.14), inset 0 0 0 9px rgba(201,151,31,.55), 0 26px 60px rgba(23,10,34,.22)",
          }}
        >
          <div className="flex flex-wrap items-center gap-8 md:gap-14">
            <RevealOnScroll className="in min-w-[300px] flex-[1_1_380px]">
              <div className="mb-5 flex items-center gap-3 font-fell text-[13px] tracking-[.22em] text-primary-600">
                <span className="h-[1.5px] w-[22px]" style={{ background: "var(--color-accent-gold)" }} />
                <span className="font-ethiopic text-sm font-semibold tracking-wide text-accent-green">
                  {t("heroEyebrow")}
                </span>
                <span className="h-[1.5px] w-[22px]" style={{ background: "var(--color-accent-gold)" }} />
              </div>

              <h1
                className="m-0 font-ethiopic font-extrabold leading-[1.02]"
                style={{
                  fontSize: "clamp(40px,6vw,74px)",
                  color: "var(--color-primary-700)",
                  textShadow: "0 2px 0 rgba(201,151,31,.55), 0 3px 14px rgba(23,10,34,.25)",
                }}
              >
                {t("heroTitle1")}
                <br />
                {t("heroTitle2")}
              </h1>

              <div
                className="my-4 font-ethiopic font-semibold"
                style={{ fontSize: "clamp(20px,2.6vw,28px)", color: "var(--color-accent-green)" }}
              >
                {t("heroSubtitle")}
              </div>

              <div className="my-5 flex items-center gap-3.5">
                <span className="h-[1.5px] w-14" style={{ background: "var(--color-accent-gold)" }} />
                <span
                  className="h-[11px] w-[11px] flex-none rotate-45 border"
                  style={{ borderColor: "var(--color-primary-600)", borderWidth: "1.5px" }}
                />
                <span
                  className="h-[1.5px] max-w-[160px] flex-1"
                  style={{ background: "linear-gradient(90deg, var(--color-accent-gold), transparent)" }}
                />
              </div>

              <p
                className="mb-8 max-w-[46ch] font-cardo italic"
                style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.65, color: "var(--color-ink-soft)" }}
              >
                {t("heroDescription")}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  className="btnp inline-block rounded-[5px] border px-8 py-3.5 font-ethiopic font-semibold no-underline"
                  href="#program"
                  style={{
                    background: "linear-gradient(180deg, var(--color-accent-gold-light), var(--color-accent-gold))",
                    color: "var(--color-primary-950)",
                    borderColor: "#8a6a1e",
                    boxShadow:
                      "0 7px 20px rgba(23,10,34,.28), inset 0 1px 0 rgba(255,255,255,.45)",
                  }}
                >
                  {t("ctaProgram")}
                </a>
                <a
                  className="btns inline-block rounded-[5px] border-[1.5px] px-8 py-3.5 font-ethiopic font-semibold no-underline transition-colors"
                  href="#register"
                  style={{ color: "var(--color-primary-700)", borderColor: "var(--color-accent-gold)" }}
                >
                  {t("ctaRegister")}
                </a>
              </div>
            </RevealOnScroll>

            <RevealOnScroll className="in flex min-w-[270px] flex-[0_1_380px] justify-center">
              <div
                className="relative w-[min(378px,84vw)]"
                style={{ animation: "floaty 7s ease-in-out infinite" }}
              >
                <div
                  aria-hidden="true"
                  className="absolute z-[1]"
                  style={{
                    inset: "-12% -10% -2% -10%",
                    background:
                      "radial-gradient(circle at 50% 36%, rgba(201,151,31,.85), rgba(201,151,31,.2) 46%, transparent 70%)",
                    filter: "blur(8px)",
                    animation: "haloPulse 5.5s ease-in-out infinite",
                  }}
                />

                <div className="relative z-[2] overflow-hidden rounded-lg shadow-[0_34px_70px_rgba(15,8,20,.5)]">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src="/images/hero/church-exterior.jpg"
                      alt="ታዕካ ነገሥት በአታ ለማርያም ቤተ ክርስቲያን"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-[-15px] z-[3] rounded-[10px]"
                  style={{
                    border: "3px solid var(--color-accent-gold)",
                    boxShadow:
                      "inset 0 0 0 5px rgba(36,16,53,.85), inset 0 0 0 8px var(--color-accent-gold), 0 18px 40px rgba(15,8,20,.35)",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute z-[4] h-[15px] w-[15px] rotate-45"
                  style={{ left: "-22px", top: "-22px", background: "var(--color-accent-gold)", border: "2px solid var(--color-primary-700)" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute z-[4] h-[15px] w-[15px] rotate-45"
                  style={{ right: "-22px", top: "-22px", background: "var(--color-accent-gold)", border: "2px solid var(--color-primary-700)" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute z-[4] h-[15px] w-[15px] rotate-45"
                  style={{ left: "-22px", bottom: "-22px", background: "var(--color-accent-gold)", border: "2px solid var(--color-primary-700)" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute z-[4] h-[15px] w-[15px] rotate-45"
                  style={{ right: "-22px", bottom: "-22px", background: "var(--color-accent-gold)", border: "2px solid var(--color-primary-700)" }}
                />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
