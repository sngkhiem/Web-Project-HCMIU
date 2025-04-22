package com.example.hcmiuweb.components;

import com.example.hcmiuweb.entities.Category;
import com.example.hcmiuweb.entities.Role;
import com.example.hcmiuweb.repositories.CategoryRepository;
import com.example.hcmiuweb.repositories.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final CategoryRepository categoryRepository;

    public DataInitializer(RoleRepository roleRepository, CategoryRepository categoryRepository) {
        this.roleRepository = roleRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) {
        // Add default roles if none exist
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role("USER"));
            roleRepository.save(new Role("ADMIN"));
            System.out.println("Default roles creates");
        }
        if (categoryRepository.count() == 0) {
            categoryRepository.save(new Category("Entertainment"));
            categoryRepository.save(new Category("Education"));
            categoryRepository.save(new Category("Technology"));
            categoryRepository.save(new Category("Sports"));
            categoryRepository.save(new Category("Music"));
            System.out.println("Default categories created");
        }
    }
}
