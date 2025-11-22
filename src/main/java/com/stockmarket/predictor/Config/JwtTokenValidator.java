package com.stockmarket.predictor.Config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.FilterChain;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class JwtTokenValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws IOException, ServletException {
        String authHeader = request.getHeader(JwtConstant.JWT_HEADER);
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            authHeader.replace("Bearer ", "");
            try {
                SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
                Claims claim = Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(authHeader)
                        .getBody();
                String email = String.valueOf(claim.get("email"));
                String role = String.valueOf(claim.get("authorities"));
                List<GrantedAuthority> authorityList = AuthorityUtils.commaSeparatedStringToAuthorityList(role);
                Authentication auth = new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        authorityList
                );
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (Exception e) {
                throw new RuntimeException("Invalid JWT Token");
            }
        }
        filterChain.doFilter(request, response);
    }
}
