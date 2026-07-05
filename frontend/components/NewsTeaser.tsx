import Image from "next/image";
import { useTranslations } from "next-intl";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionDivider from "@/components/SectionDivider";

export type NewsTeaserItem = {
  slug: string;
  title: string;
  date?: string;
  image?: string;
};

type NewsTeaserProps = {
  items: NewsTeaserItem[];
};

/**
 * Homepage news teaser — new component (the prototype had none). Renders up
 * to 3 items in the same framed/antique visual language as the rest of the
 * site: parchment card, thin gold border, small diamond corner ornaments.
 */
export default function NewsTeaser({ items }: NewsTeaserProps) {
  const t = useTranslations("home");
  const shown = items.slice(0, 3);

  return (
    <section id="news" style={{ scrollMarginTop: "76px", padding: "clamp(30px,4vw,50px) 0" }}>
      <SectionDivider />
      <div className="mx-auto max-w-[1120px] px-8 pt-8">
        <RevealOnScroll className="mb-8 flex items-end justify-between gap-4">
          <h2
            className="m-0 font-ethiopic font-bold"
            style={{ fontSize: "clamp(26px,3.6vw,40px)", color: "var(--color-primary-700)" }}
          >
            {t("newsTitle")}
          </h2>
          <a
            href="/news"
            className="navlink font-fell text-xs tracking-[.14em] text-primary-600 no-underline"
          >
            {t("newsMore")}
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
                  href={`/news/${item.slug}`}
                  className="group relative block h-full overflow-hidden rounded-[8px] border-[1.5px] no-underline"
                  style={{
                    borderColor: "var(--color-accent-gold)",
                    background: "linear-gradient(160deg, rgba(244,239,250,.7), rgba(230,219,241,.4))",
                    boxShadow: "0 14px 30px rgba(23,10,34,.16)",
                  }}
                >
                  {item.image && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image src={item.image} alt="" fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-5">
                    {item.date && (
                      <div className="mb-1.5 font-fell text-[11px] tracking-[.14em] text-accent-green">
                        {item.date}
                      </div>
                    )}
                    <h3
                      className="m-0 font-ethiopic text-lg font-semibold"
                      style={{ color: "var(--color-primary-700)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute -left-[7px] -top-[7px] h-[11px] w-[11px] rotate-45"
                    style={{ background: "var(--color-accent-gold)" }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -right-[7px] -top-[7px] h-[11px] w-[11px] rotate-45"
                    style={{ background: "var(--color-accent-gold)" }}
                  />
                </a>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
