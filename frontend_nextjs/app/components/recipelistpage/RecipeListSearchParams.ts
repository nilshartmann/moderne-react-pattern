import { z } from "zod";

export const RecipePageListParams = z.object({
  page: z.number().min(0).or(z.string()).pipe(z.coerce.number()).optional(),
  orderBy: z.enum(["time", "rating"]).optional(),
  bookmarkedRecipeIds: z
    .string()
    .or(z.string().array())
    .transform((x) => {
      if (x === undefined || x === null) {
        return undefined;
      }
      if (Array.isArray(x)) {
        return x;
      }
      return [x];
    })
    .optional(),
  showOnlyBookmarked: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
});
export type TRecipePageListParams = z.infer<typeof RecipePageListParams>;

export function getValidatedRecipeListSearchParams(
  searchParams: TRecipePageListParams,
) {
  const params = RecipePageListParams.parse(searchParams);

  return {
    page: params.page || 0,
    orderBy: params.orderBy,
    showOnlyIds: params.showOnlyBookmarked
      ? params.bookmarkedRecipeIds || []
      : undefined,
  };
}

// const stringToNumber = z
//   .string()
//   .or(z.string().array())
//   .optional()
//   .transform((x) => {
//     if (x === undefined || x === null) {
//       return undefined;
//     }
//     if (Array.isArray(x)) {
//       return x;
//     }
//     return [x];
//   });
//
// const y = stringToNumber.parse(3123);
