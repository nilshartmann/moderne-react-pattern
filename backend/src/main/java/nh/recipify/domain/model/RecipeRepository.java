package nh.recipify.domain.model;

import nh.recipify.domain.api.RecipeSummaryDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends Repository<Recipe, Long> {

    List<Recipe> findByUserId(Long id);

    Page<Recipe> findAllBy(Pageable p);

    Page<Recipe> findAllByIdIsIn(Pageable p, List<Long> ids);

    Page<Recipe> findAllByIdLessThan(Pageable p, long id);

    Optional<Recipe> findById(Long id);

    Page<Recipe> findAllByTitleContainsIgnoreCaseOrderByTitle(
        Pageable p,
        String title);

    Page<RecipeSummaryDto> findSummaryAllByTitleContainsIgnoreCaseOrderByTitle(
        Pageable p,
        String title);
}
