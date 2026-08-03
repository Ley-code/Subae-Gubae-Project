import Image from "next/image";
import { useTranslations } from "next-intl";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionDivider from "@/components/SectionDivider";

export type EventsTeaserItem = {
  slug: string;
  title: string;
  date?: string;
  image?: string;
};

type EventsTeaserProps = {
  items: EventsTeaserItem[];
};

/**
 * Homepage events teaser — new component. Same antique framed-card treatment
 * as NewsTeaser but with a gold accent corner ribbon-style date badge.
 */
export default function EventsTeaser({ items }: EventsTeaserProps) {
  const t = useTranslations("home");
  const shown = items.slice(0, 3);

  return (
    <section id="events" style={{ scrollMarginTop: "76px", padding: "clamp(30px,4vw,50px) 0" }}>
      <SectionDivider />
      <div className="mx-auto max-w-[1120px] px-8 pt-8">
        <RevealOnScroll className="mb-8 flex items-end justify-between gap-4">
          <h2
            className="m-0 font-ethiopic font-bold"
            style={{ fontSize: "clamp(28px,3.8vw,44px)", color: "var(--color-primary-700)" }}
          >
            {t("eventsTitle")}
          </h2>
          <a
            href="/events"
            className="navlink font-fell text-xs tracking-[.14em] text-primary-600 no-underline"
          >
            {t("eventsMore")}
          </a>
        </RevealOnScroll>

        {shown.length === 0 ? (
          <p className="font-cardo text-base" style={{ color: "var(--color-ink-soft)" }}>
            —
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {shown.map((item) => (
              <RevealOnScroll key={item.slug}>
                <a
                  href={`/events/${item.slug}`}
                  className="relative block h-full overflow-hidden rounded-[8px] border-[1.5px] no-underline"
                  style={{
                    borderColor: "var(--color-accent-green)",
                    background: "linear-gradient(160deg, rgba(244,239,250,.7), rgba(230,219,241,.4))",
                    boxShadow: "0 14px 30px rgba(23,10,34,.16)",
                  }}
                >
                  {item.image && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image src={item.image} alt="" fill className="object-cover" />
                      {item.date && (
                        <div
                          className="absolute left-3 top-3 rounded px-3 py-1 font-fell text-[11px] tracking-[.1em]"
                          style={{
                            background: "var(--color-primary-800)",
                            color: "var(--color-accent-gold-light)",
                            border: "1px solid var(--color-accent-gold)",
                          }}
                        >
                          {item.date}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-5">
                    <h3
                      className="m-0 font-ethiopic text-lg font-semibold"
                      style={{ color: "var(--color-primary-700)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </a>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
