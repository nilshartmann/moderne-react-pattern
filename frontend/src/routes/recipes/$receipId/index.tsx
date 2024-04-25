import { createFileRoute } from "@tanstack/react-router";
import RecipePageWithFetch from "../../../components/material/RecipePageWithFetch.tsx";

export const Route = createFileRoute("/recipes/$receipId/")({
  component: RecipePage,
});

function RecipePage() {
  const x = Route.useParams();
  return <RecipePageWithFetch recipeId={x.receipId} />;
}
