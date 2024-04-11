"use client";
import { Button, CheckLabel } from "@/app/components/Button.tsx";
import Link from "next/link";
import { MouseEventHandler, ReactNode, useTransition } from "react";
import { useRouter } from "next/navigation";
import LoadingIndicator from "@/app/components/LoadingIndicator.tsx";
import { useRecipeListSearchParams } from "@/app/components/recipelistpage/useRecipeListSearchParams.tsx";

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

  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const checked = orderBy === currentOrderBy;
  const href = buildHref("/recipes", (s) => ({
    ...s,
    orderBy,
  }));

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    console.log("HANDLE CLICK", orderBy);
    startTransition(() => {
      console.log("START TRANSITION FOR ORDER BY", orderBy);
      router.push(href);
    });
  };
  //<Link href={href}>{children}</Link>}

  return (
    <Button checked={checked}>
      <CheckLabel checked={checked}>
        {checked ? (
          children
        ) : pending ? (
          <LoadingIndicator secondary />
        ) : (
          <Link href={href} onClick={handleClick}>
            {children}
          </Link>
        )}
      </CheckLabel>
    </Button>
  );
}
