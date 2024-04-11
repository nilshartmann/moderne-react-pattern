import {fetchRecipes} from "@/app/components/queries.ts";
import RecipeCard from "@/app/components/recipelistpage/RecipeCard.tsx";

export default async function RecipeListPage() {
	const result = await fetchRecipes(0);

	return result.content.map((c) => <RecipeCard key={c.id} recipe={c} />);
}
