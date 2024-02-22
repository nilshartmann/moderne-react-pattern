import { useGetAllRecipesQuery } from "../../components/use-queries.ts";
import ButtonBar from "../../components/ButtonBar.tsx";
import {
  createFileRoute,
  getRouteApi,
  Link,
  MatchRoute,
} from "@tanstack/react-router";
import { ReactNode } from "react";
import z from "zod";
import { Button, CheckLabel, PageButton } from "../../components/Button.tsx";
import { NavButtonBar } from "../../components/NavButtonBar.tsx";
import { LoadingRecipeCard } from "../../components/material/LoadingRecipeCard.tsx";
import { RecipeCard } from "../../components/material/RecipeCard.tsx";
import PaginationBar from "../../components/PaginationBar.tsx";

const RecipePageListParams = z.object({
  page: z.number().min(0).optional(),
  orderBy: z.enum(["time", "rating"]).optional(),
  bookmarkedRecipeIds: z.string().array().optional(),
  showOnlyBookmarked: z.boolean().optional(),
});
type TRecipePageListParams = z.infer<typeof RecipePageListParams>;

export const Route = createFileRoute("/recipes/")({
  component: RecipeListPage,
  validateSearch: (search): TRecipePageListParams =>
    RecipePageListParams.parse(search),
});

const recipeListRoute = getRouteApi("/recipes/");

type CheckButtonProps = {
  checked: boolean;
  children: ReactNode;
  orderBy?: "time" | "rating" | undefined;
};

function FilterButton() {
  const showOnlyBookmarked = recipeListRoute.useSearch({
    select: (s) => s.showOnlyBookmarked || false,
  });

  return (
    <Button checked={showOnlyBookmarked}>
      <Link
        to={"/recipes/"}
        search={(s) => ({
          ...s,
          page: 0,
          showOnlyBookmarked: !showOnlyBookmarked,
        })}
      >
        <CheckLabel
          checked={showOnlyBookmarked}
          enabled={true}
          style={"square"}
        >
          Show only bookmarked
        </CheckLabel>
      </Link>
    </Button>
  );
}

export function CheckButton({ checked, children, orderBy }: CheckButtonProps) {
  return (
    <Button checked={checked}>
      <Link
        to={"/recipes/"}
        search={(s) => ({ ...s, orderBy: orderBy })}
        disabled={checked}
      >
        <CheckLabel checked={checked}>{children}</CheckLabel>
      </Link>
    </Button>
  );
}

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
  console.log(
    "Rendering RecipeListPage with search Params",
    page,
    orderBy,
    showOnlyIds,
  );
  const result = useGetAllRecipesQuery(page, orderBy, showOnlyIds);

  return (
    <div className={"bg-goldgray"}>
      <div className={"container mx-auto pb-16 pt-16"}>
        <NavButtonBar align={"left_right"}>
          <ButtonBar align={"start"}>
            <FilterButton />
          </ButtonBar>
          <ButtonBar>
            <CheckButton orderBy={undefined} checked={orderBy === undefined}>
              Newest first
            </CheckButton>
            <CheckButton orderBy={"rating"} checked={orderBy === "rating"}>
              Best rated
            </CheckButton>
            <CheckButton orderBy={"time"} checked={orderBy === "time"}>
              Shortest time
            </CheckButton>
          </ButtonBar>
        </NavButtonBar>

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
                    console.log("Match Route", recipe.id, match);
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
        <div className={"mt-8 flex justify-center"}>
          <PaginationBar totalPages={result.data.totalPages} currentPage={page}>
            {(btn) => (
              <Link
                to={"/recipes/"}
                disabled={btn.disabled}
                search={(s) => ({
                  ...s,
                  page: btn.page,
                })}
              >
                <PageButton state={btn} />
              </Link>
            )}
          </PaginationBar>
        </div>
      </div>
    </div>
  );
}
