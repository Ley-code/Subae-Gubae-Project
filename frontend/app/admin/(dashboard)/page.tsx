import { getTranslations } from "next-intl/server";
import { registrationsRepo, newsRepo, eventsRepo } from "@meserete/backend";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      className="rounded-lg border-[1.5px] p-6"
      style={{
        borderColor: "var(--color-accent-gold)",
        background: "linear-gradient(160deg, rgba(244,239,250,.7), rgba(230,219,241,.4))",
      }}
    >
      <div className="mb-1 font-cormorant text-4xl font-bold" style={{ color: "var(--color-primary-700)" }}>
        {value}
      </div>
      <div className="font-ethiopic text-sm" style={{ color: "var(--color-ink-soft)" }}>
        {label}
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const t = await getTranslations("admin.dashboard");
  const [pending, news, events] = await Promise.all([
    registrationsRepo.countRegistrationsByStatus("PENDING"),
    newsRepo.listPublishedNews(),
    eventsRepo.listUpcomingEvents(),
  ]);

  return (
    <div>
      <h1 className="m-0 mb-6 font-ethiopic text-2xl font-bold" style={{ color: "var(--color-primary-700)" }}>
        {t("title")}
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label={t("pendingRegistrations")} value={pending} />
        <StatCard label={t("publishedNews")} value={news.length} />
        <StatCard label={t("upcomingEvents")} value={events.length} />
      </div>
    </div>
  );
}
