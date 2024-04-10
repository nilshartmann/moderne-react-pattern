import { Fragment, ReactNode } from "react";
import ButtonBar from "./ButtonBar.tsx";

export type PageLabel = {
  label: string;
  state: "active" | "disabled" | "selectable";
  page: number;
  disabled: boolean;
};

type FallbackPaginationBarProps = {
  totalPagesPromise?: never;
  currentPage?: never;
  children: (label: PageLabel) => ReactNode;
};

type ResolvedPaginationBarProps = {
  totalPagesPromise: Promise<number>;
  currentPage: number;
  children: (label: PageLabel) => ReactNode;
};

type PaginationBarProps =
  | FallbackPaginationBarProps
  | ResolvedPaginationBarProps;

export default async function PaginationBar({
  totalPagesPromise,
  currentPage = 0,
  children,
}: PaginationBarProps) {
  let totalPages = -1;
  let disabled: boolean = true;

  if (totalPagesPromise) {
    totalPages = await totalPagesPromise;
    disabled = false;
  }

  const currentPageNumber = currentPage + 1;
  const maxButtons = 6;
  let startPage: number;
  let endPage: number;
  const buttons: ReactNode[] = [];

  if (currentPageNumber <= Math.floor(maxButtons / 2)) {
    startPage = 1;
    endPage = Math.min(maxButtons, totalPages);
  } else if (currentPageNumber > totalPages - Math.floor(maxButtons / 2)) {
    startPage = Math.max(totalPages - maxButtons + 1, 1);
    endPage = totalPages;
  } else {
    startPage = currentPageNumber - Math.floor(maxButtons / 2);
    endPage = startPage + maxButtons - 1;
  }

  buttons.push(
    <Fragment key={"first_page"}>
      {children({
        label: "<<",
        state: disabled || currentPageNumber <= 1 ? "disabled" : "selectable",
        page: 0,
        disabled: disabled || currentPageNumber <= 1,
      })}
    </Fragment>,
  );
  buttons.push(
    <Fragment key={"prev_page"}>
      {children({
        label: "<",
        state: disabled || currentPageNumber <= 1 ? "disabled" : "selectable",
        page: currentPage - 1,
        disabled: disabled || currentPageNumber <= 1,
      })}
    </Fragment>,
  );
  for (let page = startPage; page <= endPage; page++) {
    buttons.push(
      <Fragment key={page}>
        {children({
          label: page.toString(),
          state: disabled
            ? "disabled"
            : page !== currentPageNumber
              ? "selectable"
              : "active",
          page: page - 1,
          disabled: disabled || page === currentPageNumber,
        })}
      </Fragment>,
    );
  }
  buttons.push(
    <Fragment key={"next_page"}>
      {children({
        label: ">",
        state:
          disabled || currentPageNumber >= totalPages
            ? "disabled"
            : "selectable",
        page: currentPage + 1,
        disabled: disabled || currentPageNumber >= totalPages,
      })}
    </Fragment>,
  );
  buttons.push(
    <Fragment key={"last_page"}>
      {children({
        label: ">>",
        state:
          disabled || currentPageNumber >= totalPages
            ? "disabled"
            : "selectable",
        page: totalPages - 1,
        disabled: disabled || currentPageNumber >= totalPages,
      })}
    </Fragment>,
  );

  return <ButtonBar>{buttons}</ButtonBar>;
}
