import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { materialsRepo, CLASS_GRADES } from "@meserete/backend";
import RevealOnScroll from "@/components/RevealOnScroll";

type SearchParams = Promise<{ classGrade?: string }>;

const FILE_TYPE_LABEL: Record<string, string> = {
  PDF: "PDF",
  DOC: "DOC",
  AUDIO: "🎵",
  VIDEO: "🎬",
  OTHER: "ፋይል",
};

export default async function MaterialsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const t = await getTranslations("materials");
  const { classGrade } = await searchParams;
  const materials = await materialsRepo.listMaterials(classGrade);

  return (
    <div style={{ padding: "clamp(40px,6vw,80px) 0" }}>
      <div className="mx-auto max-w-[900px] px-8">
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
            href="/materials"
            className="navlink rounded-full border px-4 py-1.5 font-ethiopic text-sm no-underline"
            style={{
              borderColor: "var(--color-accent-gold)",
              background: !classGrade ? "var(--color-primary-700)" : "transparent",
              color: !classGrade ? "var(--color-parchment)" : "var(--color-primary-700)",
            }}
          >
            {t("allGrades")}
          </a>
          {CLASS_GRADES.map((grade) => (
            <a
              key={grade}
              href={`/materials?classGrade=${encodeURIComponent(grade)}`}
              className="navlink rounded-full border px-4 py-1.5 font-ethiopic text-sm no-underline"
              style={{
                borderColor: "var(--color-accent-gold)",
                background: classGrade === grade ? "var(--color-primary-700)" : "transparent",
                color: classGrade === grade ? "var(--color-parchment)" : "var(--color-primary-700)",
              }}
            >
              {grade}
            </a>
          ))}
        </div>

        {materials.length === 0 ? (
          <p className="text-center font-cardo" style={{ color: "var(--color-ink-soft)" }}>
            {t("empty")}
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {materials.map((material) => (
              <RevealOnScroll key={material.id}>
                <div
                  className="flex items-center justify-between gap-4 rounded-lg border-[1.5px] px-5 py-4"
                  style={{
                    borderColor: "var(--color-accent-gold)",
                    background: "linear-gradient(160deg, rgba(244,239,250,.7), rgba(230,219,241,.4))",
                  }}
                >
                  <div>
                    <div
                      className="mb-1 font-fell text-[11px] tracking-[.14em]"
                      style={{ color: "var(--color-accent-green)" }}
                    >
                      {material.classGrade} · {FILE_TYPE_LABEL[material.fileType]}
                    </div>
                    <Link
                      href={`/materials/${material.id}`}
                      className="font-ethiopic text-lg font-semibold no-underline"
                      style={{ color: "var(--color-primary-700)" }}
                    >
                      {material.title}
                    </Link>
                  </div>
                  <a
                    href={`/api/materials/${material.id}/download`}
                    className="btnp flex-none rounded px-4 py-2 font-ethiopic text-sm font-semibold no-underline"
                    style={{
                      background: "linear-gradient(180deg, var(--color-accent-gold-light), var(--color-accent-gold))",
                      color: "var(--color-primary-900)",
                    }}
                  >
                    {t("download")}
                  </a>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
