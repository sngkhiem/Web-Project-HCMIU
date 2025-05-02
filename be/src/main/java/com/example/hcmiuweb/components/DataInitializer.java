package com.example.hcmiuweb.components;

import com.example.hcmiuweb.entities.Category;
import com.example.hcmiuweb.entities.Role;
import com.example.hcmiuweb.repositories.CategoryRepository;
import com.example.hcmiuweb.repositories.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);
    
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
            roleRepository.save(new Role("ROLE_USER")); // Change to ROLE_USER
            roleRepository.save(new Role("ROLE_ADMIN")); // Change to ROLE_ADMIN
            roleRepository.save(new Role("ROLE_MODERATOR")); // Add ROLE_MODERATOR
            logger.info("Default roles created");
        } else {
            // Check for specific roles even if some roles exist
            if (roleRepository.findByRoleName("ROLE_USER").isEmpty()) {
                roleRepository.save(new Role("ROLE_USER"));
                logger.info("Added missing ROLE_USER");
            }
            if (roleRepository.findByRoleName("ROLE_ADMIN").isEmpty()) {
                roleRepository.save(new Role("ROLE_ADMIN"));
                logger.info("Added missing ROLE_ADMIN");
            }
            if (roleRepository.findByRoleName("ROLE_MODERATOR").isEmpty()) {
                roleRepository.save(new Role("ROLE_MODERATOR"));
                logger.info("Added missing ROLE_MODERATOR");
            }
        }
        
        if (categoryRepository.count() == 0) {
            categoryRepository.save(new Category("Entertainment"));
            categoryRepository.save(new Category("Education"));
            categoryRepository.save(new Category("Technology"));
            categoryRepository.save(new Category("Sports"));
            categoryRepository.save(new Category("Music"));
            logger.info("Default categories created");
        }
    }
}
