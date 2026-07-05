import Image from "next/image";
import { notFound } from "next/navigation";
import { eventsRepo } from "@meserete/backend";
import RevealOnScroll from "@/components/RevealOnScroll";

type Params = Promise<{ id: string }>;

function formatDate(date: Date) {
  return date.toLocaleDateString("am-ET", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export default async function EventDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const event = await eventsRepo.getEventById(id);

  if (!event || !event.published) notFound();

  return (
    <div style={{ padding: "clamp(40px,6vw,80px) 0" }}>
      <article className="mx-auto max-w-[760px] px-8">
        <RevealOnScroll>
          <div
            className="mb-2 font-fell text-[13px] tracking-[.2em]"
            style={{ color: "var(--color-accent-green)" }}
          >
            {formatDate(event.startsAt)}
          </div>
          <h1
            className="m-0 mb-2 font-ethiopic font-bold"
            style={{ fontSize: "clamp(28px,4vw,44px)", color: "var(--color-primary-700)" }}
          >
            {event.title}
          </h1>
          {event.location && (
            <p className="m-0 mb-6 font-cardo text-base" style={{ color: "var(--color-ink-soft)" }}>
              {event.location}
            </p>
          )}

          {event.coverImage && (
            <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-md">
              <Image src={event.coverImage} alt="" fill className="object-cover" />
            </div>
          )}

          <p
            className="drop-cap whitespace-pre-line font-cardo"
            style={{ fontSize: "clamp(17px,1.9vw,20px)", lineHeight: 1.8, color: "var(--color-ink-soft)" }}
          >
            {event.description}
          </p>
        </RevealOnScroll>
      </article>
    </div>
  );
}
