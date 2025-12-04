package com.stockmarket.predictor.Controller;

import com.stockmarket.predictor.Config.JwtProvider;
import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.TwoFactorOtp;
import com.stockmarket.predictor.Response.AuthResponse;
import com.stockmarket.predictor.Respository.UserRespository;
import com.stockmarket.predictor.Service.CustomUserDetailsService;
import com.stockmarket.predictor.Service.EmailService;
import com.stockmarket.predictor.Service.TwoFactorOtpService;
import com.stockmarket.predictor.Utils.otpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRespository userRespository;
    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private TwoFactorOtpService twoFactorOtpService;
    @Autowired
    private EmailService emailService;

    @PostMapping("/signup")
    public ResponseEntity<?> resisterUser(@RequestBody User user) {
        User isEmailExist = userRespository.findByEmail(user.getEmail());
        if (isEmailExist != null) {
            return new ResponseEntity<>("Email already in use", HttpStatus.BAD_REQUEST);
        }
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());
        newUser.setName(user.getName());
        User savedUser = userRespository.save(newUser);
        Authentication auth = new UsernamePasswordAuthenticationToken(
                user.getEmail(),
                user.getPassword()

        );
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwt = JwtProvider.generateToken(auth);
        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);
        res.setMessage("User registered successfully");
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        String email = user.getEmail();
        String password = user.getPassword();
        Authentication auth = authenticate(email, password);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwt = JwtProvider.generateToken(auth);
        User authuser = userRespository.findByEmail(email);
        if (user.getTF().isEnabled()) {
            AuthResponse res = new AuthResponse();
            res.setTwoFactorAuthEnabled(true);
            res.setStatus(true);
            res.setMessage("Two Factor Authentication is enabled. Please verify OTP.");
            String otp = otpUtils.generateOtp();
            TwoFactorOtp oldTwoFactorOtp = twoFactorOtpService.findByUser(authuser.getId());
            if (oldTwoFactorOtp != null) {
                twoFactorOtpService.deleteOtp(oldTwoFactorOtp);
            }
            TwoFactorOtp newTwoFactorOtp = twoFactorOtpService.createTwoFactorOtp(authuser, otp, jwt);

            emailService.sendVerificationEmail(authuser.getEmail(), otp);
            res.setSession(newTwoFactorOtp.getId());
            return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
        }
        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);
        res.setMessage("login successfully");
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        if (userDetails == null || !userDetails.getPassword().equals(password)) {
            throw new BadCredentialsException("Invalid email or password");
        }
        return new UsernamePasswordAuthenticationToken(
                email,
                password,
                userDetails.getAuthorities()
        );
    }

    @PostMapping("/two-factor/otp/{otp}")
    public ResponseEntity<?> verifyOtp(
            @PathVariable String otp,
            @RequestParam String id) throws Exception {
        TwoFactorOtp twoFactorOtp = twoFactorOtpService.findById(id);
        if (twoFactorOtpService.verifyOtp(twoFactorOtp, otp)) {
            AuthResponse res = new AuthResponse();
            res.setMessage("OTP verified successfully");
            res.setJwt(twoFactorOtp.getToken());
            res.setStatus(true);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }
        throw new Exception("Invalid OTP");
    }
}
