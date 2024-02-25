package nh.recipify.domain.web;

import jakarta.persistence.EntityNotFoundException;
import nh.recipify.domain.MultiViews;
import nh.recipify.domain.api.DetailedRecipeDto;
import nh.recipify.domain.api.RecipeDto;
import nh.recipify.domain.model.RecipeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Optional;

import static nh.recipify.domain.api.Utils.sleepFor;

@Controller
public class RecipeWebController {

    private static final Logger log = LoggerFactory.getLogger(RecipeWebController.class);

    private final RecipeRepository recipeRepository;

    public RecipeWebController(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @GetMapping(value = "/search")
    public String search(@RequestParam String search,
                         @RequestParam Optional<Integer> page,
                         @RequestParam("slowdown") Optional<Long> slowDown_search,
                         Model model) {

        sleepFor(slowDown_search);

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

        sleepFor(slowDown_search);

        var recipes = recipeRepository.findAllByTitleContainsIgnoreCaseOrderByTitle(
            PageRequest.of(page.orElse(0), 2),
            search
        );
        model.addAttribute("recipse", recipes.map(RecipeDto::forRecipe));
        model.addAttribute("search", search);
        model.addAttribute("hasMore", recipes.hasNext());
        model.addAttribute("nextPage", recipes.getNumber() + 1);

        return MultiViews.of("search :: pagination", "search :: searchResult");
    }

    @GetMapping(value = "/search/reset", headers = "HX-Request")
    public String searchRecipes(@RequestParam("slowdown") Optional<Long> slowDown_search,
                                Model model) {

        sleepFor(slowDown_search);

        model.addAttribute("recipse", new ArrayList<RecipeDto>());
        model.addAttribute("search", "");
        model.addAttribute("fresh", true);

        return "search :: main";

    }

    @GetMapping(value = "/search/{recipeId}/expand", headers = "HX-Request")
    public String expandSearchResult(Model model,
                                     @PathVariable long recipeId
    ) {

        var recipe = recipeRepository.findById(recipeId)
            .orElseThrow(() -> new EntityNotFoundException("Receipe " + recipeId + " not found."));

        var recipeDetails = DetailedRecipeDto.of(recipe).recipe();

        model.addAttribute("recipe", recipeDetails);
        model.addAttribute("detailId", recipeDetails.id());

        return "search :: expandedRecipe";
    }

    @GetMapping("/")
    public String recipesIndex(Model model) {

        model.addAttribute("recipse", new ArrayList<RecipeDto>());
        model.addAttribute("search", "");
        model.addAttribute("fresh", true);

        return "search";
    }

    @GetMapping(value = "/recipes/{recipeId}", headers = "HX-Request")
    public String recipeDetails(@PathVariable Long recipeId, Model model) {
        log.info("HX Request for Recipe-Id '{}'", recipeId);

        var recipe = recipeRepository.findById(recipeId)
            .orElseThrow(() -> new EntityNotFoundException("Receipe " + recipeId + " not found."));

        model.addAttribute("recipe", DetailedRecipeDto.of(recipe));

        return "recipe_$recipeId :: recipe-detail";

    }

    @GetMapping(value = "/recipes/{recipeId}")
    public String recipePage(@PathVariable Long recipeId, Model model) {
        log.info("Recipe Page for Recipe-Id '{}'", recipeId);

        var recipe = recipeRepository.findById(recipeId)
            .orElseThrow(() -> new EntityNotFoundException("Receipe " + recipeId + " not found."));

        model.addAttribute("recipe", DetailedRecipeDto.of(recipe));

        return "recipe_$recipeId";

    }

}
