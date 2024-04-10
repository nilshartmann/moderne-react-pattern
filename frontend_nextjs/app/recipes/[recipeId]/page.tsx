import { RecipePageContent } from "@/app/components/material/RecipePageContent.tsx";
import { fetchRecipe } from "@/app/components/queries.ts";

type RecipePageProps = {
  params: {
    recipeId: string;
  };
};

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await fetchRecipe(params.recipeId);

  return <RecipePageContent recipe={recipe.recipe} />;
}
