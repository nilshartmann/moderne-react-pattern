package nh.recipify.domain.model;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface FeedbackRepository extends Repository<Feedback, Long> {

    @Deprecated
    List<Feedback> getFeedbackByRecipeIdOrderByCreatedAtDesc(Long recipeId);

    Page<Feedback> getFeedbackByRecipeIdOrderByCreatedAtDesc(Long recipeId, Pageable pageable);

    Feedback save(Feedback feedback);

}
