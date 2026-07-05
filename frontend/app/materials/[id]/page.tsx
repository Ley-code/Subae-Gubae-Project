import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { materialsRepo } from "@meserete/backend";
import RevealOnScroll from "@/components/RevealOnScroll";

type Params = Promise<{ id: string }>;

export default async function MaterialDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const t = await getTranslations("materials");
  const material = await materialsRepo.getMaterialById(id);

  if (!material) notFound();

  return (
    <div style={{ padding: "clamp(40px,6vw,80px) 0" }}>
      <article className="mx-auto max-w-[700px] px-8">
        <RevealOnScroll>
          <div
            className="mb-2 font-fell text-[13px] tracking-[.2em]"
            style={{ color: "var(--color-accent-green)" }}
          >
            {material.classGrade}
          </div>
          <h1
            className="m-0 mb-4 font-ethiopic font-bold"
            style={{ fontSize: "clamp(28px,4vw,40px)", color: "var(--color-primary-700)" }}
          >
            {material.title}
          </h1>
          {material.description && (
            <p
              className="mb-8 font-cardo"
              style={{ fontSize: "18px", lineHeight: 1.7, color: "var(--color-ink-soft)" }}
            >
              {material.description}
            </p>
          )}
          <a
            href={`/api/materials/${material.id}/download`}
            className="btnp inline-block rounded px-6 py-3 font-ethiopic font-semibold no-underline"
            style={{
              background: "linear-gradient(180deg, var(--color-accent-gold-light), var(--color-accent-gold))",
              color: "var(--color-primary-900)",
            }}
          >
            {t("download")}
          </a>
        </RevealOnScroll>
      </article>
    </div>
  );
}
