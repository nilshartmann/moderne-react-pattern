import { createFileRoute } from "@tanstack/react-router";
import { useGetRecipeQuery } from "../../../components/use-queries.ts";
import { RecipePageContent } from "./-components/RecipePageContent.tsx";

export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RecipePage,
});

function RecipePage() {
  const { recipeId } = Route.useParams();
  const { data } = useGetRecipeQuery(recipeId);

  return <RecipePageContent recipe={data.recipe} />;
}
