import { H1 } from "../Heading.tsx";

import { ReactNode } from "react";
import Link from "next/link";

type RecipesHeaderProps = {
  children?: ReactNode;
};

export default function RecipesHeader({ children }: RecipesHeaderProps) {
  return (
    <>
      <header
        className={"flex h-24 items-center bg-cover bg-center"}
        style={{
          backgroundImage: "url('/images/landing-page.png')",
        }}
      >
        <div className={"container mx-auto"}>
          <div className={"flex h-full items-center justify-between"}>
            <H1
              className={
                "inline-block bg-white p-2 pb-3 font-space text-4xl font-bold text-red"
              }
            >
              <Link href={"/"} className={"hover:underline"}>
                Recipify
              </Link>
            </H1>
            {children}
          </div>
        </div>
      </header>
    </>
  );
}
