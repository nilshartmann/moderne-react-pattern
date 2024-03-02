package nh.recipify.domain.api;

import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Value;

public interface RecipeSummaryDto {
    @NotNull String getId();

    @NotNull String getTitle();

    @Value("#{target.mealType.name}")
    @NotNull String getMealType();
}
