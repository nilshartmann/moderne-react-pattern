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


        sleepFor(slowDown_recipeList);

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

        sleepFor(slowDown_getRecipe);

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
        sleepFor(slowDown_GetIngredients);

        var recipe = recipeRepository.findById(recipeId)
            .orElseThrow(() -> new EntityNotFoundException("Receipe not found."));


        return new GetRecipeIngredientsResponse(
            recipe.getId().toString(),
            recipe.getIngredients()
        );
    }

    record GetRecipeFeedbacksResponse(@NotNull List<Feedback> feedbacks) {
    }

    @GetMapping("/recipes/{recipeId}/feedbacks")
    GetRecipeFeedbacksResponse getFeedbacks(@StringParameter @PathVariable long recipeId,
                                            @RequestParam("slowdown") Optional<Long> slowDown_GetFeedbacks) {
        sleepFor(slowDown_GetFeedbacks);

        var feedbacks = feedbackRepository.getFeedbackByRecipeIdOrderByCreatedAtDesc(recipeId);

        return new GetRecipeFeedbacksResponse(feedbacks);
    }

    record PostFeedbackRequest(@Valid @NotNull NewFeedback feedbackData) {
    }

    record PostFeedbackResponse(@NotNull Feedback newFeedback) {
    }

    @PostMapping("/recipes/{recipeId}/feedbacks")
    PostFeedbackResponse addFeedback(@StringParameter @PathVariable long recipeId,
                                     @Valid @RequestBody PostFeedbackRequest addFeedbackRequest,
                                     @RequestParam("slowdown") Optional<Long> slowDown_AddFeedback) {

        sleepFor(slowDown_AddFeedback);

        var newFeedback = feedbackService.addFeedback(recipeId, addFeedbackRequest.feedbackData());

        return new PostFeedbackResponse(newFeedback);
    }

}
