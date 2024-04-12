import { RecipeDto } from "../api-types.ts";
import { H1 } from "../Heading.tsx";
import { RatingStars } from "../RatingStars.tsx";
import { memo, Suspense, useState } from "react";
import { twMerge } from "tailwind-merge";
import LoadingIndicator from "../LoadingIndicator.tsx";
import { BookmarkButton } from "./BookmarkButton.tsx";
import { useGetRecipeIngredientsQuery } from "../use-queries.ts";
import { Ingredients } from "../recipepage/Ingredients.tsx";
import { RecipeCategories } from "../RecipeCategories.tsx";
import { Link } from "@tanstack/react-router";

type RecipeCardProps = {
  recipe: RecipeDto;
};

// Note that this RecipeCard components is marked as re-rendered
// in the devtools, even it is not (https://github.com/facebook/react/issues/19778)
// as a workaround:
//  - use profile to see that it is (not) rerendered
//  - use console.log

const RecipeCard = memo(function RecipeCard({ recipe }: RecipeCardProps) {
  console.log("Render RecipeCard", recipe.id);
  const [showIngredients, setShowIngredients] = useState(false);
  return (
    <div className={"flex flex-col justify-between"}>
      <div>
        {/*
        todo:

         - add Link to "/recipes/$recipeId"
        */}
        <Link
          to={"/recipes/$receipeId"}
          params={{
            receipeId: recipe.id,
          }}
        >
          <div className={"overflow-hidden"}>
            <img
              className="mb-2 h-48 max-h-full w-full max-w-full transform rounded object-cover transition-all duration-500 ease-in-out hover:scale-110"
              src={`/images/recipes/food_${recipe.id}.png`}
              alt="image1"
            />
            {/* vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv */}
            <BookmarkButton recipeId={recipe.id} />
            {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
          </div>
        </Link>
        <div className={"mt-8 flex justify-between text-red"}>
          <p
            className={
              "font-space text-sm font-medium uppercase tracking-[2px] "
            }
          >
            {showIngredients || recipe.mealType}
          </p>
          <i
            onClick={() => setShowIngredients(!showIngredients)}
            className={twMerge(
              "cursor-pointer",
              showIngredients
                ? "fa-regular fa-circle-xmark"
                : "fa-solid fa-list",
              showIngredients ? "text-green" : "text-orange_2",
            )}
          ></i>
        </div>
        <H1 className={"mb-4 mt-4 font-space font-bold"}>
          {/*
          TODO:

           - add Link ro /recipes/$recipeId
           - add preload=intent
           -             className={"hover:text-orange_2 hover:underline"}

          */}
          {recipe.title}
        </H1>
        <div className={"text mt-2 font-inter text-gray-500"}>
          {showIngredients ? (
            <Suspense fallback={<LoadingIndicator />}>
              <IngredientsLoader recipeId={recipe.id} />
            </Suspense>
          ) : (
            recipe.headline
          )}
        </div>
        {showIngredients || (
          <div className={"mt-4 space-x-1 text-orange_2"}>
            <RatingStars rating={recipe.averageRating} />
          </div>
        )}
      </div>
      {showIngredients || (
        <div className={"mt-4 flex"}>
          <RecipeCategories recipe={recipe} />
        </div>
      )}
    </div>
  );
});

export { RecipeCard };

type IngredientsLoaderProps = {
  recipeId: string;
};

function IngredientsLoader({ recipeId }: IngredientsLoaderProps) {
  const { data } = useGetRecipeIngredientsQuery(recipeId);

  return <Ingredients ingredients={data.ingredients} style={"compact"} />;
}
