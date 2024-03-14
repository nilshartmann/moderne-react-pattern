import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/recipes/$recipeId/")({
  component: RecipePage,
});

function RecipePage() {
  /*  TODO:

    - Load data in 'loader' with 'recipeId' from 'params.recipeId'

    - use Route.useLoaderData() 

    - render: <RecipePageContent recipe={data.recipe} />
    
    */
  const { recipeId } = Route.useParams();

  return (
    <div className={"space-y-8 p-8 text-4xl"}>
      <h1>TODO! Implement me!</h1>
      <p>
        RecipeId from route: <code>{recipeId}</code>
      </p>
    </div>
  );
}
