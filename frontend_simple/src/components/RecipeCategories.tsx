import { RecipeDto } from "./api-types.ts";
import { formatMinuteDuration } from "./formatters.ts";

type RecipeCategoriesProps = {
  recipe: RecipeDto;
  hideTime?: boolean;
};

export function RecipeCategories({ recipe, hideTime }: RecipeCategoriesProps) {
  return (
    <div className={"space-y-2"}>
      {hideTime || (
        <p className="me-2 inline-block rounded border border-green bg-white p-2 text-[15px] text-green">
          <i className="fa-regular fa-clock mr-2"></i>
          {formatMinuteDuration(recipe.cookTime + recipe.preparationTime)}
        </p>
      )}
      {recipe.categories.map((c) => (
        <p
          key={c.description + "_" + c.title}
          className={
            "me-2 inline-block rounded border border-green bg-white p-2 text-[15px] text-green"
          }
        >
          <i className={c.icon} />
          <span className={"ms-2"}>{c.title}</span>
        </p>
      ))}
    </div>
  );
}
