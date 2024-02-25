package nh.recipify.domain;

import java.util.List;

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
