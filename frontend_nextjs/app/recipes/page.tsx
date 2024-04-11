// In TanStackRouter we would use z which would

import Link from "next/link";
import PaginationBar from "@/app/components/PaginationBar.tsx";
import { PageButton } from "@/app/components/Button.tsx";
import { buildUrl } from "@/app/components/material/build-url.ts";
import { PageResponseRecipeDto } from "@/app/components/api-types.ts";
import { fetchRecipes } from "@/app/components/queries.ts";
import {
  getValidatedRecipeListSearchParams,
  TRecipePageListParams,
} from "@/app/components/recipelistpage/RecipeListSearchParams.ts";
import RecipeListNavBar from "@/app/components/recipelistpage/RecipeListNavBar.tsx";
import RecipeCard from "@/app/components/recipelistpage/RecipeCard.tsx";

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

        <RecipeList recipesPromise={result} />

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

type RecipeListProps = {
  recipesPromise: Promise<PageResponseRecipeDto>;
};

async function RecipeList({ recipesPromise }: RecipeListProps) {
  const result = await recipesPromise;
  return (
    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {result.content.map((recipe) => {
        return (
          <div
            key={recipe.id}
            className={
              "h-full transform rounded border border-gray-200 bg-white p-4 shadow-lg transition-all duration-500 ease-in-out hover:drop-shadow-2xl "
            }
          >
            <RecipeCard recipe={recipe} />
          </div>
        );
      })}
    </div>
  );
}
