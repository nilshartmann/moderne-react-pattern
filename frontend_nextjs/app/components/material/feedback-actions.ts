"use server";

import { zfd } from "zod-form-data";
import { z } from "zod";
import {
  fetchFromApi,
  getEndpointConfig,
} from "@/app/components/fetch-from-api.ts";
import { slowDown_AddFeedback } from "@/app/demo-config.tsx";
import { revalidateTag } from "next/cache";

export type FeedbackFormState =
  | { result?: never; message?: never; key?: never }
  | { result: "success"; message?: string; key: string }
  | { result: "error"; message: string; key?: never };

const FormSchema = zfd.formData({
  recipeId: zfd.text(),
  stars: zfd.numeric(z.number().min(1).max(5)),
  comment: zfd.text(z.string().max(1000)),
  commenter: zfd.text(z.string().min(3)),
});

export async function feedbackFormAction(
  prevState: FeedbackFormState,
  formData: FormData,
): Promise<FeedbackFormState> {
  console.log("feedbackFormAction :: prevState", prevState, formData);

  const data = FormSchema.safeParse(formData);

  if (!data.success) {
    const i = data.error.issues.map((i) => i.path.join(".")).join(", ");
    console.log("ERROR", data.error);
    return {
      result: "error",
      message:
        "Invalid Form Data submitted. Please make sure to fill out the form correctly. Invalid field: " +
        i,
    };
  }

  const { recipeId, ...payload } = data.data;

  const tag = `feedback/${recipeId}`;

  const result = await fetchFromApi(
    getEndpointConfig("post", "/api/recipes/{recipeId}/feedbacks"),
    {
      path: { recipeId },
      body: { feedbackData: payload },
      query: {
        slowdown: slowDown_AddFeedback,
      },
    },
    [tag],
  );

  revalidateTag(tag);

  return {
    result: "success",
    // please forgive me 🙏
    key: Date.now().toString(),
  };
}
