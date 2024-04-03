package nh.recipify.domain.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

import static nh.recipify.domain.api.Utils.sleepFor;

@ApiController
public class NewsletterApiController {
    private static final Logger log = LoggerFactory.getLogger(RecipeApiController.class);

    record PostNewsletterRegistrationRequest(@Valid @NotBlank String email) {
    }

    record PostNewsletterRegistrationResponse(@NotBlank String email) {
    }

    @PostMapping("/newsletter/subscribe")
    PostNewsletterRegistrationResponse subscribeToNewsletter(@Valid @RequestBody PostNewsletterRegistrationRequest subscribeRequest,
                                                             @RequestParam("slowdown") Optional<Long> slowDown_Newsletter) {
        log.info("Subscribe to newsletter '{}'", subscribeRequest.email);
        sleepFor("subscripe to newsletter", slowDown_Newsletter.orElse(250L));

        // ...simulation only, no real processing here...

        return new PostNewsletterRegistrationResponse(subscribeRequest.email);
    }

}
