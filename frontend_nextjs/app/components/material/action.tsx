"use server";
import { Ingredient } from "@/app/components/api-types.ts";
import IngredientList from "@/app/components/material/IngredientsList.tsx";

let counter = 0;
export async function increment(amount: number) {
  counter = counter + amount;
  console.log("New Counter", counter);
  return counter;
}

export async function generateGreeting(name: string = Date.now().toString()) {
  return <div className={"bg-red text-2xl"}>Hello {name}</div>;
}

export async function calculateIngredients(
  servings: number,
  ingredients: Ingredient[],
) {
  return <IngredientList ingredients={ingredients} servings={servings} />;
}
