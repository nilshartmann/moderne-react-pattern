package nh.recipify.domain.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
public record PageResponse<T>(@NotNull List<T> content,
                              @NotNull int pageNumber,
                              @NotNull int totalPages,
                              @NotNull boolean hasNext,
                              @NotNull boolean hasPrevious,

                              Optional<String> meta) {

    public static <T> PageResponse<T> of(Page<T> target) {

        return new PageResponse<>(target.getContent(),
            target.getNumber(),
            target.getTotalPages(),
            target.hasNext(), target.hasPrevious(),
            Optional.empty());
    }

    public static <T> PageResponse<T> of(Page<T> target, String meta) {

        return new PageResponse<>(target.getContent(),
            target.getNumber(),
            target.getTotalPages(),
            target.hasNext(), target.hasPrevious(),
            Optional.ofNullable(meta));
    }

}