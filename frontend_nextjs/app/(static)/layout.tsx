import { ReactNode } from "react";

type RecipesLayoutProps = {
  children: ReactNode;
};

export default function RecipesLayout({ children }: RecipesLayoutProps) {
  return <div className={"container mx-auto flex-grow"}>{children}</div>;
}
