import { GlobalLoadingIndicator } from "./GlobalLoadingIndicator.tsx";
import RecipePageContent from "../recipepage/RecipePageContent.tsx";
import { fetchFromApi, getEndpointConfig } from "../fetch-from-api.ts";
import { useSuspenseQuery } from "@tanstack/react-query";

type RecipePageWithFetchProps = {
  recipeId: string;
};

export default function RecipePageWithFetch({
  recipeId,
}: RecipePageWithFetchProps) {
  // const [recipe, setRecipe] = useState<DetailedRecipeDto | null>(null);

  // Suspense

  const queryResult = useSuspenseQuery({
    queryKey: ["recipes", recipeId],
    queryFn: () =>
      fetchFromApi(getEndpointConfig("get", "/api/recipes/{recipeId}"), {
        path: {
          recipeId,
        },
        query: { slowdown: 0 },
      }),
  });

  if (queryResult.isSuccess) {
    return <RecipePageContent recipe={queryResult.data.recipe} />;
  }

  // useEffect(() => {
  //   async function loadRecipeData() {
  //     const recipe = await fetchFromApi(
  //       getEndpointConfig("get", "/api/recipes/{recipeId}"),
  //       {
  //         path: {
  //           recipeId,
  //         },
  //         query: {},
  //       },
  //     );
  //
  //     // const response = await fetch(
  //     //   "http://localhost:8080/api/recipes/" + recipeId,
  //     // );
  //     // const data = await response.json();
  //     // //😱
  //     // const recipe = GetRecipeResponse.parse(data);
  //
  //     setRecipe(recipe.recipe);
  //   }
  //
  //   loadRecipeData();
  // }, [recipeId]);

  return <GlobalLoadingIndicator />;
}
