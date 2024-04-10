import FeedbackList from "./FeedbackList.tsx";
import { fetchFeedback } from "@/app/components/queries.ts";

type FeedbackListProps = {
  recipeId: string;
};
export default async function FeedbackListLoader({
  recipeId,
}: FeedbackListProps) {
  const data = await fetchFeedback(recipeId);

  return <FeedbackList feedbacks={data.feedbacks} />;
}
