/**
 * Set to -1 to make searching for longer terms FASTER
 * than searching for shorter terms
 * to show discarding of older requests
 */
export const slowDown_search = 1200;

/**
 */
export const slowDown_searchDetails = 0;

/** Single recipe on the /$recipeId route
 *  and details on search page */
export const slowDown_GetRecipe = 0;

/** list of feedback on /$recipeId */
export const slowDown_GetFeedback = 0;

/** delay after submitting the add feedback form */
export const slowDown_AddFeedback = 0;

/** delay after submitting the newsletter form
 * note that there is a default delay of 250ms in the server
 * */
export const slowDown_SubscribeNewsletter = 0;
