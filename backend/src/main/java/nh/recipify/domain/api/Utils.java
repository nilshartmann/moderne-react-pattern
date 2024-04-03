package nh.recipify.domain.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

public class Utils {

    private static final Logger log = LoggerFactory.getLogger(Utils.class);

    public static void sleepFor(String operation, Optional<Long> duration) {
        duration.ifPresent((t) -> Utils.sleepFor(operation, t));
    }

    public static void sleepFor(String operation, long duration) {
        if (duration > 0) {
            log.info("Sleep for {} ms.", duration);
            try {
                Thread.sleep(duration);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }

}
