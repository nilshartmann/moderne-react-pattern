import { DetailedRecipeDto } from "../../../../components/api-types.ts";
import { Fragment } from "react";

type InstructionsProps = {
  recipe: DetailedRecipeDto;
};

export function Instructions({ recipe }: InstructionsProps) {
  return (
    <>
      <h2 className={"mb-8 mt-8 font-space text-3xl font-bold"}>
        Instructions
      </h2>
      <div className={"me-4 ms-4"}>
        {recipe.instructions.map((i) => (
          <Fragment key={i.orderNo}>
            <div
              className={
                "mt-8 items-start border-b border-dotted border-gray-300 pb-8 sm:flex "
              }
            >
              <div className={"font-space font-medium text-red sm:w-1/4"}>
                Step {i.orderNo}
              </div>
              <div
                className={
                  "mt-4 font-inter text-gray-500 sm:mt-0 sm:w-3/4 sm:pe-1.5"
                }
              >
                {i.description}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}
