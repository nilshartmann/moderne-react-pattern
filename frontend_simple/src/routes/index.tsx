import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Fragment, Suspense, useEffect, useState } from "react";
import {
  useGetRecipeQuery,
  useSearchQuery,
} from "../components/use-queries.ts";
import LoadingIndicator from "../components/LoadingIndicator.tsx";
import logo from "../components/logo.png";
import { useDebounce } from "use-debounce";
import { Button } from "../components/Button.tsx";
import { RecipeSummaryDto } from "../components/api-types.ts";
import { Input } from "../components/Input.tsx";
import Label from "./recipes/-components/Label.tsx";
import { RecipeCategories } from "../components/RecipeCategories.tsx";
import { twMerge } from "tailwind-merge";
import { H2 } from "../components/Heading.tsx";
import z from "zod";

const SearchPageParams = z.object({
  search: z.string().optional(),
});

export const Route = createFileRoute("/")({
  component: SearchPage,
  validateSearch: (s) => SearchPageParams.parse(s),
});

function updateWindowTitle(searchTerm: string) {
  const currentTitle = window.document.title;

  if (searchTerm.length < 3) {
    window.document.title = "Recipify";
  } else {
    window.document.title = `${searchTerm} - Recipify`;
  }

  return () => {
    window.document.title = currentTitle;
  };
}

function useRecipeSearchParam() {
  const search = Route.useSearch({
    select: (s) => s.search || "",
  });
  const nav = useNavigate({ from: Route.fullPath });

  const setSearch = (newSearch: string) => {
    nav({ search: { search: newSearch } });
  };

  return [search, setSearch] as const;
}

export default function SearchPage() {
  const [search, setSearch] = useRecipeSearchParam();
  const [searchTerm] = useDebounce(search, 200);

  useEffect(() => {
    return updateWindowTitle(searchTerm);
  }, [searchTerm]);

  return (
    <>
      <main className={"flex-grow "}>
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
          <Search search={searchTerm} />
        </div>
      </main>
    </>
  );
}

type SearchProps = {
  search: string;
};

function Search({ search }: SearchProps) {
  if (search.length < 3) {
    return <Label>Type three letters to start search</Label>;
  }

  return (
    <Suspense fallback={<LoadingIndicator placeholder={<img src={logo} />} />}>
      <SearchQuery search={search} />
    </Suspense>
  );
}

type SearchQueryProps = {
  search: string;
};

type SearchResultCard = {
  recipe: RecipeSummaryDto;
};
function SearchResultCard({ recipe }: SearchResultCard) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      key={recipe.id}
      className="transform rounded border border-gray-200 bg-white p-4 shadow-lg transition-all duration-500 ease-in-out hover:drop-shadow-2xl"
    >
      <div className="flex justify-between space-x-2 ">
        <div className={"flex w-2/3 flex-col justify-between "}>
          <div className={"space-y-2"}>
            <p className="font-space text-sm font-medium uppercase tracking-[2px] text-red">
              {recipe.mealType}
            </p>
            <H2 className="font-space font-bold">
              <Link
                to={"/recipes/$recipeId"}
                search={true}
                params={{
                  recipeId: recipe.id,
                }}
                className="cursor-pointer hover:text-orange_2 hover:underline"
              >
                {recipe.title}
              </Link>
            </H2>
          </div>
          <div>
            <i
              className={twMerge(
                "fa-solid cursor-pointer text-orange",
                isOpen ? "fa-angles-up" : "fa-angles-down",
              )}
              onClick={() => setIsOpen((o) => !o)}
            ></i>
          </div>
        </div>
        <div className={"w-1/3"}>
          <div className="overflow-hidden">
            <img
              className="mb-2 h-24 max-h-full w-full max-w-full transform rounded object-cover transition-all duration-500 ease-in-out hover:scale-110"
              src={`/images/recipes/food_${recipe.id}.png`}
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <Suspense
          fallback={<LoadingIndicator placeholder={<img src={logo} />} />}
        >
          <RecipeDetails recipeId={recipe.id} />
        </Suspense>
      )}
    </div>
  );
}

type RecipeDetailsProps = {
  recipeId: string;
};
function RecipeDetails({ recipeId }: RecipeDetailsProps) {
  const { data } = useGetRecipeQuery(recipeId);

  return (
    <div className={"mt-4 space-y-4"}>
      <p>{data.recipe.headline}</p>
      <RecipeCategories recipe={data.recipe} />
    </div>
  );
}

function SearchQuery({ search }: SearchQueryProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchQuery(search);

  const hasHits = data.pages[0].totalPages > 0;

  if (!hasHits) {
    return <Label>No recipes found.</Label>;
  }

  return (
    <>
      <Label>Recipes for {data.pages[0].meta}</Label>
      {data.pages.map((page) => (
        <Fragment key={page.pageNumber}>
          {page.content.map((recipe) => (
            <SearchResultCard key={recipe.id} recipe={recipe} />
          ))}
        </Fragment>
      ))}
      {hasNextPage && (
        <div className="flex justify-center">
          <Button>
            {isFetchingNextPage ? (
              <LoadingIndicator secondary placeholder={<img src={logo} />} />
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
