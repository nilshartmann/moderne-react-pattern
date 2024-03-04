import Label from "../recipes/-components/Label.tsx";
import LoadingIndicator from "../../components/LoadingIndicator.tsx";
import { RecipeSummaryDto } from "../../components/api-types.ts";
import { useSearchQuery } from "../../components/use-queries.ts";
import { Button } from "../../components/Button.tsx";
import RecipeSummaryCard from "./RecipeSummaryCard.tsx";

type SearchProps = {
  search: string;
};

export default function RecipeSearch({ search }: SearchProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchQuery(search);

  const hasHits = data.pages[0]?.totalPages > 0;

  if (!hasHits) {
    return <Label>No recipes found.</Label>;
  }

  const allRecipes = data.pages.reduce((prev, cur) => {
    return [...prev, ...cur.content];
  }, [] as RecipeSummaryDto[]);

  return (
    <>
      <Label>Recipes for {data.pages[0].meta}</Label>
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
