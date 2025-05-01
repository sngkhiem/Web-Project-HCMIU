package com.example.hcmiuweb.components;

import com.example.hcmiuweb.entities.Role;
import com.example.hcmiuweb.repositories.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role("USER"));
            roleRepository.save(new Role("ADMIN"));
            System.out.println("Default roles created");
        }
    }
}