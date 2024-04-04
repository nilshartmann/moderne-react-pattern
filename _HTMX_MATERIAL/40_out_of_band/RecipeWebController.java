package nh.recipify.domain.web;

import jakarta.persistence.EntityNotFoundException;
import nh.recipify.domain.MultiViews;
import nh.recipify.domain.api.DetailedRecipeDto;
import nh.recipify.domain.api.RecipeDto;
import nh.recipify.domain.model.Feedback;
import nh.recipify.domain.model.FeedbackRepository;
import nh.recipify.domain.model.RecipeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import static nh.recipify.domain.api.Utils.sleepFor;

@Controller
public class RecipeWebController {

    private static final Logger log = LoggerFactory.getLogger(RecipeWebController.class);

    private final RecipeRepository recipeRepository;
    private final FeedbackRepository feedbackRepository;

    public RecipeWebController(RecipeRepository recipeRepository, FeedbackRepository feedbackRepository) {
        this.recipeRepository = recipeRepository;
        this.feedbackRepository = feedbackRepository;
    }

    @GetMapping("/")
    public String recipesIndex(Model model) {

        model.addAttribute("recipse", new ArrayList<RecipeDto>());
        model.addAttribute("search", "");
        model.addAttribute("fresh", true);

        return "search";
    }

    @GetMapping(value = "/search")
    public String search(@RequestParam String search,
                         @RequestParam Optional<Integer> page,
                         @RequestParam("slowdown") Optional<Long> slowDown_search,
                         Model model) {

        sleepFor("searching for '" + search + "'", slowDown_search);

        var recipes = recipeRepository.findAllByTitleContainsIgnoreCaseOrderByTitle(
            PageRequest.of(page.orElse(0), 2),
            search
        );
        model.addAttribute("recipse", recipes.map(RecipeDto::forRecipe));
        model.addAttribute("search", search);
        model.addAttribute("hasMore", recipes.hasNext());
        model.addAttribute("nextPage", recipes.getNumber() + 1);

        return "search";
    }


    @GetMapping(value = "/search", headers = "HX-Request")
    public MultiViews searchRecipes(@RequestParam String search,
                                    @RequestParam Optional<Integer> page,
                                    @RequestParam("slowdown") Optional<Long> slowDown_search,
                                    Model model) {

        // we don't care for slowDown value here,
        //  actually only that it is set to a value higher > 0
        //  with this "algorithm" we make searching for SHORTER terms
        //  LONGER that for longer ones, so that
        //  when request "a" and "ab" starting parallel,
        //   "ab" for sure would be FASTER than "a"
        var s = slowDown_search.map((x) -> x > 0 ? 3000 - (search.length() * 100L) : 0);

        sleepFor("HX-Request, Search for '" + search + "'", s);

        var recipes = recipeRepository.findAllByTitleContainsIgnoreCaseOrderByTitle(
            PageRequest.of(page.orElse(0), 2),
            search
        );
        log.info("Search for '{}'", search);
        model.addAttribute("recipse", recipes.map(RecipeDto::forRecipe));
        model.addAttribute("search", search);
        model.addAttribute("fresh", false);
        model.addAttribute("hasMore", recipes.hasNext());
        model.addAttribute("nextPage", recipes.getNumber() + 1);

        return MultiViews.of("search :: pagination", "search :: searchResult");
    }

    @GetMapping(value = "/search/reset", headers = "HX-Request")
    public String searchRecipes(@RequestParam("slowdown") Optional<Long> slowDown_search,
                                Model model) {

        sleepFor("HX-Request reset", slowDown_search);

        model.addAttribute("recipse", new ArrayList<RecipeDto>());
        model.addAttribute("search", "");
        model.addAttribute("fresh", true);

        return "search :: main";
    }

