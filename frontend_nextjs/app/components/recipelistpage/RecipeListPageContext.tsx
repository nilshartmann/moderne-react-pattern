import { PageResponseRecipeDto } from "@/app/components/api-types.ts";
import RecipeCard from "@/app/components/recipelistpage/RecipeCard.tsx";

type RecipeListProps = {
  recipesPromise: Promise<PageResponseRecipeDto>;
};

export default async function RecipeListPageContent({
  recipesPromise,
}: RecipeListProps) {
  const result = await recipesPromise;
  return (
    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {result.content.map((recipe) => {
        return (
          <div
            key={recipe.id}
            className={
              "h-full transform rounded border border-gray-200 bg-white p-4 shadow-lg transition-all duration-500 ease-in-out hover:drop-shadow-2xl "
            }
          >
            <RecipeCard recipe={recipe} />
          </div>
        );
      })}
    </div>
  );
}
