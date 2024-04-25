import { GlobalLoadingIndicator } from "./GlobalLoadingIndicator.tsx";
import RecipePageContent from "../recipepage/RecipePageContent.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchFromApi, getEndpointConfig } from "../fetch-from-api.ts";

type RecipePageWithFetchProps = {
  recipeId: string;
};
export default function RecipePageWithQuery({
  recipeId,
}: RecipePageWithFetchProps) {
  // const [recipe, setRecipe] = useState<DetailedRecipeDto | null>(null);

  const result = useSuspenseQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () =>
      fetchFromApi(getEndpointConfig("get", "/api/recipes/{recipeId}"), {
        path: { recipeId },
        query: {
          slowdown: 0,
        },
      }),
  });

  // useEffect(() => {
  //   async function loadRecipeData() {
  //     const response = await fetch(
  //       "http://localhost:8080/api/recipes/" + recipeId,
  //     );
  //     const data = await response.json();
  //     //😱
  //     const recipe = data as GetRecipeResponse;
  //
  //     setRecipe(recipe.recipe);
  //   }
  //
  //   loadRecipeData();
  // }, [recipeId]);

  if (result.isSuccess) {
    return <RecipePageContent recipe={result.data.recipe} />;
  }
  return <GlobalLoadingIndicator />;
}
