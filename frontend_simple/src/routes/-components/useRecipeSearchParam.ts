import { useNavigate } from "@tanstack/react-router";
import { Route } from "../index.tsx";

export function useRecipeSearchParam() {
  const search = Route.useSearch({
    select: (s) => s.search || "",
  });
  const nav = useNavigate({ from: Route.fullPath });

  const setSearch = (newSearch: string) => {
    nav({ search: { search: newSearch } });
  };

  return [search, setSearch] as const;
}
