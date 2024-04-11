import { ReactNode } from "react";
import { Button, CheckLabel } from "../Button.tsx";
import { getRouteApi, Link } from "@tanstack/react-router";

const recipeListRoute = getRouteApi("/recipes/");

export function FilterButton() {
  /*
  TODO:
   - useSearch benutzen, um mit select  showOnlyBookmarked || false abzufragen
   */
  const showOnlyBookmarked = false;

  return (
    <Button checked={showOnlyBookmarked}>
      <Link
        to={"/recipes"}
        /*
				TODO:
				 - showOnlyBookmarked hinzufügen
				 */
        search={(s) => ({
          ...s,
          page: 0,
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

type OrderButtonProps = {
  children: ReactNode;
  orderBy?: "time" | "rating" | undefined;
};

export function OrderButton({ children, orderBy }: OrderButtonProps) {
  const currentOrderBy = recipeListRoute.useSearch({
    select: (s) => s.orderBy,
  });

  const checked = orderBy === currentOrderBy;
  return (
    <Button checked={checked}>
      <Link
        to={"/recipes"}
        search={(s) => ({ ...s, orderBy: orderBy })}
        disabled={checked}
      >
        <CheckLabel checked={checked}>{children}</CheckLabel>
      </Link>
    </Button>
  );
}
