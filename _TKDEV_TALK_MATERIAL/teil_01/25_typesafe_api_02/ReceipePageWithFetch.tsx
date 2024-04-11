import {useEffect, useState} from "react";
import {GlobalLoadingIndicator} from "./GlobalLoadingIndicator.tsx";
import RecipePageContent from "../recipepage/RecipePageContent.tsx";
import {DetailedRecipeDto} from "../api-types.ts";
import {fetchFromApi, getEndpointConfig} from "../fetch-from-api.ts";

type RecipePageWithFetchProps = {
  recipeId: string;
};
export default function RecipePageWithFetch({
  recipeId,
}: RecipePageWithFetchProps) {
  const [recipe, setRecipe] = useState<DetailedRecipeDto | null>(null);

  useEffect(() => {
    async function loadRecipeData() {
      // const response = await fetch(
      //   "http://localhost:8080/api/recipes/" + recipeId,
      // );
      // const data = await response.json();
      //😱
      // const recipe = data as GetRecipeResponse;

      const recipe = await fetchFromApi(
        getEndpointConfig("get", "/api/recipes/{recipeId}"),
        {
          path: { recipeId },
          query: {
          },
        },
      );

      setRecipe(recipe.recipe);
    }

    loadRecipeData();
  }, [recipeId]);

  if (!recipe) {
    return <GlobalLoadingIndicator />;
  }

  return <RecipePageContent recipe={recipe} />;
}
