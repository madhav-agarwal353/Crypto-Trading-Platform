package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.VerificationCode;
import com.stockmarket.predictor.domain.VerificationType;
import org.springframework.stereotype.Service;


public interface VerificationCodeService {
   VerificationCode sendVerificationCode(User user , VerificationType verificationType);
   VerificationCode getVerificationCodeById(String id);
   VerificationCode getVerificationCodeByUser(String userId);
   void deleteVerificationCode(VerificationCode verificationCode);
}
