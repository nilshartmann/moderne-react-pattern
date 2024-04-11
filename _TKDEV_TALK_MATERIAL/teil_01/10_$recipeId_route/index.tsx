import { createFileRoute } from "@tanstack/react-router";
import RecipePageWithFetch from "../../../components/material/ReceipePageWithFetch.tsx";

export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RecipePage,
});

function RecipePage() {
  const params = Route.useParams();

  return <RecipePageWithFetch recipeId={params.recipeId} />;
}
