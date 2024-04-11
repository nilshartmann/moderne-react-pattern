import FeedbackList from "./FeedbackList.tsx";
import { GetRecipeFeedbacksResponse } from "@/app/components/api-types.ts";

type FeedbackListProps = {
  feedbackPromise: Promise<GetRecipeFeedbacksResponse>;
};
export default async function FeedbackListLoader({
  feedbackPromise,
}: FeedbackListProps) {
  const data = await feedbackPromise;

  return <FeedbackList feedbacks={data.feedbacks} />;
}
