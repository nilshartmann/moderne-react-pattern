import Label from "../recipes/-components/Label.tsx";
import LoadingIndicator from "../../components/LoadingIndicator.tsx";
import { useSearchQuery } from "../../components/use-queries.ts";
import { Button } from "../../components/Button.tsx";
import RecipeSummaryCard from "./RecipeSummaryCard.tsx";

type SearchProps = {
  search: string;
};

export default function RecipeSearch({ search }: SearchProps) {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    hasHits,
    allRecipes,
  } = useSearchQuery(search);

  if (!hasHits) {
    return <Label>No recipes found.</Label>;
  }

  return (
    <>
      <Label>Recipes for {search}</Label>
      {allRecipes.map((recipe) => (
        <RecipeSummaryCard key={recipe.id} recipe={recipe} />
      ))}
      {hasNextPage && (
        <div className="flex justify-center">
          <Button>
            {isFetchingNextPage ? (
              <LoadingIndicator secondary />
            ) : (
              <button onClick={() => fetchNextPage()}>Find more...</button>
            )}
          </Button>
        </div>
      )}
      {hasNextPage || <Label>No more recipes. Happy cooking!</Label>}
    </>
  );
}
