import { formatDate } from "../../../../components/formatters.ts";
import { useGetRecipeFeedbackQuery } from "../../../../components/use-queries.ts";
import { Link, useSearch } from "@tanstack/react-router";
import { PageButton } from "../../../../components/Button.tsx";
import { ReactNode } from "react";

type FeedbackListProps = {
  recipeId: string;
};
export default function FeedbackList({ recipeId }: FeedbackListProps) {
  const feedbackPage = useSearch({
    from: "/recipes/$recipeId/",
    select: (s) => s.feedback_page,
  });

  const { data } = useGetRecipeFeedbackQuery(recipeId, feedbackPage);

  return (
    <>
      {data.content.map((f) => {
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
      <div className="flex w-full justify-center space-x-12">
        {data.hasPrevious && (
          <PageLinkButton page={feedbackPage - 1}>&lt;</PageLinkButton>
        )}
        {data.hasNext && (
          <PageLinkButton page={feedbackPage + 1}>&gt;</PageLinkButton>
        )}
      </div>
    </>
  );
}

type PageLinkButtonProps = {
  page: number;
  children: ReactNode;
};

function PageLinkButton({ page, children }: PageLinkButtonProps) {
  return (
    <PageButton>
      <Link
        replace={true}
        from={"/recipes/$recipeId"}
        to={"/recipes/$recipeId"}
        search={(s) => ({ ...s, feedback_page: page })}
      >
        {children}
      </Link>
    </PageButton>
  );
}
