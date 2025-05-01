package com.example.hcmiuweb.controllers;

import com.example.hcmiuweb.entities.Role;
import com.example.hcmiuweb.entities.User;
import com.example.hcmiuweb.payload.request.LoginRequest;
import com.example.hcmiuweb.payload.request.RegisterRequest;
import com.example.hcmiuweb.payload.response.JwtResponse;
import com.example.hcmiuweb.payload.response.MessageResponse;
import com.example.hcmiuweb.repositories.RoleRepository;
import com.example.hcmiuweb.repositories.UserRepository;
import com.example.hcmiuweb.security.JwtUtils;
import com.example.hcmiuweb.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.GrantedAuthority;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired AuthenticationManager authManager;
    @Autowired UserRepository userRepo;
    @Autowired RoleRepository roleRepo;
    @Autowired BCryptPasswordEncoder encoder;
    @Autowired JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginReq) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginReq.getUsername(), loginReq.getPassword())
        );
        String jwt = jwtUtils.generateJwtToken(auth);

        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpReq) {
        if (userRepo.existsByUsername(signUpReq.getUsername()))
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        if (userRepo.existsByEmail(signUpReq.getEmail()))
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));

        User user = new User();
        user.setUsername(signUpReq.getUsername());
        user.setEmail(signUpReq.getEmail());
        user.setPassword(encoder.encode(signUpReq.getPassword()));
        user.setRegistrationDate(LocalDateTime.now());

        Set<String> strRoles = signUpReq.getRole();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            roleRepo.findByRoleName("USER").ifPresent(roles::add);
        } else {
            strRoles.forEach(r -> roleRepo.findByRoleName(r.toUpperCase()).ifPresent(roles::add));
        }
        user.setRoles(roles);
        userRepo.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}