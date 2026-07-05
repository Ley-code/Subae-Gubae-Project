import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { mezmurRepo } from "@meserete/backend";
import RevealOnScroll from "@/components/RevealOnScroll";

type Params = Promise<{ id: string }>;

export default async function HymnDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const t = await getTranslations("mezmur");
  const hymn = await mezmurRepo.getHymnById(id);

  if (!hymn) notFound();

  return (
    <div style={{ padding: "clamp(40px,6vw,80px) 0" }}>
      <article className="mx-auto max-w-[700px] px-8">
        <RevealOnScroll>
          {hymn.category && (
            <div
              className="mb-2 font-fell text-[13px] tracking-[.2em]"
              style={{ color: "var(--color-accent-green-dark)" }}
            >
              {hymn.category}
            </div>
          )}
          <h1
            className="m-0 mb-6 font-ethiopic font-bold"
            style={{ fontSize: "clamp(28px,4vw,44px)", color: "var(--color-primary-700)" }}
          >
            {hymn.title}
          </h1>

          {hymn.audioUrl && (
            <audio controls className="mb-8 w-full">
              <source src={hymn.audioUrl} />
              {t("listen")}
            </audio>
          )}

          <p
            className="whitespace-pre-line font-ethiopic"
            style={{ fontSize: "clamp(18px,2vw,22px)", lineHeight: 2, color: "var(--color-ink)" }}
          >
            {hymn.lyrics}
          </p>
        </RevealOnScroll>
      </article>
    </div>
  );
}
