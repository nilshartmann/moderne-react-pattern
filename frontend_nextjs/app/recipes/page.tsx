import Link from "next/link";
import PaginationBar from "@/app/components/PaginationBar.tsx";
import { PageButton } from "@/app/components/Button.tsx";
import { buildUrl } from "@/app/components/material/build-url.ts";
import { fetchRecipes } from "@/app/components/queries.ts";
import {
  getValidatedRecipeListSearchParams,
  TRecipePageListParams,
} from "@/app/components/recipelistpage/RecipeListSearchParams.ts";
import RecipeListNavBar from "@/app/components/recipelistpage/RecipeListNavBar.tsx";
import RecipeListPageContent from "@/app/components/recipelistpage/RecipeListPageContext.tsx";

type RecipeListPageProps = {
  searchParams: TRecipePageListParams;
};

export default async function RecipeListPage({
  searchParams,
}: RecipeListPageProps) {
  const params = getValidatedRecipeListSearchParams(searchParams);

  const result = fetchRecipes(params.page, params.orderBy, params.showOnlyIds);

  const totalPagesPromise = result.then((r) => r.totalPages);

  return (
    <div className={"bg-goldgray"}>
      <div className={"container mx-auto pb-16 pt-16"}>
        <RecipeListNavBar />

        <RecipeListPageContent recipesPromise={result} />

        <div className={"mt-8 flex justify-center"}>
          <PaginationBar
            totalPagesPromise={totalPagesPromise}
            currentPage={params.page}
          >
            {(btn) =>
              btn.disabled ? (
                <PageButton state={btn} />
              ) : (
                <Link
                  href={buildUrl("/recipes", { ...params, page: btn.page })}
                >
                  <PageButton state={btn} />
                </Link>
              )
            }
          </PaginationBar>
        </div>
      </div>
    </div>
  );
}
