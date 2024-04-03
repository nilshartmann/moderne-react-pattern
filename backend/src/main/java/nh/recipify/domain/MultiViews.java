package nh.recipify.domain;

import java.util.List;

// taken from: https://github.com/wimdeblauwe/htmx-spring-boot/blob/main/htmx-spring-boot/src/main/java/io/github/wimdeblauwe/htmx/spring/boot/mvc/HtmxResponseHandlerMethodReturnValueHandler.java#L23
public class MultiViews {

    private List<String> views;

    public static MultiViews of(String... views) {
        return new MultiViews(List.of(views));
    }

    public MultiViews(List<String> views) {
        this.views = views;
    }

    public List<String> getViews() {
        return views;
    }
}
