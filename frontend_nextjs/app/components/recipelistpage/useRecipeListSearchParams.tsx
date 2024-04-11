import { useSearchParams } from "next/navigation";
import { buildUrl } from "@/app/components/material/build-url.ts";
import {
  RecipePageListParams,
  TRecipePageListParams,
} from "@/app/components/recipelistpage/RecipeListSearchParams.ts";

export function useRecipeListSearchParams<T>(
  select: (params: TRecipePageListParams) => T,
) {
  const params = useSearchParams();
  const paramsObject: Record<string, string | string[]> = {};

  for (const key of params.keys()) {
    const values = params.getAll(key);

    // if the values array has only one element, store it as a single value
    paramsObject[key] = values.length === 1 ? values[0] : values;
  }

  const validatedParams = RecipePageListParams.parse(paramsObject);

  function createSearchParams(
    path: string | null | undefined,
    selectCallback: (
      current: TRecipePageListParams,
    ) => Record<
      string,
      string | number | boolean | undefined | null | string[]
    >,
  ) {
    const newParams = selectCallback(validatedParams);
    return buildUrl(path, newParams);
  }

  return [select(validatedParams), createSearchParams] as const;
}
