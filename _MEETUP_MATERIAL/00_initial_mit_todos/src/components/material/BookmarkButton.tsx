import { useNavigate } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";

type BookmarkButtonProps = {
  recipeId: string;
};

export function BookmarkButton({ recipeId }: BookmarkButtonProps) {
  console.log("Rendering BookmarkButton for recipe", recipeId);

  const navigate = useNavigate();

  /*
  TODO:
  - Add BookmarkButton to RecipeCard

  - use 'useSelect' from RecipeListRoute (getRouteApi)
  - select bookmarkedRecipeIds(recipeId) from search Params ("isBookmarked)
  - in handleToggleBookmark, use navigate and add search-Parameters
    - use  updateBookmarks
    -  updateBookmarks(s.bookmarkedRecipeIds, recipeId, !isBookmarked)


   */

  const isBookmarked = false;

  const handleToggleBookmark = () => {
    // navigate with new Search Params: updateBookmarks(s.bookmarkedRecipeIds, recipeId, !isBookmarked)
    // - what happens if we change 'navigate.from'?
  };

  return (
    <BookmarkIcon
      isBookmarked={isBookmarked}
      onToggleBookmark={handleToggleBookmark}
    />
  );
}

const updateBookmarks = (
  currentBookmarks: string[] | undefined,
  recipeId: string,
  bookmarked: boolean,
) => {
  const bAlreadyBookmarked = currentBookmarks?.includes(recipeId);
  if (bookmarked) {
    if (bAlreadyBookmarked) {
      // already bookmarked
      return currentBookmarks;
    }
    return currentBookmarks ? [...currentBookmarks, recipeId] : [recipeId];
  }

  if (bAlreadyBookmarked) {
    const newBookmarks = currentBookmarks!.filter((b) => b !== recipeId);
    return newBookmarks.length ? newBookmarks : undefined;
  }

  return currentBookmarks;
};

type BookmarkIconProps = {
  isBookmarked?: boolean;
  onToggleBookmark(): void;
};
function BookmarkIcon({ isBookmarked, onToggleBookmark }: BookmarkIconProps) {
  return (
    <div className={"absolute right-8 top-8 "}>
      <div
        className={
          "flex h-9 w-9 items-center justify-center rounded-full bg-white"
        }
        onClick={(e) => {
          e.preventDefault();
          onToggleBookmark();
        }}
      >
        <i
          className={twMerge(
            "fa-solid fa-bookmark text-lg text-gray-300 transition-all duration-500 ease-in-out hover:text-orange_2",
            isBookmarked && "text-green hover:text-green",
          )}
        ></i>
      </div>
    </div>
  );
}
