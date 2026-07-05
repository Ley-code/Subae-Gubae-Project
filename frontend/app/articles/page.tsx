import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { articlesRepo } from "@meserete/backend";
import RevealOnScroll from "@/components/RevealOnScroll";

export default async function ArticlesPage() {
  const t = await getTranslations("articles");
  const articles = await articlesRepo.listPublishedArticles();

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

        {articles.length === 0 ? (
          <p className="text-center font-cardo" style={{ color: "var(--color-ink-soft)" }}>
            {t("empty")}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {articles.map((article) => (
              <RevealOnScroll key={article.id}>
                <Link
                  href={`/articles/${article.id}`}
                  className="flex h-full flex-col overflow-hidden rounded-lg border-[1.5px] no-underline"
                  style={{
                    borderColor: "var(--color-accent-gold)",
                    background: "linear-gradient(160deg, rgba(244,239,250,.7), rgba(230,219,241,.4))",
                  }}
                >
                  {article.coverImage && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image src={article.coverImage} alt="" fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-5">
                    {article.category && (
                      <div
                        className="mb-1.5 font-fell text-[11px] tracking-[.14em]"
                        style={{ color: "var(--color-accent-red)" }}
                      >
                        {article.category}
                      </div>
                    )}
                    <h2
                      className="m-0 font-ethiopic text-lg font-semibold"
                      style={{ color: "var(--color-primary-700)" }}
                    >
                      {article.title}
                    </h2>
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
