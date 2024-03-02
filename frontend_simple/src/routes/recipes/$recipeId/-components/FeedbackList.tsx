import { Feedback } from "../../../../components/api-types.ts";
import { formatDate } from "../../../../components/formatters.ts";

type FeedbackListProps = {
  feedbacks: Feedback[];
};
export default function FeedbackList({ feedbacks }: FeedbackListProps) {
  return (
    <>
      {feedbacks.map((f) => {
        return (
          <div
            key={f.id}
            className={
              "mb-8 rounded-2xl border border-dotted border-gray-300 bg-white pb-8 pe-4 ps-4 pt-4"
            }
          >
            <span className={"font-inter text-gray-500"}>
              <div className={"flex items-end justify-between"}>
                <div className={"font-medium"}>{f.commenter} </div>
                <div className={"text-sm"}>{formatDate(f.createdAt)}</div>
              </div>
              <div className={"mt-4"}>{f.comment}</div>
            </span>
          </div>
        );
      })}
    </>
  );
}
