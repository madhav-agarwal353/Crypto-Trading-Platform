package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.TwoFactorOtp;
import com.stockmarket.predictor.Respository.TwoFactorOtpRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TwoFactorOtpServiceImpl implements TwoFactorOtpService {

    @Autowired
    private TwoFactorOtpRespository twoFactorOtpRespository;

    @Override
    public TwoFactorOtp createTwoFactorOtp(User user, String Otp, String token) {
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();
        TwoFactorOtp twoFactorOtp = new TwoFactorOtp();
        twoFactorOtp.setId(id);
        twoFactorOtp.setOtp(Otp);
        twoFactorOtp.setUser(user);
        twoFactorOtp.setToken(token);
        return twoFactorOtpRespository.save(twoFactorOtp);
    }

    @Override
    public TwoFactorOtp findByUser(String userId) {
        return twoFactorOtpRespository.findByUserId(userId);
    }

    @Override
    public TwoFactorOtp findById(String id) {
        return twoFactorOtpRespository.findById(id).orElse(null);
    }

    @Override
    public boolean verifyOtp(TwoFactorOtp twoFactorOtp, String otp) {
        return twoFactorOtp.getOtp().equals(otp);
    }

    @Override
    public void deleteOtp(TwoFactorOtp twoFactorOtp) {
        twoFactorOtpRespository.delete(twoFactorOtp);
    }
}
