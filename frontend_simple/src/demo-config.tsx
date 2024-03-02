/**
 * Set to -1 to make searching for longer terms FASTER
 * than searching for shorter terms
 * to show discarding of older requests
 */
export const slowDown_search = 0;

/**
 */
export const slowDown_searchDetails = 0;

/** number of recipes on /recipes */
export const recipesPerPage = 6;

/** slowdown reading of /recipes */
export const slowDown_GetRecipeList = 0;

/** Only for Ingredients in RecipeCard */
export const slowDown_GetIngredients = 1200;

/** Single recipe on the /$recipeId route
 *  and details on search page */
export const slowDown_GetRecipe = 0;

/** list of feedbacks on /$recipeId */
export const slowDown_GetFeedbacks = 0;

/** delay after submitting the add feedback form */
export const slowDown_AddFeedback = 0;

/** delay after submitting the newsletter form
 * note that there is a default delay of 250ms in the server
 * */
export const slowDown_SubscribeNewsletter = 0;
