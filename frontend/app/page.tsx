import { newsRepo, eventsRepo, galleryRepo } from "@meserete/backend";
import Hero from "@/components/Hero";
import PhotoStrip from "@/components/PhotoStrip";
import AboutWelcome from "@/components/AboutWelcome";
import SectionDivider from "@/components/SectionDivider";
import Kidase from "@/components/Kidase";
import MezmurTeaser from "@/components/MezmurTeaser";
import ProgramPillars from "@/components/ProgramPillars";
import NewsTeaser from "@/components/NewsTeaser";
import EventsTeaser from "@/components/EventsTeaser";
import GalleryTeaser from "@/components/GalleryTeaser";

function formatDate(date: Date) {
  return date.toLocaleDateString("am-ET", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function Home() {
  const [news, events, gallery] = await Promise.all([
    newsRepo.listPublishedNews(),
    eventsRepo.listUpcomingEvents(),
    galleryRepo.listGalleryItems(),
  ]);

  return (
    <>
      <Hero />
      <SectionDivider />
      <PhotoStrip />
      <AboutWelcome />
      <Kidase />
      <SectionDivider />
      <MezmurTeaser />
      <ProgramPillars />
      <NewsTeaser
        items={news.slice(0, 3).map((n) => ({
          slug: n.id,
          title: n.title,
          date: n.publishedAt ? formatDate(n.publishedAt) : undefined,
          image: n.coverImage ?? undefined,
        }))}
      />
      <EventsTeaser
        items={events.slice(0, 3).map((e) => ({
          slug: e.id,
          title: e.title,
          date: formatDate(e.startsAt),
          image: e.coverImage ?? undefined,
        }))}
      />
      <GalleryTeaser
        items={gallery.slice(0, 6).map((g) => ({
          slug: g.id,
          title: g.title ?? g.category ?? "",
          image: g.url,
        }))}
      />
    </>
  );
}
