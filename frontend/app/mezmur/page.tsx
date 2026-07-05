import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { mezmurRepo } from "@meserete/backend";
import RevealOnScroll from "@/components/RevealOnScroll";

export default async function MezmurPage() {
  const t = await getTranslations("mezmur");
  const hymns = await mezmurRepo.listHymns();

  return (
    <div style={{ padding: "clamp(40px,6vw,80px) 0" }}>
      <div className="mx-auto max-w-[800px] px-8">
        <RevealOnScroll className="mb-10 text-center">
          <h1
            className="m-0 font-ethiopic font-bold"
            style={{ fontSize: "clamp(30px,4.4vw,50px)", color: "var(--color-accent-green-dark)" }}
          >
            {t("title")}
          </h1>
        </RevealOnScroll>

        {hymns.length === 0 ? (
          <p className="text-center font-cardo" style={{ color: "var(--color-ink-soft)" }}>
            {t("empty")}
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {hymns.map((hymn) => (
              <RevealOnScroll key={hymn.id}>
                <Link
                  href={`/mezmur/${hymn.id}`}
                  className="flex items-center justify-between rounded-lg border-[1.5px] px-5 py-4 no-underline"
                  style={{
                    borderColor: "var(--color-accent-green)",
                    background: "linear-gradient(160deg, rgba(244,239,250,.7), rgba(230,219,241,.4))",
                  }}
                >
                  <span
                    className="font-ethiopic text-lg font-semibold"
                    style={{ color: "var(--color-primary-700)" }}
                  >
                    {hymn.title}
                  </span>
                  {hymn.category && (
                    <span
                      className="font-fell text-xs tracking-[.1em]"
                      style={{ color: "var(--color-accent-green-dark)" }}
                    >
                      {hymn.category}
                    </span>
                  )}
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
