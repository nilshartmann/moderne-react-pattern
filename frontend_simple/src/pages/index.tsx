import { createFileRoute } from "@tanstack/react-router";
import { Fragment, Suspense, useState } from "react";
import { useSearchQuery } from "../components/use-queries.ts";
import LoadingIndicator from "../components/LoadingIndicator.tsx";
import logo from "../components/material/logo.png";
import { useDebounce } from "use-debounce";
import { Button } from "../components/Button.tsx";

export const Route = createFileRoute("/")({
  component: RecipesPageLayout,
});

export default function RecipesPageLayout() {
  const [search, setSearch] = useState("");

  const [searchTerm] = useDebounce(search, 200);

  // todo: debounce

  return (
    <>
      <main className={"flex-grow "}>
        <div className="container mx-auto mt-8 flex max-w-96 pt-8">
          <input
            type="search"
            name="search"
            aria-label="Enter at least three chars to start searching for recipes"
            className="h-8 w-full max-w-full rounded border border-gray-400 bg-white p-6 text-gray-500 hover:shadow-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            // th:hx-get="@{/search(slowdown=1200)}"
            // th:hx-push-url="@{/search(search=${search})}"
            // hx-trigger="input[target.value.length > 2] changed delay:200ms"
            // hx-target="#searchResult"
            // hx-swap="outerHTML"
            // hx-indicator="#searchIndicator"
          />
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
    return (
      <div className="flex justify-center text-gray-500">
        Type three letters to start search
      </div>
    );
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

function SearchQuery({ search }: SearchQueryProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchQuery(search);

  return (
    <>
      {data.pages.map((page) => (
        <Fragment key={page.pageNumber}>
          {page.content.map((recipe) => (
            <div
              key={recipe.id}
              className="transform rounded border border-gray-200 bg-white p-4 shadow-lg transition-all duration-500 ease-in-out hover:drop-shadow-2xl"
            >
              <div className="flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="overflow-hidden">
                    <img
                      className="mb-2 h-24 max-h-full w-full max-w-full transform rounded object-cover transition-all duration-500 ease-in-out hover:scale-110"
                      src={`/images/recipes/food_${recipe.id}.png`}
                    />
                  </div>
                  <div className="flex justify-between text-red">
                    <p className="font-space text-sm font-medium uppercase tracking-[2px]">
                      {recipe.mealType}
                    </p>
                  </div>

                  <h1 className="font-space font-bold">
                    <a
                      // href="@{${'/recipes/' + recipe.id}}"
                      // th:hx-get="@{${'/recipes/' + recipe.id}}"
                      // th:hx-push-url="@{${'/recipes/' + recipe.id}}"
                      // hx-target="main"
                      className="cursor-pointer hover:text-orange_2 hover:underline"
                    >
                      {recipe.title}
                    </a>
                  </h1>
                  <div className="text mt-2 font-inter text-gray-500">
                    <span>{recipe.headline}</span>
                    <a
                      // th:href="@{${'/recipes/' + recipe.id}}"
                      // th:hx-get="@{${'/search/' + recipe.id + '/expand'}}"
                      // th:hx-target="${'#expanded_' + recipe.id}"
                      className="inline-block cursor-pointer text-orange_2 hover:underline"
                    >
                      More...
                    </a>
                  </div>
                  {/*<div th:id="${'expanded_' + recipe.id}">*/}
                  {/*  <div*/}
                  {/*    th:fragment="expandedRecipe"*/}
                  {/*    th:if="${detailId == recipe.id}"*/}
                  {/*  >*/}
                  {/*    <div className="mt-4 flex">*/}
                  {/*      <div className="mt-4 space-y-2">*/}
                  {/*        <p*/}
                  {/*          className="me-2 inline-block rounded border border-green bg-white p-2 text-[15px] text-green"*/}
                  {/*        >*/}
                  {/*          <i className="fa-regular fa-clock mr-2"></i>*/}
                  {/*          [[${@durationFormatter.formatMinutes(recipe.cookTime +*/}
                  {/*          recipe.preparationTime)}]]*/}
                  {/*        </p>*/}

                  {/*        <p*/}
                  {/*          th:each="c : ${recipe.categories}"*/}
                  {/*          className="me-2 inline-block rounded border border-green bg-white p-2 text-[15px] text-green"*/}
                  {/*        >*/}
                  {/*          <i th:class="${c.icon}"></i>*/}
                  {/*          <span className="ms-2" th:text="${c.title}"></span>*/}
                  {/*        </p>*/}
                  {/*      </div>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
              </div>
            </div>
          ))}
        </Fragment>
      ))}
      {hasNextPage && (
        <div className="flex justify-center" id="moreField">
          <Button>
            {isFetchingNextPage ? (
              <LoadingIndicator secondary placeholder={<img src={logo} />} />
            ) : (
              <button onClick={() => fetchNextPage()}>Find more...</button>
            )}
          </Button>
        </div>
      )}
    </>
  );
}
