package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.VerificationCode;
import com.stockmarket.predictor.Respository.VerificationCodeRespository;
import com.stockmarket.predictor.Utils.otpUtils;
import com.stockmarket.predictor.domain.VerificationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VerificationCodeServiceImpl implements VerificationCodeService {

    @Autowired
    private VerificationCodeRespository verificationCodeRespository;

    @Override
    public VerificationCode sendVerificationCode(User user, VerificationType verificationType) {
        VerificationCode vc1 = new VerificationCode();
        vc1.setOtp(otpUtils.generateOtp());
        vc1.setVerificationType(verificationType);
        vc1.setUser(user);
        return verificationCodeRespository.save(vc1);
    }

    @Override
    public VerificationCode getVerificationCodeById(String id) {
        Optional<VerificationCode> vc = verificationCodeRespository.findById(id);
        return vc.orElse(null);
    }

    @Override
    public VerificationCode getVerificationCodeByUser(String userId) {
        return verificationCodeRespository.findByUserId(userId);
    }

    @Override
    public void deleteVerificationCode(VerificationCode verificationCode) {
         verificationCodeRespository.delete(verificationCode);
    }
}
