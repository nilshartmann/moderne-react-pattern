package nh.recipify.domain;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.Assert;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final ObjectFactory<ViewResolver> resolver;
    private final ObjectFactory<LocaleResolver> locales;
    private final ObjectMapper objectMapper;

    WebConfig(@Qualifier("viewResolver") ObjectFactory<ViewResolver> resolver,
              ObjectFactory<LocaleResolver> locales,
              ObjectMapper objectMapper) {
        Assert.notNull(resolver, "ViewResolver must not be null!");
        Assert.notNull(locales, "LocaleResolver must not be null!");

        this.resolver = resolver;
        this.locales = locales;
        this.objectMapper = objectMapper;
    }


    @Override
    public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> handlers) {
        handlers.add(new MultiViewReturnResolver(resolver.getObject(), locales, objectMapper));
    }
}
