import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type NavButtonBarProps = {
  align?: "left" | "right" | "left_right";
  children: ReactNode;
};

export function NavButtonBar({ align = "right", children }: NavButtonBarProps) {
  const className = twMerge(
    "flex",
    "justify-end",
    align === "left" && "justify-start",
    align === "left_right" && "justify-between",
  );

  return <div className={className}>{children}</div>;
}
