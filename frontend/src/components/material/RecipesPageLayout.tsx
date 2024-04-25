import { ReactNode, Suspense } from "react";
import RecipesHeader from "../layout/RecipesHeader.tsx";
import { Timer } from "../Timer.tsx";
import LoadingIndicator from "../LoadingIndicator.tsx";

type RecipesPageLayoutProps = {
  children: ReactNode;
};

export function RecipesPageLayout({ children }: RecipesPageLayoutProps) {
  return (
    <>
      <RecipesHeader>
        <Timer />
      </RecipesHeader>
      <main className={"flex-grow"}>
        <Suspense fallback={<LoadingIndicator />}>{children}</Suspense>
      </main>
    </>
  );
}
