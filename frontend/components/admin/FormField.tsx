export const inputStyle: React.CSSProperties = {
  borderColor: "var(--color-accent-gold)",
  background: "rgba(255,255,255,.6)",
  color: "var(--color-ink)",
};

export const baseInput =
  "rounded-md border-[1.5px] px-4 py-2.5 font-cardo text-[15px] outline-none w-full";

export function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-ethiopic text-sm font-semibold" style={{ color: "var(--color-primary-700)" }}>
        {label}
      </span>
      {children}
      {hint && !error && (
        <span className="font-cardo text-xs" style={{ color: "var(--color-ink-soft)" }}>
          {hint}
        </span>
      )}
      {error && (
        <span className="font-cardo text-xs" style={{ color: "var(--color-accent-red)" }}>
          {error}
        </span>
      )}
    </label>
  );
}
