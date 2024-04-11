import { RecipeDto } from "../api-types.ts";
import { H1 } from "../Heading.tsx";
import { RatingStars } from "../RatingStars.tsx";
import { formatMinuteDuration } from "../FormatMinuteDuration.tsx";
import { Suspense } from "react";
import { twMerge } from "tailwind-merge";
import LoadingIndicator from "../LoadingIndicator.tsx";
import Link from "next/link";
import { BookmarkButton } from "@/app/components/recipelistpage/BookmarkButton.tsx";

type RecipeCardProps = {
  recipe: RecipeDto;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  console.log("Render RecipeCard", recipe.id);
  const showIngredients = false;
  const setShowIngredients: any = () => {};
  const servings = 4;
  const setServings: any = () => {};
  // const [showIngredients, setShowIngredients] = useState(false);
  // const [servings, setServings] = useState(4);
  return (
    <div className={"flex flex-col justify-between"}>
      <div>
        <Link prefetch={false} href={`/recipes/${recipe.id}`}>
          <div className={"overflow-hidden"}>
            <img
              className="mb-2 h-48 max-h-full w-full max-w-full transform rounded object-cover transition-all duration-500 ease-in-out hover:scale-110"
              src={`/images/recipes/food_${recipe.id}.png`}
              alt="image1"
            />
            <BookmarkButton recipeId={recipe.id} />
          </div>
        </Link>
        <div className={"mt-8 flex justify-between text-red"}>
          <p
            className={
              "font-space text-sm font-medium uppercase tracking-[2px] "
            }
          >
            {showIngredients
              ? "todo"
              : // <span>
                //   Ingredients - {servings} Servings
                //   <i
                //     className="fa-solid fa-circle-plus ms-2 cursor-pointer"
                //     onClick={() => setServings((s) => s - 1)}
                //   ></i>
                //   <i
                //     className="fa-solid fa-circle-minus ms-2  cursor-pointer"
                //     onClick={() => setServings((s) => s + 1)}
                //   ></i>
                // </span>
                recipe.mealType}
          </p>
          <i
            // onClick={() => setShowIngredients(!showIngredients)}
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
          <Link
            prefetch={true}
            href={`/recipes/${recipe.id}`}
            className={"hover:text-orange_2 hover:underline"}
          >
            {recipe.title}
          </Link>
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
}
type IngredientsProps = { recipeId: string; servings?: number };

function Ingredients({ recipeId, servings }: IngredientsProps) {
  return <h1>todo</h1>;
  // const { data } = useGetRecipeIngredientsQuery(recipeId);
  //
  // return <IngredientList servings={servings} ingredients={data.ingredients} />;
}

export { RecipeCard };
