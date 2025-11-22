package com.stockmarket.predictor.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/home")
    public String home() {
        return "Welcome to the Stock Market Predictor!";
    }
    @GetMapping("/api")
    public String secure() {
        return "Secure API Endpoint";
    }
}
