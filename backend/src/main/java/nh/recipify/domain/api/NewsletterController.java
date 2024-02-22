package nh.recipify.domain.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import static nh.recipify.domain.api.Utils.sleepFor;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/api")
@CrossOrigin(origins = "http://localhost:8090")
public class NewsletterController {
    private static final Logger log = LoggerFactory.getLogger(RecipeController.class);

    record PostNewsletterRegistrationRequest(@Valid @NotBlank String email) {
    }

    record PostNewsletterRegistrationResponse(@NotBlank String email) {
    }

    @PostMapping("/newsletter/subscribe")
    PostNewsletterRegistrationResponse subscribeToNewsletter(@Valid @RequestBody PostNewsletterRegistrationRequest subscribeRequest,
                                                             @RequestParam("slowdown") Optional<Long> slowDown_Newsletter) {
        log.info("Subscribe to newsletter '{}'", subscribeRequest.email);
        sleepFor(slowDown_Newsletter.orElse(250L));

        // ...simulation only, no real processing here...

        return new PostNewsletterRegistrationResponse(subscribeRequest.email);
    }

}
