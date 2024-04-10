import {
  GetRecipeFeedbacksResponse,
  PageResponseRecipeDto,
} from "@/app/components/api-types.ts";
import {
  fetchFromApi,
  getEndpointConfig,
} from "@/app/components/fetch-from-api.ts";
import {
  recipesPerPage,
  slowDown_GetFeedbacks,
  slowDown_GetRecipe,
  slowDown_GetRecipeList,
} from "@/app/demo-config.tsx";

export function fetchRecipes(
  page: number,
  orderBy?: "time" | "rating",
  ids?: string[],
): Promise<PageResponseRecipeDto> {
  const idsString = ids?.join(",");
  const result = fetchFromApi(getEndpointConfig("get", "/api/recipes"), {
    query: {
      page,
      size: recipesPerPage,
      sort: orderBy,
      ids: idsString,
      slowdown: slowDown_GetRecipeList,
      // @ts-ignore
      timer: Date.now(),
    },
  });

  return result;
}

export function fetchRecipe(recipeId: string) {
  return fetchFromApi(getEndpointConfig("get", "/api/recipes/{recipeId}"), {
    path: {
      recipeId,
    },
    query: {
      slowdown: slowDown_GetRecipe,
    },
  });
}

export function fetchFeedback(
  recipeId: string,
): Promise<GetRecipeFeedbacksResponse> {
  return fetchFromApi(
    getEndpointConfig("get", "/api/recipes/{recipeId}/feedbacks"),
    {
      path: {
        recipeId,
      },
      query: {
        slowdown: slowDown_GetFeedbacks,
      },
    },
  );
}
