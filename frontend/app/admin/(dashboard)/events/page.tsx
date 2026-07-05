import { eventsRepo } from "@meserete/backend";
import EventsListPage from "@/components/admin/EventsListPage";

export default async function AdminEventsListPage() {
  const rows = await eventsRepo.listAllEvents();
  return <EventsListPage rows={rows} />;
}
