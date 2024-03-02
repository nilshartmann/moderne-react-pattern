import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type HeadingProps = {
  children: ReactNode;
  className?: string;
};

export function H1({ children, className }: HeadingProps) {
  return (
    <h1 className={twMerge("font-space text-3xl font-bold", className)}>
      {children}
    </h1>
  );
}

export function H2({ children, className }: HeadingProps) {
  return (
    <h1 className={twMerge("font-space text-2xl font-bold", className)}>
      {children}
    </h1>
  );
}
