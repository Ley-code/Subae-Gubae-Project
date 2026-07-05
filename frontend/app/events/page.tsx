import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { eventsRepo } from "@meserete/backend";
import RevealOnScroll from "@/components/RevealOnScroll";

function formatDate(date: Date) {
  return date.toLocaleDateString("am-ET", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

function EventCard({
  event,
}: {
  event: { id: string; title: string; startsAt: Date; location: string | null; coverImage: string | null };
}) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="flex flex-col gap-4 overflow-hidden rounded-lg border-[1.5px] p-5 no-underline sm:flex-row"
      style={{
        borderColor: "var(--color-accent-green)",
        background: "linear-gradient(160deg, rgba(244,239,250,.7), rgba(230,219,241,.4))",
      }}
    >
      {event.coverImage && (
        <div className="relative h-40 w-full flex-none overflow-hidden rounded-md sm:w-56">
          <Image src={event.coverImage} alt="" fill className="object-cover" />
        </div>
      )}
      <div>
        <div
          className="mb-1.5 font-fell text-[11px] tracking-[.14em]"
          style={{ color: "var(--color-accent-green)" }}
        >
          {formatDate(event.startsAt)}
        </div>
        <h2
          className="m-0 mb-2 font-ethiopic text-xl font-semibold"
          style={{ color: "var(--color-primary-700)" }}
        >
          {event.title}
        </h2>
        {event.location && (
          <p className="m-0 font-cardo text-sm" style={{ color: "var(--color-ink-soft)" }}>
            {event.location}
          </p>
        )}
      </div>
    </Link>
  );
}

export default async function EventsPage() {
  const t = await getTranslations("events");
  const [upcoming, past] = await Promise.all([
    eventsRepo.listUpcomingEvents(),
    eventsRepo.listPastEvents(),
  ]);

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

        <h2 className="mb-4 font-ethiopic text-xl font-bold" style={{ color: "var(--color-primary-600)" }}>
          {t("upcoming")}
        </h2>
        {upcoming.length === 0 ? (
          <p className="mb-10 font-cardo" style={{ color: "var(--color-ink-soft)" }}>
            {t("empty")}
          </p>
        ) : (
          <div className="mb-10 flex flex-col gap-6">
            {upcoming.map((event) => (
              <RevealOnScroll key={event.id}>
                <EventCard event={event} />
              </RevealOnScroll>
            ))}
          </div>
        )}

        {past.length > 0 && (
          <>
            <h2 className="mb-4 font-ethiopic text-xl font-bold" style={{ color: "var(--color-primary-600)" }}>
              {t("past")}
            </h2>
            <div className="flex flex-col gap-6 opacity-80">
              {past.map((event) => (
                <RevealOnScroll key={event.id}>
                  <EventCard event={event} />
                </RevealOnScroll>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
