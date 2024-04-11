import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Ingredient } from "../api-types.ts";

type IngredientsProps = {
  ingredients: Ingredient[];
  style?: "compact" | "large";
};

export function Ingredients({ ingredients, style }: IngredientsProps) {
  const [servings, setServings] = useState(4);
  return (
    <>
      <div className={"mb-8 mt-8 flex items-center justify-between"}>
        <h2 className={"font-space text-3xl font-bold"}>Ingredients</h2>
        <div
          className={twMerge(
            "p-2 text-lg",
            style === "large"
              ? "flex h-full items-center space-x-2 rounded bg-white"
              : "space-x-1 rounded-lg border border-dotted border-gray-500",
          )}
        >
          {style === "large" && (
            <span className={"text-gray-500 "}>Show ingredients for</span>
          )}

          <i
            className={
              "fa-solid fa-circle-plus text-orange_2 hover:cursor-pointer hover:text-orange_2-500"
            }
            onClick={() => setServings((s) => s + 1)}
          />
          <span className={"text-gray-500 "}> {servings} servings </span>
          <i
            className={twMerge(
              "fa-solid fa-circle-minus cursor-pointer text-orange_2 hover:text-orange_2-500",
              servings < 2 &&
                "cursor-default text-gray-300 hover:text-gray-300",
            )}
            onClick={() => setServings((s) => s - 1)}
          />
        </div>
      </div>
      {ingredients.map((i) => {
        return (
          <div
            className={
              "mb-4 me-4 ms-4 border-b border-dotted border-gray-300 pb-4"
            }
            key={i.name}
          >
            <i className="fa-regular fa-circle-check me-2 text-orange_2 "></i>
            <span className={"font-inter text-gray-500 "}>
              {(i.amount / 4) * servings} {i.unit} {i.name}
            </span>
          </div>
        );
      })}
    </>
  );
}
