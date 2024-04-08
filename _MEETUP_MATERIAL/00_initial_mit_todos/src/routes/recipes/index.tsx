import { createFileRoute } from "@tanstack/react-router";
import RecipeListPage from "../../components/material/RecipeListPage.tsx";

// todo:
//  - add search params (copy from 70_RecipePageListParams.txt)
//  - add validateSearch
export const Route = createFileRoute("/recipes/")({
  component: RecipeListPage,
});
