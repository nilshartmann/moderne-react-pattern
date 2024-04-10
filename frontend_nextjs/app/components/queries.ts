import { PageResponseRecipeDto } from "@/app/components/api-types.ts";
import {
  fetchFromApi,
  getEndpointConfig,
} from "@/app/components/fetch-from-api.ts";
import { recipesPerPage, slowDown_GetRecipeList } from "@/app/demo-config.tsx";

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
    },
  });

  return result;
}
