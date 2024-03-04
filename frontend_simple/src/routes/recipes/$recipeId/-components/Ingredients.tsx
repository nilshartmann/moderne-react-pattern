import { DetailedRecipeDto } from "../../../../components/api-types.ts";
import { useServingsStore } from "../../-components/useServingsStore.ts";
import ServingsWidget from "./ServingsWidget.tsx";

type IngredientsProps = {
  recipe: DetailedRecipeDto;
};

export function Ingredients({ recipe }: IngredientsProps) {
  const servingsStore = useServingsStore();

  return (
    <>
      <div className={"mb-8 mt-8 flex items-center justify-between"}>
        <h2 className={"font-space text-3xl font-bold"}>Ingredients</h2>
        <ServingsWidget />
      </div>
      {recipe.ingredients.map((i) => {
        return (
          <div
            className={
              "mb-4 me-4 ms-4 border-b border-dotted border-gray-300 pb-4"
            }
            key={i.name}
          >
            <i className="fa-regular fa-circle-check me-2 text-orange_2 "></i>
            <span className={"font-inter text-gray-500 "}>
              {(i.amount / 4) * servingsStore.servings} {i.unit} {i.name}
            </span>
          </div>
        );
      })}
    </>
  );
}
