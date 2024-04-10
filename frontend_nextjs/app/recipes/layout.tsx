import { ReactNode } from "react";
import { RecipesPageLayout } from "@/app/components/material/RecipesPageLayout.tsx";

type RecipesLayoutProps = {
  children: ReactNode;
};

export default function RecipesLayout({ children }: RecipesLayoutProps) {
  return <RecipesPageLayout>{children}</RecipesPageLayout>;
}
