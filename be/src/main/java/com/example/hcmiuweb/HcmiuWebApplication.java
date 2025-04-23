package com.example.hcmiuweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class HcmiuWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(HcmiuWebApplication.class, args);
	}

}
