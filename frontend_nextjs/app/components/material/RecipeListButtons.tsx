"use client";
import { Button, CheckLabel } from "@/app/components/Button.tsx";
import { useRecipeListSearchParams } from "@/app/components/material/useRecipeListSearchParams.tsx";
import Link from "next/link";
import { ReactNode } from "react";

export function FilterButton() {
  const [showOnlyBookmarked, buildHref] = useRecipeListSearchParams(
    (s) => s.showOnlyBookmarked || false,
  );

  return (
    <Button checked={showOnlyBookmarked}>
      <Link
        href={buildHref("/recipes", (s) => ({
          ...s,
          page: 0,
          showOnlyBookmarked: !showOnlyBookmarked,
        }))}
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
  orderBy?: "rating" | "time";
};
export function OrderButton({ orderBy, children }: OrderButtonProps) {
  const [currentOrderBy, buildHref] = useRecipeListSearchParams(
    (s) => s.orderBy,
  );
  const checked = orderBy === currentOrderBy;
  const href = buildHref("/recipes", (s) => ({
    ...s,
    orderBy,
  }));

  return (
    <Button checked={checked}>
      <CheckLabel checked={checked}>
        {checked ? children : <Link href={href}>{children}</Link>}
      </CheckLabel>
    </Button>
  );
}
