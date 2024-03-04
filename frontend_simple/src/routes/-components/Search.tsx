import Label from "../recipes/-components/Label.tsx";
import { Fragment, Suspense, useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator.tsx";
import { RecipeSummaryDto } from "../../components/api-types.ts";
import { H2 } from "../../components/Heading.tsx";
import { Link } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";
import {
  useGetRecipeQuery,
  useSearchQuery,
} from "../../components/use-queries.ts";
import { RecipeCategories } from "../../components/RecipeCategories.tsx";
import { Button } from "../../components/Button.tsx";

type SearchProps = {
  search: string;
};

export default function Search({ search }: SearchProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchQuery(search);

  const hasHits = data.pages[0].totalPages > 0;

  if (!hasHits) {
    return <Label>No recipes found.</Label>;
  }

  const allRecipes = data.pages.reduce((prev, cur) => {
    return [...prev, ...cur.content];
  }, [] as RecipeSummaryDto[]);

  return (
    <>
      <Label>Recipes for {data.pages[0].meta}</Label>
      {allRecipes.map((recipe) => (
        <SearchResultCard key={recipe.id} recipe={recipe} />
      ))}
      {hasNextPage && (
        <div className="flex justify-center">
          <Button>
            {isFetchingNextPage ? (
              <LoadingIndicator secondary />
            ) : (
              <button onClick={() => fetchNextPage()}>Find more...</button>
            )}
          </Button>
        </div>
      )}
      {hasNextPage || <Label>No more recipes. Happy cooking!</Label>}
    </>
  );
}

type SearchResultCard = {
  recipe: RecipeSummaryDto;
};
function SearchResultCard({ recipe }: SearchResultCard) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      key={recipe.id}
      className="transform rounded border border-gray-200 bg-white p-4 shadow-lg transition-all duration-500 ease-in-out hover:drop-shadow-2xl"
    >
      <div className="flex justify-between space-x-2 ">
        <div className={"flex w-2/3 flex-col justify-between "}>
          <div className={"space-y-2"}>
            <p className="font-space text-sm font-medium uppercase tracking-[2px] text-red">
              {recipe.mealType}
            </p>
            <H2 className="font-space font-bold">
              <Link
                to={"/recipes/$recipeId"}
                search={true}
                params={{
                  recipeId: recipe.id,
                }}
                className="cursor-pointer hover:text-orange_2 hover:underline"
              >
                {recipe.title}
              </Link>
            </H2>
          </div>
          <div>
            <i
              className={twMerge(
                "fa-solid cursor-pointer text-orange",
                isOpen ? "fa-angles-up" : "fa-angles-down",
              )}
              onClick={() => setIsOpen((o) => !o)}
            ></i>
          </div>
        </div>
        <div className={"w-1/3"}>
          <div className="overflow-hidden">
            <img
              className="mb-2 h-24 max-h-full w-full max-w-full transform rounded object-cover transition-all duration-500 ease-in-out hover:scale-110"
              src={`/images/recipes/food_${recipe.id}.png`}
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <Suspense fallback={<LoadingIndicator />}>
          <RecipeDetails recipeId={recipe.id} />
        </Suspense>
      )}
    </div>
  );
}

type RecipeDetailsProps = {
  recipeId: string;
};
function RecipeDetails({ recipeId }: RecipeDetailsProps) {
  const { data } = useGetRecipeQuery(recipeId);

  return (
    <div className={"mt-4 space-y-4"}>
      <p>{data.recipe.headline}</p>
      <RecipeCategories recipe={data.recipe} />
    </div>
  );
}
