package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.ForgotPasswordToken;
import com.stockmarket.predictor.Respository.ForgotPasswordRepository;
import com.stockmarket.predictor.domain.VerificationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ForgotPasswordServiceImpl implements ForgotPasswordService {

    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;

    @Override
    public ForgotPasswordToken createToken(User user, String token, String id, VerificationType verificationType, String sendTo) {
        ForgotPasswordToken
                forgotPasswordToken = new ForgotPasswordToken();
        forgotPasswordToken.setUser(user);
        forgotPasswordToken.setSendTo(sendTo);
        forgotPasswordToken.setOtp(token);
        forgotPasswordToken.setId(id);
        forgotPasswordToken.setVerificationType(verificationType);
        return forgotPasswordRepository.save(forgotPasswordToken);
    }

    @Override
    public ForgotPasswordToken findByUserId(String userId) {
        ForgotPasswordToken optionalToken = forgotPasswordRepository.findByUserId(userId);
        return optionalToken;
    }

    @Override
    public void deleteToken(ForgotPasswordToken token) {
        forgotPasswordRepository.delete(token);
    }

    @Override
    public ForgotPasswordToken findByUser(String userId) {
        return forgotPasswordRepository.findByUserId(userId);
    }
}
