import { getRouteApi, MatchRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import {
  useGetAllRecipesQuery,
  useGetTotalPageCountQuery,
} from "../use-queries.ts";
import { GlobalLoadingIndicator } from "./GlobalLoadingIndicator.tsx";
import PaginationBar from "../PaginationBar.tsx";
import { LoadingRecipeCard } from "./LoadingRecipeCard.tsx";
import { RecipeCard } from "./RecipeCard.tsx";
import PaginationButton from "./PaginationButton.tsx";

const recipeListRoute = getRouteApi("/recipes/");

const empty: string[] = [];

export default function RecipeListPage() {
  const { page, orderBy, showOnlyIds } = recipeListRoute.useSearch({
    select: (s) => ({
      page: s.page || 0,
      orderBy: s.orderBy,
      showOnlyIds: s.showOnlyBookmarked
        ? s.bookmarkedRecipeIds || empty
        : undefined,
    }),
  });

  const totalPages = useGetTotalPageCountQuery(page, orderBy, showOnlyIds);

  console.log(
    "Rendering RecipeListPage with search Params",
    page,
    orderBy,
    showOnlyIds,
  );

  return (
    <div className={"bg-goldgray"}>
      <div className={"container mx-auto pb-16 pt-16"}>
        {/*<RecipeListNavBar />*/}

        <Suspense fallback={<GlobalLoadingIndicator />}>
          <RecipeList />
        </Suspense>

        <div className={"mt-8 flex justify-center"}>
          <PaginationBar
            totalPages={totalPages === -1 ? 10 : totalPages}
            currentPage={page}
            disabled={totalPages === -1}
          >
            {(btn) => <PaginationButton btn={btn} />}
          </PaginationBar>
        </div>
      </div>
    </div>
  );
}

function RecipeList() {
  const { page, orderBy, showOnlyIds } = recipeListRoute.useSearch({
    select: (s) => ({
      page: s.page || 0,
      orderBy: s.orderBy,
      showOnlyIds: s.showOnlyBookmarked
        ? s.bookmarkedRecipeIds || empty
        : undefined,
    }),
  });
  const result = useGetAllRecipesQuery(page, orderBy, showOnlyIds);
  return (
    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {result.data.content.map((recipe) => {
        return (
          <div
            key={recipe.id}
            className={
              "h-full transform rounded border border-gray-200 bg-white p-4 shadow-lg transition-all duration-500 ease-in-out hover:drop-shadow-2xl "
            }
          >
            <MatchRoute to={"/"} params={{ recipeId: recipe.id }} pending>
              {(match) => {
                return match ? (
                  <LoadingRecipeCard />
                ) : (
                  <RecipeCard recipe={recipe} />
                );
              }}
            </MatchRoute>
          </div>
        );
      })}
    </div>
  );
}
