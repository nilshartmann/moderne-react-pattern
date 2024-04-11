import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import RecipeListPageContent from "../../components/recipelistpage/RecipeListPageContent.tsx";

const RecipePageListParams = z.object({
  page: z.number().min(0).optional(),
  orderBy: z.enum(["time", "rating"]).optional(),
  bookmarkedRecipeIds: z.string().array().optional(),
  showOnlyBookmarked: z.boolean().optional(),
});
type TRecipePageListParams = z.infer<typeof RecipePageListParams>;

// todo:
//  - add search params (copy from 70_RecipePageListParams.txt)
//  - add validateSearch
export const Route = createFileRoute("/recipes/")({
  component: RecipeListPageContent,
  validateSearch: (search): TRecipePageListParams =>
    RecipePageListParams.parse(search),
});
