type Props = { className?: string; colorClass?: string };

/** Four L-shaped corner ticks — the signature architectural frame. */
export function Corners({
  className = "",
  colorClass = "border-ink/25",
}: Props) {
  const base = "pointer-events-none absolute h-3 w-3";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <span
        className={`${base} left-0 top-0 border-l border-t ${colorClass}`}
      />
      <span
        className={`${base} right-0 top-0 border-r border-t ${colorClass}`}
      />
      <span
        className={`${base} bottom-0 left-0 border-b border-l ${colorClass}`}
      />
      <span
        className={`${base} bottom-0 right-0 border-b border-r ${colorClass}`}
      />
    </div>
  );
}
