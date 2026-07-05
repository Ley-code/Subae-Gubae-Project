import { getTranslations } from "next-intl/server";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionDivider from "@/components/SectionDivider";
import FramedImage from "@/components/FramedImage";
import { historySections } from "@/content/history";

export default async function HistoryPage() {
  const t = await getTranslations("history");

  return (
    <div style={{ padding: "clamp(40px,6vw,80px) 0" }}>
      <div className="mx-auto max-w-[900px] px-8">
        <RevealOnScroll className="mb-10 text-center">
          <div
            className="mb-2 font-fell text-[13px] tracking-[.2em]"
            style={{ color: "var(--color-accent-red)" }}
          >
            {t("eyebrow")}
          </div>
          <h1
            className="m-0 font-ethiopic font-bold"
            style={{
              fontSize: "clamp(30px,4.4vw,50px)",
              color: "var(--color-primary-700)",
            }}
          >
            {t("title")}
          </h1>
        </RevealOnScroll>

        <div className="flex flex-col gap-14">
          {historySections.map((section) => (
            <RevealOnScroll key={section.id}>
              <article>
                <h2
                  className="mb-4 font-ethiopic text-2xl font-bold"
                  style={{ color: "var(--color-primary-600)" }}
                >
                  {section.title}
                </h2>

                {section.image && (
                  <div className="mb-6 max-w-[340px]">
                    <FramedImage
                      src={section.image}
                      alt={section.title}
                      aspectRatio="4 / 3"
                      borderColor="green"
                      caption={
                        "imageCaption" in section
                          ? section.imageCaption
                          : undefined
                      }
                    />
                  </div>
                )}

                {section.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className={`font-cardo mb-4 ${i === 0 ? "drop-cap" : ""}`}
                    style={{
                      fontSize: "clamp(17px,1.9vw,20px)",
                      lineHeight: 1.78,
                      color: "var(--color-ink-soft)",
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </article>
              <div className="mt-14">
                <SectionDivider />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
