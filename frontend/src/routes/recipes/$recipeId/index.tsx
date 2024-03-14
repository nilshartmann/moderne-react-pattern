import { RecipePageContent } from "../../../components/material/RecipePageContent.tsx";
import { useGetRecipeQuery } from "../../../components/use-queries.ts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RecipePage,
});

function RecipePage() {
  const { recipeId } = Route.useParams();
  const { data } = useGetRecipeQuery(recipeId);

  return <RecipePageContent recipe={data.recipe} />;
}
