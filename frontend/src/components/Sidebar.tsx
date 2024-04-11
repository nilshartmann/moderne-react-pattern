import { ReactNode } from "react";

type SidebarProps = {
  children: ReactNode;
};

export function Sidebar({ children }: SidebarProps) {
  return (
    <div
      className={
        "border-1 mt-8 w-full space-y-8 rounded-2xl bg-goldgray p-8 md:mt-0"
      }
    >
      {children}
    </div>
  );
}
