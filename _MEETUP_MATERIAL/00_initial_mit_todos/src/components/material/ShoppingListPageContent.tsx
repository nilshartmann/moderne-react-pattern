import { Link } from "@tanstack/react-router";
import { useGetRecipeQuery } from "../use-queries.ts";

type ShoppingListPageProps = { recipeId: string };
export default function ShoppingListPage({ recipeId }: ShoppingListPageProps) {
  const {
    data: { recipe },
  } = useGetRecipeQuery(recipeId);

  return (
    <>
      <div className={"container mx-auto mt-16 md:w-1/2"}>
        <h2 className={"mb-4 mt-4 font-space text-2xl font-bold"}>
          Shopping list
        </h2>

        <h1
          className={"mb-8 mt-4 font-space text-5xl font-bold hover:underline"}
        >
          <Link to={"/recipes/$recipeId"} params={{ recipeId }}>
            {recipe.title}
          </Link>
        </h1>

        {recipe.ingredients.map((i) => {
          return (
            <div
              className={
                "mb-8 border-b border-dotted border-gray-300 pb-8  text-2xl"
              }
              key={i.name}
            >
              <i className="fa-regular fa-square me-4 "></i>
              <span className={"font-inter text-gray-900 "}>
                {i.amount} {i.unit} {i.name}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
