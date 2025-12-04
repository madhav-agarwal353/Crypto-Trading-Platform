package com.stockmarket.predictor.Config;

import com.mongodb.client.model.Collation;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class JwtProvider {
    private static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public static String generateToken(Authentication auth) {
            String roles = auth.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.joining(","));

            return Jwts.builder()
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 864000000)) // 10 days
                    .claim("email", auth.getName())
                    .claim("authorities", roles)
                    .signWith(key)
                    .compact();
        }

    public static String getEmailFromToken(String token) {
        token = token.substring(7);
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        String email = String.valueOf(claims.get("email"));
        return email;
    }

    private static String populateAuthorities(Collection<? extends GrantedAuthority> AUTHORITIES) {
        Set<String> auth = new HashSet<>();
        for (GrantedAuthority authority : AUTHORITIES) {
            auth.add(authority.getAuthority());
        }
        return String.join(",", auth);
    }

}
