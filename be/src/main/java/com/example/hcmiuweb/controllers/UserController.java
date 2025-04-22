package com.example.hcmiuweb.controllers;

import com.example.hcmiuweb.entities.User;
import com.example.hcmiuweb.services.RoleService;
import com.example.hcmiuweb.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://172.18.0.3:5173"})
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final RoleService roleService;

    public UserController(UserService userService, RoleService roleService){
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> findByEmail(@PathVariable String email){
        return userService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<User> findAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findUserById(@PathVariable Long id) {
        return userService.findUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        // Set default values for any missing fields
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(null); // Return 400 Bad Request if password is missing
        }

        // Set registration date if not provided
        if (user.getRegistrationDate() == null) {
            user.setRegistrationDate(LocalDateTime.now());
        }
        // Set default avatar if not provided
         if (user.getAvatar() == null || user.getAvatar().isEmpty()) {
             user.setAvatar("/resources/static/images/avatars/default-avatar.jpg");
         }
        
        // Save user
        User savedUser = userService.createUser(user);

         // Fetch the complete role data
        if (savedUser.getRole() != null && savedUser.getRole().getId() != null) {
            roleService.findRoleById(savedUser.getRole().getId())
                    .ifPresent(savedUser::setRole);
        }

        return ResponseEntity.ok(savedUser);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        e.printStackTrace(); // Log the error
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Error processing request: " + e.getMessage());
    }
}