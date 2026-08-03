import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";

const STRIP = [
  {
    src: "/images/hero/procession-crowd.jpg",
    alt: "የገዳሙ ሰልፍ",
  },
  {
    src: "/images/kidase/candlelight-procession.jpg",
    alt: "የሻማ ሰልፍ",
  },
  {
    src: "/images/kidase/torchlight-interior.jpg",
    alt: "በቤተ ክርስቲያን ውስጥ",
  },
  {
    src: "/images/kidase/clergy-with-staffs.jpg",
    alt: "ካህናት በትረ መስቀል",
  },
] as const;

/**
 * Full-bleed photo strip of real parish life — adds imagery density between
 * the hero and welcome sections without competing with the hero composition.
 */
export default function PhotoStrip() {
  return (
    <section aria-label="ከገዳማችን ሕይወት" className="overflow-hidden">
      <div className="mx-auto grid max-w-[1160px] grid-cols-2 gap-2 px-4 sm:grid-cols-4 sm:gap-3 sm:px-8">
        {STRIP.map((item) => (
          <RevealOnScroll key={item.src}>
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-md"
              style={{
                boxShadow: "0 12px 28px rgba(23,10,34,.22)",
                border: "1.5px solid rgba(201,151,31,.55)",
              }}
            >
              <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width:640px) 50vw, 25vw" />
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
