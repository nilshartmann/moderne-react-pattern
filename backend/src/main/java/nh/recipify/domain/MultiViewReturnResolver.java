package nh.recipify.domain;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.core.MethodParameter;
import org.springframework.util.Assert;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.util.Locale;

// taken from: https://github.com/wimdeblauwe/htmx-spring-boot/blob/main/htmx-spring-boot/src/main/java/io/github/wimdeblauwe/htmx/spring/boot/mvc/HtmxResponseHandlerMethodReturnValueHandler.java#L23
public class MultiViewReturnResolver implements HandlerMethodReturnValueHandler {

    private final ViewResolver views;
    private final ObjectFactory<LocaleResolver> locales;
    private final ObjectMapper objectMapper;

    public MultiViewReturnResolver(ViewResolver views,
                                   ObjectFactory<LocaleResolver> locales,
                                   ObjectMapper objectMapper) {
        this.views = views;
        this.locales = locales;
        this.objectMapper = objectMapper;
    }


    @Override
    public boolean supportsReturnType(MethodParameter returnType) {
        return returnType.getParameterType().equals(MultiViews.class);
    }

    @Override
    public void handleReturnValue(Object returnValue,
                                  MethodParameter returnType,
                                  ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest) throws Exception {

        MultiViews htmxResponse = (MultiViews) returnValue;
        mavContainer.setView(toView(htmxResponse));
    }

    private View toView(MultiViews htmxResponse) {

        return (model, request, response) -> {
            Locale locale = locales.getObject().resolveLocale(request);
            ContentCachingResponseWrapper wrapper = new ContentCachingResponseWrapper(response);
            for (String v : htmxResponse.getViews()) {
                ModelAndView modelAndView = new ModelAndView(v);
                View view = modelAndView.getView();
                if (view == null) {
                    view = views.resolveViewName(modelAndView.getViewName(), locale);
                }
                for (String key : model.keySet()) {
                    if (!modelAndView.getModel().containsKey(key)) {
                        modelAndView.getModel().put(key, model.get(key));
                    }
                }
                Assert.notNull(view, "Template '" + modelAndView + "' could not be resolved");
                view.render(modelAndView.getModel(), request, wrapper);
            }
            wrapper.copyBodyToResponse();
        };
    }

}
