package com.example.hcmiuweb.controllers;

import com.example.hcmiuweb.entities.Role;
import com.example.hcmiuweb.entities.User;
import com.example.hcmiuweb.services.RoleService;
import com.example.hcmiuweb.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final RoleService roleService;

    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> findByEmail(@PathVariable String email) {
        return userService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<User>> findAllUsers() {
        List<User> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findUserById(@PathVariable Long id) {
        return userService.findUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        if (user.getRegistrationDate() == null) {
            user.setRegistrationDate(LocalDateTime.now());
        }
        if (user.getAvatar() == null || user.getAvatar().isEmpty()) {
            user.setAvatar("/resources/static/images/avatars/default-avatar.jpg");
        }

        Set<Role> resolvedRoles = new HashSet<>();
        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            roleService.findRoleByName("USER").ifPresent(resolvedRoles::add);
        } else {
            for (Role r : user.getRoles()) {
                if (r.getId() != null) {
                    roleService.findRoleById(r.getId()).ifPresent(resolvedRoles::add);
                } else if (r.getRoleName() != null) {
                    roleService.findRoleByName(r.getRoleName()).ifPresent(resolvedRoles::add);
                }
            }
        }
        user.setRoles(resolvedRoles);
        User savedUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error processing request: " + e.getMessage());
    }
}