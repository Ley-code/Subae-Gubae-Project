import Image from "next/image";
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
    </svg>
  );
}

/**
 * Censer + rising-incense-smoke section, ported from the prototype. The
 * `.kidase.live .smoke` gating (see globals.css) starts the smoke keyframes
 * only once RevealOnScroll adds the "live" class via IntersectionObserver.
 * Background recolored from near-black-brown to deep purple-black; paired
 * with a real photo from /images/kidase/ behind the censer illustration.
 */
export default function Kidase() {
  const t = useTranslations("home");

  return (
    <RevealOnScroll live>
      <section
        id="kidase"
        className="kidase relative overflow-hidden border-y-2"
        style={{
          scrollMarginTop: "76px",
          background:
            "radial-gradient(90% 70% at 22% 40%, #2b1240, #0f0818 62%), linear-gradient(180deg, #1a0d28, #0b0512 55%, #1a0d28)",
          color: "var(--color-parchment-dark)",
          padding: "clamp(56px,8vw,110px) 0",
          borderColor: "var(--color-accent-gold)",
        }}
      >
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-6 px-8 md:gap-14">
          <div className="relative flex min-w-[250px] flex-[0_1_360px] items-stretch justify-center self-stretch">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-[10%]"
              style={{ background: "radial-gradient(circle at 50% 40%, rgba(201,151,31,.16), transparent 62%)" }}
            />
            <div className="relative w-[min(300px,72vw)]">
              {/* Real photo backdrop behind the censer illustration */}
              <div className="absolute inset-0 -z-[1] overflow-hidden rounded-lg opacity-70">
                <Image
                  src="/images/kidase/censer-and-cross.jpg"
                  alt=""
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(15,8,20,.2), rgba(15,8,20,.85))" }}
                />
              </div>

              <Image
                src="/textures/censer-cut.png"
                alt="የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ጥና"
                width={300}
                height={420}
                className="relative z-[2] block w-full"
                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,.7))" }}
              />
              <Image
                src="/textures/smoke.png"
                alt=""
                aria-hidden="true"
                width={120}
                height={200}
                className="smoke pointer-events-none absolute z-[3]"
                style={{
                  left: "30%",
                  bottom: "18%",
                  width: "120px",
                  transformOrigin: "bottom center",
                  mixBlendMode: "screen",
                  animation: "smokeRise 9s ease-in-out infinite",
                }}
              />
              <Image
                src="/textures/smoke.png"
                alt=""
                aria-hidden="true"
                width={150}
                height={240}
                className="smoke pointer-events-none absolute z-[3]"
                style={{
                  left: "22%",
                  bottom: "16%",
                  width: "150px",
                  transformOrigin: "bottom center",
                  mixBlendMode: "screen",
                  opacity: 0.8,
                  animation: "smokeRise2 12s ease-in-out infinite 2s",
                }}
              />
              <Image
                src="/textures/smoke.png"
                alt=""
                aria-hidden="true"
                width={100}
                height={180}
                className="smoke pointer-events-none absolute z-[3]"
                style={{
                  left: "36%",
                  bottom: "20%",
                  width: "100px",
                  transformOrigin: "bottom center",
                  mixBlendMode: "screen",
                  animation: "smokeRise 10.5s ease-in-out infinite 4.5s",
                }}
              />
              <Image
                src="/textures/smoke.png"
                alt=""
                aria-hidden="true"
                width={130}
                height={210}
                className="smoke pointer-events-none absolute z-[3]"
                style={{
                  left: "16%",
                  bottom: "15%",
                  width: "130px",
                  transformOrigin: "bottom center",
                  mixBlendMode: "screen",
                  animation: "smokeRise2 13.5s ease-in-out infinite 6.5s",
                }}
              />
            </div>
          </div>

          <div className="relative min-w-[300px] flex-[1_1_380px]">
            <Image
              src="/textures/smoke.png"
              alt=""
              aria-hidden="true"
              width={200}
              height={320}
              className="smoke pointer-events-none absolute z-[1]"
              style={{
                left: "-30px",
                top: "20px",
                width: "200px",
                mixBlendMode: "screen",
                opacity: 0.5,
                animation: "smokeDrift 16s linear infinite 3s",
              }}
            />
            <div className="relative z-[2]">
              <div className="mb-3.5 flex items-center gap-3 font-fell text-[13px] tracking-[.22em] text-accent-gold">
                <span className="h-10 w-[30px] flex-none text-accent-gold">
                  <CrossIcon className="h-full w-full" />
                </span>
                {t("kidaseEyebrow")}
              </div>
              <h2
                className="mb-4 font-ethiopic font-extrabold leading-none"
                style={{
                  fontSize: "clamp(38px,5.5vw,66px)",
                  color: "var(--color-accent-gold-light)",
                  textShadow: "0 2px 18px rgba(0,0,0,.6)",
                }}
              >
                {t("kidaseTitle")}
              </h2>
              <p
                className="mb-4 font-cardo"
                style={{ fontSize: "clamp(17px,1.9vw,20px)", lineHeight: 1.8, color: "var(--color-parchment-dark)" }}
              >
                {t("kidaseP1")}
              </p>
              <p
                className="mb-6 font-cardo"
                style={{ fontSize: "clamp(17px,1.9vw,20px)", lineHeight: 1.8, color: "var(--color-primary-300)" }}
              >
                {t("kidaseP2")}
              </p>
              <div
                className="border-l-[3px] py-1.5 pl-5 font-garamond italic"
                style={{
                  borderColor: "var(--color-accent-gold)",
                  fontSize: "clamp(19px,2.3vw,25px)",
                  color: "var(--color-accent-gold-light)",
                }}
              >
                {t("kidaseVerse")}
              </div>
            </div>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
}
