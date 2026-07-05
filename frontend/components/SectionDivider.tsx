import RevealOnScroll from "@/components/RevealOnScroll";

type SectionDividerProps = {
  className?: string;
};

/**
 * Cross-icon-with-flanking-diamonds-and-lines divider, ported from the
 * prototype's inline divider markup (between Hero/Welcome and
 * Kidase/Mezmur sections), recolored to the purple/gold palette.
 * Reusable between any two sections on any page.
 */
export default function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <RevealOnScroll
      className={`flex items-center justify-center gap-4 px-6 py-3 text-accent-gold ${className}`.trim()}
    >
      <span
        className="h-0.5 flex-1 max-w-[300px]"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-accent-gold))" }}
        aria-hidden="true"
      />
      <span
        className="h-3 w-3 rotate-45 border-2 flex-none"
        style={{ borderColor: "var(--color-accent-gold)" }}
        aria-hidden="true"
      />
      <span className="h-11 w-11 flex-none text-primary-600" aria-hidden="true">
        <svg
          viewBox="0 0 100 100"
          style={{ width: "100%", height: "100%", display: "block", fill: "currentColor" }}
        >
          <rect x="45" y="6" width="10" height="88" rx="3" />
          <rect x="6" y="45" width="88" height="10" rx="3" />
          <circle cx="50" cy="50" r="11" fill="none" stroke="currentColor" strokeWidth="4" />
          <circle cx="50" cy="9" r="4.5" />
          <circle cx="50" cy="91" r="4.5" />
          <circle cx="9" cy="50" r="4.5" />
          <circle cx="91" cy="50" r="4.5" />
        </svg>
      </span>
      <span
        className="h-3 w-3 rotate-45 border-2 flex-none"
        style={{ borderColor: "var(--color-accent-gold)" }}
        aria-hidden="true"
      />
      <span
        className="h-0.5 flex-1 max-w-[300px]"
        style={{ background: "linear-gradient(90deg, var(--color-accent-gold), transparent)" }}
        aria-hidden="true"
      />
    </RevealOnScroll>
  );
}
