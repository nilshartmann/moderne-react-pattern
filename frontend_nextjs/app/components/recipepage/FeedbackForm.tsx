"use client";
import { Input, Textarea } from "../Input";
import { Button } from "../Button.tsx";
import ButtonBar from "../ButtonBar.tsx";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useFormState } from "react-dom";
import { feedbackFormAction } from "@/app/components/material/feedback-actions.ts";
import RatingInput from "@/app/components/recipepage/RatingInput.tsx";

type AddFeedbackFormProps = {
  recipeId: string;
};

export function FeedbackForm({ recipeId }: AddFeedbackFormProps) {
  const [currentState, formAction, isPending] = useFormState(
    feedbackFormAction,
    {},
  );

  const [stars, setStars] = useState(-1);
  const [commentLength, setCommentLength] = useState(0);

  const formDisabled = isPending;

  return (
    <form action={formAction} key={currentState.key || "form1"}>
      {/* <!-- Welcome back, ol' hidden friend --> */}
      <input type={"hidden"} name="recipeId" value={recipeId} autoFocus />
      <h2 className={"mb-4 font-space text-3xl font-bold"}>Your opinion?</h2>
      <div
        className={
          "mb-8 rounded-2xl border border-dotted border-gray-300 bg-white p-8 font-inter text-gray-500 hover:border-solid"
        }
      >
        <div className={"mb-4 font-medium"}>Your name:</div>

        <div className={"mb-8"}>
          <Input
            disabled={formDisabled}
            name={"commenter"}
            className={
              "rounded-lg border-gray-300 pb-6 pt-6 hover:outline hover:outline-orange_2 focus:outline focus:outline-orange_2"
            }
          />
        </div>

        <div className={"mb-4 font-medium"}>Your rating:</div>

        <div className={"mb-8"}>
          <RatingInput
            stars={stars}
            onStarsChange={setStars}
            disabled={formDisabled}
          />
        </div>

        <div className={"mb-4 font-medium"}>Your comment:</div>
        <div className={"mb-2"}>
          <Textarea
            rows={4}
            name={"comment"}
            className={
              "rounded-lg border-gray-300 pb-6 pt-3 focus:outline focus:outline-orange_2"
            }
            onChange={(e) => setCommentLength(e.target.value.length)}
            disabled={formDisabled}
          />
        </div>
        <div className={"mb-4 flex w-full items-center"}>
          <span
            className={twMerge("text-sm", commentLength > 500 && "text-red")}
          >
            {commentLength}/500 characters
          </span>
        </div>
        <div>
          <ButtonBar align={"end"}>
            <Button disabled={formDisabled}>
              <button type={"submit"} disabled={formDisabled}>
                Submit Rating
              </button>
            </Button>
          </ButtonBar>
        </div>
        {currentState.result === "success" && (
          <div>
            <div className={"mt-4 font-medium text-green"}>
              Thanks for your submission!
            </div>
          </div>
        )}
        {currentState.result === "error" && (
          <div>
            <div className={"mt-4 font-medium text-red"}>
              {currentState.message}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
