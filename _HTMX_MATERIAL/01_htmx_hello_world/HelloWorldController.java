package nh.recipify.domain.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HelloWorldController {

    @GetMapping(value = "/hello")
    String hello() {
        return "hello-world";
    }


    @GetMapping(value = "/hello-world", headers = "HX-Request")
    String helloWorldResponse() {
        return "hello-response :: response";
    }
}
