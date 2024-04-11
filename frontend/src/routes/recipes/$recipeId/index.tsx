import { fetchRecipe } from "../../../components/use-queries.ts";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import RecipePageContent from "../../../components/recipepage/RecipePageContent.tsx";

export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RecipePage,
  loader: async (params) => {
    return fetchRecipe(params.params.recipeId);
  },
});

function RecipePage() {
  const r = getRouteApi("/recipes/$recipeId/");
  const data = r.useLoaderData();

  return <RecipePageContent recipe={data.recipe} />;
}
