import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
}

export function IconButton({ label, children, className = "", ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`flex items-center justify-center text-muted-dim transition-colors hover:text-muted focus-visible:text-muted ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
