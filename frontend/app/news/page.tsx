import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { newsRepo } from "@meserete/backend";
import RevealOnScroll from "@/components/RevealOnScroll";

function formatDate(date: Date) {
  return date.toLocaleDateString("am-ET", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsPage() {
  const t = await getTranslations("news");
  const news = await newsRepo.listPublishedNews();

  return (
    <div style={{ padding: "clamp(40px,6vw,80px) 0" }}>
      <div className="mx-auto max-w-[1000px] px-8">
        <RevealOnScroll className="mb-10 text-center">
          <h1
            className="m-0 font-ethiopic font-bold"
            style={{ fontSize: "clamp(30px,4.4vw,50px)", color: "var(--color-primary-700)" }}
          >
            {t("title")}
          </h1>
        </RevealOnScroll>

        {news.length === 0 ? (
          <p className="text-center font-cardo" style={{ color: "var(--color-ink-soft)" }}>
            {t("empty")}
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {news.map((item) => (
              <RevealOnScroll key={item.id}>
                <Link
                  href={`/news/${item.id}`}
                  className="flex flex-col gap-4 overflow-hidden rounded-lg border-[1.5px] p-5 no-underline sm:flex-row"
                  style={{
                    borderColor: "var(--color-accent-gold)",
                    background:
                      "linear-gradient(160deg, rgba(244,239,250,.7), rgba(230,219,241,.4))",
                  }}
                >
                  {item.coverImage && (
                    <div className="relative h-40 w-full flex-none overflow-hidden rounded-md sm:w-56">
                      <Image src={item.coverImage} alt="" fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    {item.publishedAt && (
                      <div
                        className="mb-1.5 font-fell text-[11px] tracking-[.14em]"
                        style={{ color: "var(--color-accent-green)" }}
                      >
                        {formatDate(item.publishedAt)}
                      </div>
                    )}
                    <h2
                      className="m-0 mb-2 font-ethiopic text-xl font-semibold"
                      style={{ color: "var(--color-primary-700)" }}
                    >
                      {item.title}
                    </h2>
                    <p
                      className="m-0 font-cardo text-[15px] leading-relaxed"
                      style={{ color: "var(--color-ink-soft)" }}
                    >
                      {item.body.slice(0, 140)}
                      {item.body.length > 140 ? "…" : ""}
                    </p>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
