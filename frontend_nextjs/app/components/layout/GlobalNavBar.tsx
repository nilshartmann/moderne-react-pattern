"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};
function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === pathname;
  return (
    <Link
      className={twMerge(
        "hover:text-red hover:underline",
        isActive && "text-red underline",
      )}
      href={href}
    >
      {children}
    </Link>
  );
}

export default function GlobalNavBar() {
  return (
    <nav className={"space-x-3"}>
      <NavLink href={"/"}>Home</NavLink>
      <NavLink href={"/about"}>About</NavLink>
      <NavLink href={"/privacy"}>Privacy</NavLink>
    </nav>
  );
}
