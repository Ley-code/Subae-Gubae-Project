"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Add the "live" class alongside "in" once revealed — used by Kidase to gate the smoke animation. */
  live?: boolean;
};

/**
 * Wraps children in a `.reveal` container and toggles the `.in` class (see
 * globals.css) via IntersectionObserver once the element scrolls into view,
 * porting the prototype's fade-up reveal behavior to a React effect.
 */
export default function RevealOnScroll({
  children,
  className = "",
  style,
  live = false,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const top = entry.boundingClientRect?.top ?? 0;
          if (entry.isIntersecting || top < 0) {
            entry.target.classList.add("in");
            if (live) entry.target.classList.add("live");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [live]);

  return (
    <div ref={ref} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
