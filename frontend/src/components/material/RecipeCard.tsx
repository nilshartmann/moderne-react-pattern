import { RecipeDto } from "../api-types.ts";
import { H1 } from "../Heading.tsx";
import { RatingStars } from "../RatingStars.tsx";
import { formatMinuteDuration } from "../FormatMinuteDuration.tsx";
import { memo, Suspense, useState } from "react";
import IngredientList from "./IngredientsList.tsx";
import { useGetRecipeIngredientsQuery } from "../use-queries.ts";
import { twMerge } from "tailwind-merge";
import LoadingIndicator from "../LoadingIndicator.tsx";

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
  const [servings, setServings] = useState(4);
  return (
    <div className={"flex flex-col justify-between"}>
      <div>
        {/*

        TODO:

        - Add Link to /recipes/$recipeId around RecipeImage ?
        - what happens if we don't specify 'params'?

        */}
        <RecipeImage recipeId={recipe.id} />
        <div className={"mt-8 flex justify-between text-red"}>
          <p
            className={
              "font-space text-sm font-medium uppercase tracking-[2px] "
            }
          >
            {showIngredients ? (
              <span>
                Ingredients - {servings} Servings
                <i
                  className="fa-solid fa-circle-plus ms-2 cursor-pointer"
                  onClick={() => setServings((s) => s - 1)}
                ></i>
                <i
                  className="fa-solid fa-circle-minus ms-2  cursor-pointer"
                  onClick={() => setServings((s) => s + 1)}
                ></i>
              </span>
            ) : (
              recipe.mealType
            )}
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

           - add Link to /recipes/$recipeId around title
           - add preload=intent

          */}

          {recipe.title}
        </H1>
        <div className={"text mt-2 font-inter text-gray-500"}>
          {showIngredients ? (
            <Suspense fallback={<LoadingIndicator />}>
              <Ingredients recipeId={recipe.id} servings={servings} />
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
          <div className={"mt-4 space-y-2"}>
            <p className="me-2 inline-block rounded border border-green bg-white p-2 text-[15px] text-green">
              <i className="fa-regular fa-clock mr-2"></i>
              {formatMinuteDuration(recipe.cookTime + recipe.preparationTime)}
            </p>
            {recipe.categories.map((c) => (
              <p
                key={c.description + "_" + c.title}
                className={
                  "me-2 inline-block rounded border border-green bg-white p-2 text-[15px] text-green"
                }
              >
                <i className={c.icon} />
                <span className={"ms-2"}>{c.title}</span>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

type IngredientsProps = { recipeId: string; servings?: number };

function Ingredients({ recipeId, servings }: IngredientsProps) {
  const { data } = useGetRecipeIngredientsQuery(recipeId);

  return <IngredientList servings={servings} ingredients={data.ingredients} />;
}

export { RecipeCard };

type RecipeImageProps = {
  recipeId: string;
};
function RecipeImage({ recipeId }: RecipeImageProps) {
  return (
    <div className={"overflow-hidden"}>
      <img
        className="mb-2 h-48 max-h-full w-full max-w-full transform rounded object-cover transition-all duration-500 ease-in-out hover:scale-110"
        src={`/images/recipes/food_${recipeId}.png`}
        alt="image1"
      />
      {/* vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv */}
      {/*<BookmarkButton recipeId={recipeId} />*/}
      {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
    </div>
  );
}
