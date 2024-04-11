import FeedbackList from "./FeedbackList.tsx";
import { useGetRecipeFeedbackQuery } from "../use-queries.ts";

type FeedbackListProps = {
  recipeId: string;
};
export default function FeedbackListLoader({ recipeId }: FeedbackListProps) {
  const {
    data: { feedbacks = [] },
  } = useGetRecipeFeedbackQuery(recipeId);

  return <FeedbackList feedbacks={feedbacks} />;
}
