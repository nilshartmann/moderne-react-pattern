import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import {
  GetRecipeFeedbacksResponse,
  GetRecipeIngredientsResponse,
  GetRecipeResponse,
  PageResponseRecipeDto,
} from "./api-types.ts";
import { fetchFromApi, getEndpointConfig } from "./fetch-from-api.ts";
import {
  recipesPerPage,
  slowDown_AddFeedback,
  slowDown_GetFeedbacks,
  slowDown_GetIngredients,
  slowDown_GetRecipe,
  slowDown_GetRecipeList,
  slowDown_search,
  slowDown_searchDetails,
  slowDown_SubscribeNewsletter,
} from "../demo-config.tsx";

const getAllRecipesQueryOptions = (
  page: number,
  orderBy?: "time" | "rating",
  ids?: string[],
) => {
  const idsString = ids?.join(",");

  return {
    queryKey: ["recipe-list", page, orderBy, idsString],
    queryFn: () => {
      return fetchFromApi(getEndpointConfig("get", "/api/recipes"), {
        query: {
          page,
          size: recipesPerPage,
          sort: orderBy,
          ids: idsString,
          slowdown: slowDown_GetRecipeList,
        },
      });
    },
  };
};

export function useGetAllRecipesQuery(
  page: number,
  orderBy?: "time" | "rating",
  ids?: string[],
): UseSuspenseQueryResult<PageResponseRecipeDto> {
  return useSuspenseQuery<PageResponseRecipeDto>(
    getAllRecipesQueryOptions(page, orderBy, ids),
  );
}

export function useGetTotalPageCountQuery(
  page: number,
  orderBy?: "time" | "rating",
  ids?: string[],
) {
  const result = useQuery(getAllRecipesQueryOptions(page, orderBy, ids));
  if (result.isSuccess) {
    return result.data.totalPages;
  }

  return -1;
}

export function useGetRecipeQuery(
  recipeId: string,
): UseSuspenseQueryResult<GetRecipeResponse> {
  return useSuspenseQuery<GetRecipeResponse>({
    queryKey: ["recipes", recipeId],
    queryFn: () => {
      return fetchFromApi(getEndpointConfig("get", "/api/recipes/{recipeId}"), {
        path: {
          recipeId,
        },
        query: {
          slowdown: slowDown_GetRecipe,
        },
      });
    },
  });
}

export function useGetRecipeIngredientsQuery(
  recipeId: string,
): UseSuspenseQueryResult<GetRecipeIngredientsResponse> {
  return useSuspenseQuery<GetRecipeIngredientsResponse>({
    queryKey: ["recipes", recipeId, "ingredients"],
    queryFn: () => {
      return fetchFromApi(
        getEndpointConfig("get", "/api/recipes/{recipeId}/ingredients"),
        {
          path: {
            recipeId,
          },
          query: {
            slowdown: slowDown_GetIngredients,
          },
        },
      );
    },
  });
}

export function useGetRecipeFeedbacksQuery(
  recipeId: string,
): UseSuspenseQueryResult<GetRecipeFeedbacksResponse> {
  return useSuspenseQuery<GetRecipeFeedbacksResponse>({
    queryKey: ["recipes", recipeId, "feedbacks"],
    queryFn: () => {
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
    },
  });
}

type AddFeedbackMutationProps = {
  payload: {
    commenter: string;
    stars: number;
    comment: string;
  };
};

export function useAddFeedbackMutation(recipeId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["POST", "recipes", recipeId, "feedbacks"],
    mutationFn: ({ payload }: AddFeedbackMutationProps) => {
      return fetchFromApi(
        getEndpointConfig("post", "/api/recipes/{recipeId}/feedbacks"),
        {
          path: { recipeId },
          body: { feedbackData: payload },
          query: {
            slowdown: slowDown_AddFeedback,
          },
        },
      );
    },
    onSuccess: (newFeedback) => {
      queryClient.setQueryData(
        ["recipes", recipeId, "feedbacks"],
        (oldData: unknown) => {
          console.log("ON SUCCESS", newFeedback, oldData);
          if (!oldData) {
            return oldData;
          }
          const result = GetRecipeFeedbacksResponse.safeParse(oldData);
          if (!result.success) {
            console.log("Unknown query data in cache", result, oldData);
            return oldData;
          }

          const oldFeedbacks = result.data;

          const newData = {
            ...oldFeedbacks,
            feedbacks: [...oldFeedbacks.feedbacks, newFeedback.newFeedback],
          } satisfies GetRecipeFeedbacksResponse;

          return newData;
        },
      );
    },
  });
}

export function useSubscribeToNewsletterMutation() {
  return useMutation({
    mutationFn: (email: string) => {
      return fetchFromApi(
        getEndpointConfig("post", "/api/newsletter/subscribe"),
        {
          body: { email },
          query: {
            slowdown: slowDown_SubscribeNewsletter,
          },
        },
      );
    },
  });
}

export function useSearchQuery(search: string) {
  return useSuspenseInfiniteQuery({
    queryKey: ["search", search],
    queryFn: async (page) => {
      console.log("searching for", search);
      const result = await fetchFromApi(
        getEndpointConfig("get", "/api/search"),
        {
          query: {
            search,
            slowdown: slowDown_search,
            page: page.pageParam,
          },
        },
      );
      console.log("search returned for", search);
      return result;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.pageNumber + 1 : null;
    },
    getPreviousPageParam: () => null,
  });
}

export function useSearchDetailsQuery(recipeId: string) {
  return useSuspenseQuery({
    queryKey: ["search", recipeId, "details"],
    queryFn: () =>
      fetchFromApi(getEndpointConfig("get", "/api/search/{recipeId}/details"), {
        query: {
          slowdown: slowDown_searchDetails,
        },
        path: {
          recipeId,
        },
      }),
  });
}
