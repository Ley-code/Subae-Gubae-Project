import Image from "next/image";
import { useTranslations } from "next-intl";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionDivider from "@/components/SectionDivider";

export type GalleryTeaserItem = {
  slug: string;
  title: string;
  image?: string;
};

type GalleryTeaserProps = {
  items: GalleryTeaserItem[];
};

/**
 * Homepage gallery teaser — new component. Same antique visual language,
 * square photo tiles with a thin double-border edge instead of full
 * FramedImage diamonds (kept lighter-weight for a 3-up grid).
 */
export default function GalleryTeaser({ items }: GalleryTeaserProps) {
  const t = useTranslations("home");
  const shown = items.slice(0, 3);

  return (
    <section id="gallery" style={{ scrollMarginTop: "76px", padding: "clamp(30px,4vw,50px) 0 clamp(50px,7vw,90px)" }}>
      <SectionDivider />
      <div className="mx-auto max-w-[1120px] px-8 pt-8">
        <RevealOnScroll className="mb-8 flex items-end justify-between gap-4">
          <h2
            className="m-0 font-ethiopic font-bold"
            style={{ fontSize: "clamp(26px,3.6vw,40px)", color: "var(--color-primary-700)" }}
          >
            {t("galleryTitle")}
          </h2>
          <a
            href="/gallery"
            className="navlink font-fell text-xs tracking-[.14em] text-primary-600 no-underline"
          >
            {t("galleryMore")}
          </a>
        </RevealOnScroll>

        {shown.length === 0 ? (
          <p className="font-cardo text-base" style={{ color: "var(--color-ink-soft)" }}>
            —
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {shown.map((item) => (
              <RevealOnScroll key={item.slug}>
                <a
                  href={`/gallery#${item.slug}`}
                  className="relative block overflow-hidden rounded-[6px] no-underline"
                  style={{ boxShadow: "0 14px 30px rgba(23,10,34,.2)" }}
                >
                  <div className="relative aspect-square w-full">
                    {item.image && (
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    )}
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(180deg, transparent 55%, rgba(23,10,34,.75))" }}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-[6px] rounded-[4px] border-2"
                      style={{ borderColor: "var(--color-accent-gold)" }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className="font-ethiopic text-sm font-semibold text-parchment">
                        {item.title}
                      </span>
                    </div>
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
