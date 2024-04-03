package nh.recipify.domain.api;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import nh.recipify.domain.FeedbackService;
import nh.recipify.domain.NewFeedback;
import nh.recipify.domain.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static java.util.function.Predicate.not;
import static nh.recipify.domain.api.Utils.sleepFor;

@ApiController
public class RecipeApiController {

    private static final Logger log = LoggerFactory.getLogger(RecipeApiController.class);


    private final RecipeRepository recipeRepository;
    private final FeedbackRepository feedbackRepository;
    private final FeedbackService feedbackService;

    public RecipeApiController(RecipeRepository recipeRepository, FeedbackRepository feedbackRepository, FeedbackService feedbackService) {
        this.recipeRepository = recipeRepository;
        this.feedbackRepository = feedbackRepository;
        this.feedbackService = feedbackService;
    }

    enum ReceipeSort {
        time,
        rating
    }

    @GetMapping("/recipes")
    PageResponse<RecipeDto> recipes(Optional<Integer> page,
                                    Optional<Integer> size,
                                    Optional<ReceipeSort> sort,
                                    @RequestParam("ids") Optional<String> idStrings,
                                    @RequestParam("slowdown") Optional<Long> slowDown_recipeList) {
        var ids = idStrings.map(s -> Arrays.stream(s.split(","))
                .filter(not(String::isBlank))
                .map(Long::valueOf)
                .toList())
            .orElse(null);


        sleepFor("API /recipes", slowDown_recipeList);

        var pageable = PageRequest.of(page.orElse(0),
            size.orElse(6),
            sort.map(s -> {
                if (s == ReceipeSort.time) {
                    return Sort.by("totalTime");
                }
                return Sort.by("averageRating").descending().and(Sort.by("title"));
            }).orElse(Sort.by("createdAt").descending()));

        Page<Recipe> result = ids == null ? recipeRepository.findAllBy(pageable) : recipeRepository.findAllByIdIsIn(pageable, ids);
        var newPage = result.map(RecipeDto::forRecipe);
        return PageResponse.of(newPage);
    }

    record GetRecipeResponse(@NotNull DetailedRecipeDto recipe) {
    }

    @GetMapping("/recipes/{recipeId}")
    GetRecipeResponse getRecipe(
        @StringParameter
        @PathVariable long recipeId,
        @RequestParam("slowdown") Optional<Long> slowDown_getRecipe) {

        sleepFor("API /recipes/" + recipeId, slowDown_getRecipe);

        var recipe = recipeRepository.findById(recipeId)
            .orElseThrow(() -> new EntityNotFoundException("Receipe not found."));

        return new GetRecipeResponse(
            DetailedRecipeDto.of(recipe)
        );
    }

    record GetRecipeIngredientsResponse(
        @NotNull String id,
        @NotNull List<Ingredient> ingredients) {
    }

    @GetMapping("/recipes/{recipeId}/ingredients")
    GetRecipeIngredientsResponse getIngredients(@StringParameter @PathVariable long recipeId,
                                                @RequestParam("slowdown") Optional<Long> slowDown_GetIngredients) {
        sleepFor("Getting Ingredients for recipe-id " + recipeId, slowDown_GetIngredients);

        var recipe = recipeRepository.findById(recipeId)
            .orElseThrow(() -> new EntityNotFoundException("Receipe not found."));


        return new GetRecipeIngredientsResponse(
            recipe.getId().toString(),
            recipe.getIngredients()
        );
    }

    record GetRecipeFeedbacksResponse(@NotNull List<Feedback> feedbacks) {
    }

    /**
     * todo:... use getFeedback instead
     * <p>
     * todo: endpoint is used in the tanstack router demo. remove it there
     *
     * @param recipeId
     * @param slowDown_GetFeedbacks
     * @return
     */
    @GetMapping("/recipes/{recipeId}/feedbacks")
    GetRecipeFeedbacksResponse getFeedbacks(@StringParameter @PathVariable long recipeId,
                                            @RequestParam("slowdown") Optional<Long> slowDown_GetFeedbacks) {
        sleepFor("Get Feedbacks for recipeId " + recipeId, slowDown_GetFeedbacks);

        var feedbacks = feedbackRepository.getFeedbackByRecipeIdOrderByCreatedAtDesc(recipeId);

        return new GetRecipeFeedbacksResponse(feedbacks);
    }