    @GetMapping(value = "/search/{recipeId}/summary", headers = "HX-Request")
    public String expandSearchResult(Model model,
                                     @PathVariable long recipeId,
                                     @RequestParam("include_details") Optional<Boolean> include_details
    ) {

        var recipe = recipeRepository.findById(recipeId)
            .orElseThrow(() -> new EntityNotFoundException("Receipe " + recipeId + " not found."));

        var recipeDetails = DetailedRecipeDto.of(recipe).recipe();

        model.addAttribute("recipe", recipeDetails);
        model.addAttribute("detailId", recipeDetails.id());
        model.addAttribute("includeDetails", include_details.orElse(false));

        return "fragments/search-component :: ExpandedRecipeSummary";
    }

    @GetMapping(value = "/recipes/{recipeId}", headers = "HX-Request")
    public String recipePage(@PathVariable Long recipeId, Model model) {
        log.info("HX Request for Recipe-Id '{}'", recipeId);

        var recipe = recipeRepository.findById(recipeId)
            .orElseThrow(() -> new EntityNotFoundException("Receipe " + recipeId + " not found."));

        model.addAttribute("recipeId", String.valueOf(recipeId));
        model.addAttribute("recipe", DetailedRecipeDto.of(recipe));

        return "recipe :: RecipePage";

    }

    @GetMapping(value = "/recipes/{recipeId}")
    public String recipePage(@PathVariable Long recipeId,
                             @RequestParam("feedback_page") Optional<Integer> feedbackPage,
                             Model model) {
        log.info("Recipe Page for Recipe-Id '{}'", recipeId);

        var recipe = recipeRepository.findById(recipeId)
            .orElseThrow(() -> new EntityNotFoundException("Receipe " + recipeId + " not found."));

        model.addAttribute("recipeId", String.valueOf(recipeId));
        model.addAttribute("recipe", DetailedRecipeDto.of(recipe));

        feedbackPage.ifPresent(f -> {
            var feedback = getFeedbackForRecipe(recipeId, f);
            model.addAttribute("feedback", feedback);
        });


        return "recipe";
    }

    record FeedbackResponseDto(
        List<Feedback> feedback,
        boolean hasPrev,
        boolean hasNext,
        int prevPage,
        int nextPage
    ) implements Iterable<Feedback> {

        @Override
        public Iterator<Feedback> iterator() {
            return feedback.iterator();
        }

        static FeedbackResponseDto of(Page<Feedback> page) {
            return new FeedbackResponseDto(
                page.getContent(),
                page.hasPrevious(),
                page.hasNext(),
                page.getNumber() - 1,
                page.getNumber() + 1
            );
        }
    }

    @GetMapping(value = "/recipes/{recipeId}/feedback", headers = "HX-Request")
    public String feedback(
        @PathVariable Long recipeId,
        @RequestParam Optional<Integer> page,
        Model model,
        @RequestParam("slowdown") Optional<Long> slowdown) {

        sleepFor("HX-Request recipe feedback for recipe-id " + recipeId, slowdown);

        var feedback = getFeedbackForRecipe(recipeId, page.orElse(0));

        model.addAttribute("recipeId", String.valueOf(recipeId));
        model.addAttribute("feedback", feedback);

        return "fragments/recipe-feedback :: FeedbackList";
    }

    private FeedbackResponseDto getFeedbackForRecipe(Long recipeId, int feedbackPage) {
        var pageRequest = PageRequest.of(feedbackPage, 2);

        Page<Feedback> feedback = this.feedbackRepository.getFeedbackByRecipeIdOrderByCreatedAtDesc(recipeId, pageRequest);
        return FeedbackResponseDto.of(feedback);
    }

    record NewsletterRegistrationRequest(
        String newsletterEmail
    ) {
    }

    @PostMapping(value = "/newsletter", headers = "HX-Request")
    String subscribeToNewsletter(@ModelAttribute NewsletterRegistrationRequest request, @RequestParam("slowdown") Optional<Long> slowdown, Model model) {
        log.info("Subscribe to newsletter '{}'", request);

        sleepFor("Subscribe to newsletter", slowdown);

        model.addAttribute("newsletterEmail", request.newsletterEmail);
        model.addAttribute("newsletterResult", "success");

        return "fragments/newsletter-registration :: NewsletterRegistration";
    }

}
