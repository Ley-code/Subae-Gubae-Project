import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { eventsRepo, type EventInput } from "@meserete/backend";
import EventForm from "@/components/admin/EventForm";

type Params = Promise<{ id: string }>;

function toDatetimeLocal(date: Date | null) {
  if (!date) return "";
  const d = new Date(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default async function AdminEventFormPage({ params }: { params: Params }) {
  const { id } = await params;
  const t = await getTranslations("admin.events");
  const isNew = id === "new";

  let initialData: EventInput | undefined;
  if (!isNew) {
    const item = await eventsRepo.getEventById(id);
    if (!item) notFound();
    initialData = {
      slug: item.slug,
      title: item.title,
      description: item.description,
      location: item.location ?? "",
      startsAt: toDatetimeLocal(item.startsAt),
      endsAt: toDatetimeLocal(item.endsAt),
      coverImage: item.coverImage ?? "",
      published: item.published,
    };
  }

  return (
    <div>
      <h1 className="m-0 mb-6 font-ethiopic text-2xl font-bold" style={{ color: "var(--color-primary-700)" }}>
        {isNew ? t("formTitleNew") : t("formTitleEdit")}
      </h1>
      <EventForm id={isNew ? undefined : id} initialData={initialData} />
    </div>
  );
}