    @GetMapping("/recipes/{recipeId}/feedback")
    PageResponse<Feedback> getFeedback(@StringParameter @PathVariable long recipeId,
                                       @RequestParam("page") int feedbackPage,
                                       @RequestParam("slowdown") Optional<Long> slowDown_GetFeedbacks) {


        sleepFor("Get Feedback for recipeId " + recipeId, slowDown_GetFeedbacks);

        var pageRequest = PageRequest.of(feedbackPage, 2);

        Page<Feedback> feedback = this.feedbackRepository.getFeedbackByRecipeIdOrderByCreatedAtDesc(recipeId, pageRequest);

        return PageResponse.of(feedback);
    }


    record PostFeedbackRequest(@Valid @NotNull NewFeedback feedbackData) {
    }

    record PostFeedbackResponse(@NotNull Feedback newFeedback) {
    }

    @PostMapping("/recipes/{recipeId}/feedbacks")
    PostFeedbackResponse addFeedback(@StringParameter @PathVariable long recipeId,
                                     @Valid @RequestBody PostFeedbackRequest addFeedbackRequest,
                                     @RequestParam("slowdown") Optional<Long> slowDown_AddFeedback) {

        sleepFor("Add Feedback for recipeId " + recipeId, slowDown_AddFeedback);

        var newFeedback = feedbackService.addFeedback(recipeId, addFeedbackRequest.feedbackData());

        return new PostFeedbackResponse(newFeedback);
    }

    record GetSearchResponse(
        @NotNull List<RecipeDto> recipes,
        @NotNull String search,
        boolean hasMore,
        Optional<Integer> nextPage
    ) {

        static GetSearchResponse forPage(String search, Page<Recipe> recipePage) {

            var recipes = recipePage.getContent().stream()
                .map(RecipeDto::forRecipe)
                .toList();

            return new GetSearchResponse(
                recipes,
                search,
                recipePage.hasNext(),
                recipePage.hasNext() ? Optional.of(recipePage.getNumber() + 1) : Optional.empty()
            );
        }
    }

    @GetMapping(value = "/search")
    PageResponse<RecipeSummaryDto> search(@RequestParam String search,
                                          @RequestParam Optional<Integer> page,
                                          @RequestParam("slowdown") Optional<Long> slowDown_search) {

        long s = slowDown_search.orElse(0L);

        if (s == -1) {
            // the longer the search term, the FASTER is the result
            // this way we can demonstrate, that requests that
            // a submitted EARLIER are discarded when they arrive LATER
            // in the client
            sleepFor("Search for '" + search + "'", 2400 - ((search.length() - 3) * 200L));
        } else {
            sleepFor("Search for '" + search + "'", s);
        }


        var recipes = recipeRepository.findSummaryAllByTitleContainsIgnoreCaseOrderByTitle(
            PageRequest.of(page.orElse(0), 2),
            search
        );

        return PageResponse.of(recipes, search);
    }

    record GetSearchDetailResponse(@NotNull RecipeDto recipe) {
        public static GetSearchDetailResponse of(Recipe recipe) {
            return new GetSearchDetailResponse(
                RecipeDto.forRecipe(recipe)
            );
        }
    }

    @GetMapping(value = "/search/{recipeId}/details")
    GetSearchDetailResponse getSearchDetails(@PathVariable @StringParameter long recipeId,
                                             @RequestParam("slowdown") Optional<Long> slowDown_search) {

        sleepFor("Recipe Details for recipeId " + recipeId, slowDown_search);

        var recipe = recipeRepository.findById(recipeId)
            .orElseThrow(() -> new EntityNotFoundException("Receipe not found."));


        return GetSearchDetailResponse.of(recipe);
    }

}
