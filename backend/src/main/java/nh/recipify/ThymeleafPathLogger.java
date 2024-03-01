package nh.recipify;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
@ConditionalOnProperty("spring.thymeleaf.prefix")
public class ThymeleafPathLogger {

    private static final Logger log = LoggerFactory.getLogger(ThymeleafPathLogger.class);

    private final ResourceLoader resourceLoader;
    private final String thymeleafPrefix;

    public ThymeleafPathLogger(ResourceLoader resourceLoader, @Value("${spring.thymeleaf.prefix}") String path) {
        this.resourceLoader = resourceLoader;
        this.thymeleafPrefix = path;
    }

    @PostConstruct
    void logTyhmeleafPath() throws IOException {
        var path = thymeleafPrefix;
        if (path.startsWith("file:")) {
            path = thymeleafPrefix.substring(5);
            if (path.endsWith("/")) {
                path = path.substring(0, path.length() - 1);
            }
        }

        Path thePath = Paths.get(path).toAbsolutePath();

        log.info("Thymeleaf Path spring.thymeleaf.prefix: '{}'", thePath);
    }
}
