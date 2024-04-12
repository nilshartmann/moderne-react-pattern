import { fetchRecipe } from "@/app/components/queries.ts";
import RecipePageContent from "@/app/components/recipepage/RecipePageContent.tsx";

type RecipePageProps = {
  params: {
    recipeId: string;
  };
};

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await fetchRecipe(params.recipeId);

  return <RecipePageContent recipe={recipe.recipe} />;
}
