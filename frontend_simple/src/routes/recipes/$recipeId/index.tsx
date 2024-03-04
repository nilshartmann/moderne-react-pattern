import { createFileRoute } from "@tanstack/react-router";
import { useGetRecipeQuery } from "../../../components/use-queries.ts";
import { RecipePageContent } from "./-components/RecipePageContent.tsx";
import z from "zod";

const RecipePageParams = z.object({
  feedback_page: z.number().optional().default(0),
});

export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RecipePage,
  validateSearch: (s) => RecipePageParams.parse(s),
});

function RecipePage() {
  const { recipeId } = Route.useParams();
  const { data } = useGetRecipeQuery(recipeId);

  return <RecipePageContent recipe={data.recipe} />;
}
