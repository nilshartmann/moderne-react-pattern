import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import {
  GetRecipeFeedbacksResponse,
  GetRecipeResponse,
  RecipeSummaryDto,
} from "./api-types.ts";
import { fetchFromApi, getEndpointConfig } from "./fetch-from-api.ts";
import {
  slowDown_AddFeedback,
  slowDown_GetFeedback,
  slowDown_GetRecipe,
  slowDown_search,
  slowDown_searchDetails,
  slowDown_SubscribeNewsletter,
} from "../demo-config.tsx";

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

export function useGetRecipeFeedbackQuery(
  recipeId: string,
  feedbackPage: number,
) {
  return useSuspenseQuery({
    queryKey: ["recipes", recipeId, "feedback", feedbackPage],
    queryFn: () => {
      return fetchFromApi(
        getEndpointConfig("get", "/api/recipes/{recipeId}/feedback"),
        {
          path: {
            recipeId,
          },
          query: {
            slowdown: slowDown_GetFeedback,
            page: feedbackPage,
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
  const result = useSuspenseInfiniteQuery({
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

  const hasHits = result.data.pages[0]?.totalPages > 0;
  const allRecipes = result.data.pages.reduce((prev, cur) => {
    return [...prev, ...cur.content];
  }, [] as RecipeSummaryDto[]);

  return { ...result, allRecipes, hasHits } as const;
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
