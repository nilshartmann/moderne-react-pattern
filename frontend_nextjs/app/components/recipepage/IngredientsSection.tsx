"use client";

import { useState } from "react";
import { Ingredient } from "@/app/components/api-types.ts";
import IngredientList from "@/app/components/recipepage/IngredientsList.tsx";

type IngredientsProps = {
  ingredients: Ingredient[];
};
export default function IngredientsSection({ ingredients }: IngredientsProps) {
  const [servings, setServings] = useState(4);
  return (
    <>
      <div className={"mb-8 mt-8 flex items-center justify-between"}>
        <h2 className={"font-space text-3xl font-bold"}>Ingredients</h2>
        <div
          className={
            "rounded-lg border border-dotted border-gray-500 p-4 text-lg"
          }
        >
          <i
            className={
              "fa-solid fa-circle-plus text-orange_2 hover:cursor-pointer hover:text-orange_2-500"
            }
            onClick={() => setServings(servings + 1)}
          />
          <span className={"text-gray-500 "}> {servings} servings </span>
          <i
            className={
              "fa-solid fa-circle-minus text-orange_2 hover:cursor-pointer hover:text-orange_2-500"
            }
            onClick={() => setServings(servings - 1)}
          />{" "}
        </div>
      </div>
      <IngredientList ingredients={ingredients} servings={servings} />
    </>
  );
}
