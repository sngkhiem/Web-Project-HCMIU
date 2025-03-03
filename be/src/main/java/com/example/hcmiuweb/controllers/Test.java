package com.example.hcmiuweb.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {
    @GetMapping("/api/health")
    public String health() {
        return "Backend is healthy!";
    }
}
