export function Brand() {
  return (
    <div className="flex items-center gap-[9px]">
      <svg
        aria-hidden="true"
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        className="text-accent"
      >
        <path d="M5 19 L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M12.5 5 H19 V11.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-sm font-semibold tracking-[0.02em] text-foreground">Vector</span>
    </div>
  );
}
