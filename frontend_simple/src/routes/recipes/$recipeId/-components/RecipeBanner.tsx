import { DetailedRecipeDto } from "../../../../components/api-types.ts";
import React from "react";
import { RecipeCategories } from "../../../../components/RecipeCategories.tsx";

type RecipeBannerProps = {
  recipe: DetailedRecipeDto;
};

export function RecipeBanner({ recipe }: RecipeBannerProps) {
  return (
    <div
      style={{
        "--recipe-bg-image": `url('/images/recipes/food_${recipe.id}.png')`,
      }}
    >
      <div className={`recipify-header-wrap mt-16 pb-12 pe-8 ps-8 pt-12`}>
        <div
          className={
            "container mx-auto flex flex-col-reverse md:flex-row md:space-x-8"
          }
        >
          <div className={"mt-8 md:mt-0 md:w-1/2"}>
            <div className={"flex h-full flex-col justify-between"}>
              <div>
                <div className={"flex justify-between"}>
                  <p
                    className={
                      "font-space text-sm font-medium uppercase tracking-[2px] text-red"
                    }
                  >
                    {recipe.mealType}
                  </p>
                </div>
                <h1 className={"mb-4 mt-4 font-space text-5xl font-bold"}>
                  {recipe.title}
                </h1>
                <p className={"text mt-2 font-inter text-gray-500"}>
                  {recipe.headline}
                </p>
              </div>
              <div>
                <div className={"mt-4 flex"}>
                  <RecipeCategories recipe={recipe} hideTime />
                </div>
              </div>
            </div>
          </div>
          <div className={"md:w-1/2"}>
            <div className={"overflow-hidden"}>
              <img
                className="w-full transform rounded object-cover transition-all duration-1000 ease-in-out hover:scale-125 sm:mt-4 sm:max-h-80 md:mt-0 "
                src={`/images/recipes/food_${recipe.id}.png`}
                alt={recipe.title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
