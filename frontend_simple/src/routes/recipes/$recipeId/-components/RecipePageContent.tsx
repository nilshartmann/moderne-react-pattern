import { DetailedRecipeDto } from "../../../../components/api-types.ts";
import React, { Suspense } from "react";
import LoadingIndicator from "../../../../components/LoadingIndicator.tsx";
import "./RecipePage.css";
import FeedbackList from "./FeedbackList.tsx";
import { CookingTime } from "./CookingTime.tsx";
import { Ingredients } from "./Ingredients.tsx";
import { Instructions } from "./Instructions.tsx";
import { RecipeBanner } from "./RecipeBanner.tsx";

type RecipePageContentProps = {
  recipe: DetailedRecipeDto;
};

export function RecipePageContent({ recipe }: RecipePageContentProps) {
  return (
    <div className={"mb-20"}>
      <RecipeBanner recipe={recipe} />
      <div className={"container mx-auto mb-8 mt-8 md:flex md:space-x-12"}>
        <div className={"md:w-2/3"}>
          <CookingTime
            cookTime={recipe.cookTime}
            preparationTime={recipe.preparationTime}
          />
          <Ingredients recipe={recipe} />
          <Instructions recipe={recipe} />
        </div>
        <div className={"md:w-1/3"}>
          <div
            className={
              "border-1 mt-8 w-full rounded-2xl bg-goldgray p-8 md:mt-0 "
            }
          >
            <h2 className={"mb-4 font-space text-3xl font-bold"}>Feedback</h2>
            <Suspense
              fallback={
                <LoadingIndicator>Loading feedback...</LoadingIndicator>
              }
            >
              <FeedbackList recipeId={recipe.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
