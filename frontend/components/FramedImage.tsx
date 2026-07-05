import Image from "next/image";

type FrameVariant = "gold" | "green" | "purple";

type FramedImageProps = {
  src: string;
  alt: string;
  /** Inner border/inset accent color; the outer border is always gold, echoing the prototype. */
  borderColor?: FrameVariant;
  caption?: string;
  /** Aspect ratio box (width/height) used for the `fill`-based image; default matches prototype ~4:3ish portraits. */
  aspectRatio?: string;
  /** Diamond corner ornaments, like the hero portrait frame. Off by default (only hero uses these in the prototype). */
  corners?: boolean;
  priority?: boolean;
  className?: string;
};

const INNER_RING: Record<FrameVariant, string> = {
  gold: "rgba(36,16,53,.82)",
  green: "rgba(20,82,41,.82)",
  purple: "rgba(99,48,138,.82)",
};

const CORNER_BORDER: Record<FrameVariant, string> = {
  gold: "var(--color-primary-600)",
  green: "var(--color-accent-green-dark)",
  purple: "var(--color-primary-700)",
};

/**
 * Reusable version of the prototype's double-border + diamond-corner-ornament
 * photo frame. Uses `next/image` with `fill` inside a positioned wrapper sized
 * by `aspectRatio` (so callers don't need to know intrinsic pixel dimensions —
 * pass an `aspectRatio` like "4 / 3" or "3 / 4" to match the source photo).
 */
export default function FramedImage({
  src,
  alt,
  borderColor = "gold",
  caption,
  aspectRatio = "4 / 3",
  corners = false,
  priority = false,
  className = "",
}: FramedImageProps) {
  return (
    <div className={`relative w-full ${className}`.trim()}>
      <div
        className="relative w-full overflow-hidden rounded-md"
        style={{
          aspectRatio,
          boxShadow: "0 26px 54px rgba(23,10,34,.4)",
        }}
      >
        <Image src={src} alt={alt} fill priority={priority} className="object-cover" />
      </div>

      {/* double border overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[13px] rounded-[9px]"
        style={{
          border: "3px solid var(--color-accent-gold)",
          boxShadow: `inset 0 0 0 5px ${INNER_RING[borderColor]}, inset 0 0 0 8px var(--color-accent-gold)`,
        }}
      />

      {corners && (
        <>
          <span
            aria-hidden="true"
            className="absolute -left-[20px] -bottom-[20px] h-[15px] w-[15px] rotate-45"
            style={{ background: "var(--color-accent-gold)", border: `2px solid ${CORNER_BORDER[borderColor]}` }}
          />
          <span
            aria-hidden="true"
            className="absolute -right-[20px] -bottom-[20px] h-[15px] w-[15px] rotate-45"
            style={{ background: "var(--color-accent-gold)", border: `2px solid ${CORNER_BORDER[borderColor]}` }}
          />
          <span
            aria-hidden="true"
            className="absolute -left-[20px] -top-[20px] h-[15px] w-[15px] rotate-45"
            style={{ background: "var(--color-accent-gold)", border: `2px solid ${CORNER_BORDER[borderColor]}` }}
          />
          <span
            aria-hidden="true"
            className="absolute -right-[20px] -top-[20px] h-[15px] w-[15px] rotate-45"
            style={{ background: "var(--color-accent-gold)", border: `2px solid ${CORNER_BORDER[borderColor]}` }}
          />
        </>
      )}

      {caption && (
        <div
          className="absolute left-1/2 -bottom-[13px] -translate-x-1/2 translate-y-1/2 whitespace-nowrap rounded px-[22px] py-[7px] font-ethiopic text-[15px] font-semibold"
          style={{
            background: "var(--color-primary-700)",
            color: "var(--color-parchment)",
            border: "1px solid var(--color-accent-gold)",
            boxShadow: "0 6px 16px rgba(23,10,34,.4)",
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}
