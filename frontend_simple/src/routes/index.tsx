import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import LoadingIndicator from "../components/LoadingIndicator.tsx";
import { useDebounce } from "use-debounce";
import { Input } from "../components/Input.tsx";
import Label from "./recipes/-components/Label.tsx";
import z from "zod";
import { useRecipeSearchParam } from "./-components/useRecipeSearchParam.ts";
import RecipeSearch from "./-components/RecipeSearch.tsx";
import { useRecipifyWindowTitle } from "../components/useRecipifyWindowTitle.tsx";

const SearchPageParams = z.object({
  search: z.string().optional(),
});

export const Route = createFileRoute("/")({
  component: SearchPage,
  validateSearch: (s) => SearchPageParams.parse(s),
});

export default function SearchPage() {
  const [search, setSearch] = useRecipeSearchParam();
  const [searchTerm] = useDebounce(search, 200);

  useRecipifyWindowTitle(searchTerm.length < 3 ? null : searchTerm);

  return (
    <>
      <main className={"flex-grow"}>
        <div className="container mx-auto mt-8 flex max-w-96 pt-8">
          <Input
            type="search"
            name="search"
            aria-label="Enter at least three chars to start searching for recipes"
            className="h-8 p-6 hover:shadow-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => setSearch("")}
            className="ms-2 cursor-pointer text-gray-500 underline hover:text-gray-900"
          >
            Clear
          </button>
        </div>
        <div className="container mx-auto mt-2 w-1/4 space-y-8 rounded-lg pb-8 pt-8">
          {search.length < 3 ? (
            <Label>Type three letters to start search</Label>
          ) : (
            <Suspense fallback={<LoadingIndicator />}>
              <RecipeSearch search={searchTerm} />
            </Suspense>
          )}
        </div>
      </main>
    </>
  );
}
