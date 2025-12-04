package com.stockmarket.predictor.Model;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.domain.VerificationType;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class VerificationCode {

    @Id
    private String id;

    private String otp;

    private User user;
    private String email;
    private String mobile;
    private VerificationType verificationType;


}
