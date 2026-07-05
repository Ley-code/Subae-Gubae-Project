import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { galleryRepo, GALLERY_CATEGORIES } from "@meserete/backend";
import RevealOnScroll from "@/components/RevealOnScroll";

type SearchParams = Promise<{ category?: string }>;

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const t = await getTranslations("gallery");
  const { category } = await searchParams;
  const items = await galleryRepo.listGalleryItems(category);

  return (
    <div style={{ padding: "clamp(40px,6vw,80px) 0" }}>
      <div className="mx-auto max-w-[1160px] px-8">
        <RevealOnScroll className="mb-8 text-center">
          <h1
            className="m-0 font-ethiopic font-bold"
            style={{ fontSize: "clamp(30px,4.4vw,50px)", color: "var(--color-primary-700)" }}
          >
            {t("title")}
          </h1>
        </RevealOnScroll>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <a
            href="/gallery"
            className="navlink rounded-full border px-4 py-1.5 font-ethiopic text-sm no-underline"
            style={{
              borderColor: "var(--color-accent-gold)",
              background: !category ? "var(--color-primary-700)" : "transparent",
              color: !category ? "var(--color-parchment)" : "var(--color-primary-700)",
            }}
          >
            {t("all")}
          </a>
          {GALLERY_CATEGORIES.map((cat) => (
            <a
              key={cat}
              href={`/gallery?category=${encodeURIComponent(cat)}`}
              className="navlink rounded-full border px-4 py-1.5 font-ethiopic text-sm no-underline"
              style={{
                borderColor: "var(--color-accent-gold)",
                background: category === cat ? "var(--color-primary-700)" : "transparent",
                color: category === cat ? "var(--color-parchment)" : "var(--color-primary-700)",
              }}
            >
              {cat}
            </a>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="text-center font-cardo" style={{ color: "var(--color-ink-soft)" }}>
            {t("empty")}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {items.map((item) => (
              <RevealOnScroll key={item.id}>
                <div id={item.id} className="relative aspect-square overflow-hidden rounded-md">
                  <Image src={item.url} alt={item.title ?? ""} fill className="object-cover" />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-[4px] rounded-[3px] border-2"
                    style={{ borderColor: "var(--color-accent-gold)" }}
                  />
                  {item.title && (
                    <div
                      className="absolute inset-x-0 bottom-0 p-2 font-ethiopic text-xs font-semibold text-parchment"
                      style={{ background: "linear-gradient(180deg, transparent, rgba(23,10,34,.85))" }}
                    >
                      {item.title}
                    </div>
                  )}
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
