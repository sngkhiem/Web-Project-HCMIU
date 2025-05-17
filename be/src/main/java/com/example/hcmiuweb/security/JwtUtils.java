package com.example.hcmiuweb.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtUtils {
    @Value("${hcmiu.jwtSecret}")
    private String jwtSecret;

    @Value("${hcmiu.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(org.springframework.security.core.Authentication auth) {
        var userPrincipal = (org.springframework.security.core.userdetails.UserDetails) auth.getPrincipal();
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (JwtException e) {
        }
        return false;
    }
}