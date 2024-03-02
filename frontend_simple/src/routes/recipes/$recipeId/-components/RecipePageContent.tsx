import { DetailedRecipeDto } from "../../../../components/api-types.ts";
import { Fragment, Suspense, useState } from "react";
import FeedbackListLoader from "./FeedbackListLoader.tsx";
import LoadingIndicator from "../../../../components/LoadingIndicator.tsx";
import "./RecipePage.css";
import { formatMinuteDuration } from "../../../../components/formatters.ts";
import IngredientList from "./IngredientsList.tsx";
import { twMerge } from "tailwind-merge";

type RecipePageContentProps = {
  recipe: DetailedRecipeDto;
};

export function RecipePageContent({ recipe }: RecipePageContentProps) {
  const [servings, setServings] = useState(4);
  return (
    <div
      className={"mb-20"}
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
                  <div className={"mt-4 space-y-2"}>
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
      <div className={"container mx-auto mb-8 mt-8 md:flex md:space-x-12"}>
        <div className={"md:w-2/3"}>
          <div
            className={
              "mt-3 w-full border-b border-dotted border-gray-300 pb-4 pt-4"
            }
          >
            <div className={"mb-4 flex items-center  justify-between "}>
              <h2 className={"font-space text-3xl font-bold"}>Cooking time</h2>
              <div className={"flex items-center"}>
                <i className="fa-regular fa-clock-four me-4 text-3xl text-orange_2 "></i>
                <div className={"font-inter text-gray-500 "}>
                  <div className={"font-medium"}>Cooking</div>
                  <div>{formatMinuteDuration(recipe.cookTime)}</div>
                </div>
              </div>
              <div className={"flex items-center"}>
                <i className="fa-regular fa-clock-four me-4 text-3xl text-orange_2 "></i>
                <div className={"font-inter text-gray-500 "}>
                  <div className={"font-medium"}>Preperation</div>
                  <div>{formatMinuteDuration(recipe.preparationTime)}</div>
                </div>
              </div>
              <div className={"flex items-center"}>
                <i className="fa-regular fa-clock-four me-4 text-3xl text-orange_2 "></i>
                <div className={"font-inter text-gray-500 "}>
                  <div className={"font-medium"}>Total</div>
                  <div>
                    {formatMinuteDuration(
                      recipe.cookTime + recipe.preparationTime,
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={"mb-8 mt-8 flex items-center justify-between"}>
            <h2 className={"font-space text-3xl font-bold"}>Ingredients</h2>
            <div
              className={
                "rounded-lg border border-dotted border-gray-500 p-4 text-lg"
              }
            >
              <i
                className={
                  "fa-solid fa-circle-plus text-orange_2 hover:cursor-pointer hover:text-orange_2-500"
                }
                onClick={() => setServings(servings + 1)}
              />
              <span className={"text-gray-500 "}> {servings} servings </span>
              <i
                className={twMerge(
                  "fa-solid fa-circle-minus cursor-pointer text-orange_2 hover:text-orange_2-500",
                  servings < 2 &&
                    "cursor-default text-gray-300 hover:text-gray-300",
                )}
                onClick={() => servings > 1 && setServings(servings - 1)}
              />{" "}
            </div>
          </div>
          <IngredientList
            ingredients={recipe.ingredients}
            servings={servings}
          />

          <h2 className={"mb-8 mt-8 font-space text-3xl font-bold"}>
            Instructions
          </h2>

          <div className={"me-4 ms-4"}>
            {recipe.instructions.map((i) => (
              <Fragment key={i.orderNo}>
                <div
                  className={
                    "mt-8 items-start border-b border-dotted border-gray-300 pb-8 sm:flex "
                  }
                >
                  <div className={"font-space font-medium text-red sm:w-1/4"}>
                    Step {i.orderNo}
                  </div>
                  <div
                    className={
                      "mt-4 font-inter text-gray-500 sm:mt-0 sm:w-3/4 sm:pe-1.5"
                    }
                  >
                    {i.description}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div className={"md:w-1/3"}>
          <div
            className={
              "border-1 mt-8 w-full rounded-2xl bg-goldgray p-8 md:mt-0 "
            }
          >
            <h2 className={"mb-4 font-space text-3xl font-bold"}>Ratings</h2>
            <Suspense
              fallback={
                <LoadingIndicator>Loading feedback...</LoadingIndicator>
              }
            >
              <FeedbackListLoader recipeId={recipe.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
