import { fetchRecipes } from "@/app/components/queries.ts";

export default function RecipeListPage() {
  const result = fetchRecipes(0);

  /* todo:
   *   - auf ergebnis warten
   *   - return result.content.map((c) => <RecipeCard key={c.id} recipe={c} />);
   */

  return "TODO!";
}
