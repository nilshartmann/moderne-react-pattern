import { useRecipifyWindowTitle } from "../useRecipifyWindowTitle.tsx";
import { RecipeBanner } from "./RecipeBanner.tsx";
import { CookingTime } from "./CookingTime.tsx";
import { Ingredients } from "./Ingredients.tsx";
import { Instructions } from "./Instructions.tsx";
import { H2 } from "../Heading.tsx";
import { Sidebar } from "../Sidebar.tsx";
import { DetailedRecipeDto } from "../api-types.ts";

type RecipePageContentProps = {
  recipe: DetailedRecipeDto;
};

export default function RecipePageContent({ recipe }: RecipePageContentProps) {
  useRecipifyWindowTitle(recipe.title);

  return (
    <div className={"mb-20"}>
      <RecipeBanner recipe={recipe} />
      <div className={"container mx-auto mb-8 mt-8 md:flex md:space-x-12"}>
        <div className={"md:w-2/3"}>
          <CookingTime
            cookTime={recipe.cookTime}
            preparationTime={recipe.preparationTime}
          />
          <Ingredients ingredients={recipe.ingredients} />
          <Instructions recipe={recipe} />
        </div>
        <div className={"md:w-1/3"}>
          <Sidebar>
            <H2>Feedback</H2>
            {/*<FeedbackListLoader recipeId={recipe.id} />*/}
          </Sidebar>
        </div>
      </div>
    </div>
  );
}
