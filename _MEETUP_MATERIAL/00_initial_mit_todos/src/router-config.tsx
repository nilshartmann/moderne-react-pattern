// /* eslint-disable react-refresh/only-export-components */
//
// import {
//   NotFoundRoute,
//   Outlet,
//   RootRoute,
//   Route,
//   Router,
// } from "@tanstack/react-router";
// import RecipesPageLayout from "./pages/_recipes/RecipesPageLayout.tsx";
// import z from "zod";
// import RecipeListPage from "./pages/_recipes/RecipeListPage.tsx";
// import RecipePage from "./pages/_recipes/$recipeId/RecipePage.tsx";
// import ShopingListPage from "./pages/_recipes/$recipeId/shoppinglist/ShoppingListPage.tsx";
// import AboutPage from "./pages/AboutPage.tsx";
// import { PrivacyPage } from "./pages/PrivacyPage.tsx";
// import DefaultPageLayout from "./pages/DefaultPageLayout.tsx";
// import LandingPage from "./pages/LandingPage.tsx";
//
// const rootRoute = new RootRoute({
//   component: () => (
//     <>
//       {/*<ScrollRestoration />*/}
//       <Outlet />
//       {/*<TanStackRouterDevtools />*/}
//     </>
//   ),
// });
//
// const staticPageLayoutRoute = new Route({
//   id: "staticpages",
//   getParentRoute: () => rootRoute,
//   component: DefaultPageLayout,
// });
//
// const aboutRoute = new Route({
//   path: "about",
//   getParentRoute: () => staticPageLayoutRoute,
//   component: AboutPage,
// });
//
// const privacyRoute = new Route({
//   path: "privacy",
//   getParentRoute: () => staticPageLayoutRoute,
//   component: PrivacyPage,
// });
//
// const notFoundRoute = new NotFoundRoute({
//   component: () => <h1>Page not found 😢</h1>,
//   getParentRoute: () => rootRoute,
// });
//
// const landingPageRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/",
//   component: LandingPage,
// });
//
// const recipesLayoutRoute = new Route({
//   getParentRoute() {
//     return staticPageLayoutRoute;
//   },
//   path: "recipes",
//   component: RecipesPageLayout,
// });
//
// const RecipePageListParams = z.object({
//   page: z.number().min(0).optional(),
//   orderBy: z.enum(["time", "rating"]).optional(),
//   bookmarkedRecipeIds: z.string().array().optional(),
//   showOnlyBookmarked: z.boolean().optional(),
// });
// type TRecipePageListParams = z.infer<typeof RecipePageListParams>;
//
// export const recipeListRoute = new Route({
//   path: "/",
//   getParentRoute() {
//     return recipesLayoutRoute;
//   },
//   validateSearch: (search): TRecipePageListParams =>
//     RecipePageListParams.parse(search),
//   component: RecipeListPage,
// });
//
// export const recipeRoute = new Route({
//   path: "$recipeId",
//   getParentRoute() {
//     return recipesLayoutRoute;
//   },
//
//   component: RecipePage,
// });
//
// export const shoppingListRoute = new Route({
//   path: "$recipeId/shoppinglist",
//   getParentRoute() {
//     return recipesLayoutRoute;
//   },
//   component: ShopingListPage,
// });
//
// const routeTree = rootRoute.addChildren([
//   landingPageRoute,
//   staticPageLayoutRoute.addChildren([
//     aboutRoute,
//     privacyRoute,
//     recipesLayoutRoute.addChildren([
//       recipeListRoute,
//       recipeRoute,
//       shoppingListRoute,
//     ]),
//   ]),
// ]);
//
// export const router = new Router({ routeTree, notFoundRoute });
//
// declare module "@tanstack/react-router" {
//   interface Register {
//     router: typeof router;
//   }
// }
