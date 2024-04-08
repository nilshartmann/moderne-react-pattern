import ButtonBar from "../ButtonBar.tsx";
import { NavButtonBar } from "../NavButtonBar.tsx";
import { Button, CheckLabel } from "../Button.tsx";
import { getRouteApi, Link } from "@tanstack/react-router";
import { CheckButton } from "./CheckButton.tsx";

const recipeListRoute = getRouteApi("/recipes/");
function FilterButton() {
  const showOnlyBookmarked = recipeListRoute.useSearch({
    select: (s) => s.showOnlyBookmarked || false,
  });

  return (
    <Button checked={showOnlyBookmarked}>
      <Link
        to={"/recipes"}
        search={(s) => ({
          ...s,
          page: 0,
          showOnlyBookmarked: !showOnlyBookmarked,
        })}
      >
        <CheckLabel
          checked={showOnlyBookmarked}
          enabled={true}
          style={"square"}
        >
          Show only bookmarked
        </CheckLabel>
      </Link>
    </Button>
  );
}

export default function RecipeListNavBar() {
  const orderBy = recipeListRoute.useSearch({
    select: (s) => s.orderBy,
  });
  return (
    <NavButtonBar align={"left_right"}>
      <ButtonBar align={"start"}>
        <FilterButton />
      </ButtonBar>
      <ButtonBar>
        <CheckButton orderBy={undefined} checked={orderBy === undefined}>
          Newest first
        </CheckButton>
        <CheckButton orderBy={"rating"} checked={orderBy === "rating"}>
          Best rated
        </CheckButton>
        <CheckButton orderBy={"time"} checked={orderBy === "time"}>
          Shortest time
        </CheckButton>
      </ButtonBar>
    </NavButtonBar>
  );
}
