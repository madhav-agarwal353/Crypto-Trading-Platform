package com.stockmarket.predictor.Model;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.domain.VerificationType;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class ForgotPasswordToken {

    @Id
    private String id;
    private User user;
    private String otp;
    private VerificationType verificationType;
    private String sendTo;


}
