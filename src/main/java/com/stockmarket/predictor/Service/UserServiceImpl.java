package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Config.JwtProvider;
import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.TwoFactorAuthentication;
import com.stockmarket.predictor.Respository.UserRespository;
import com.stockmarket.predictor.domain.VerificationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRespository userRespository;

    @Override
    public User findUserByEmail(String email) {
        User user = userRespository.findByEmail(email);
        return user;
    }

    @Override
    public User findUserByJwtToken(String token) {
        String email = JwtProvider.getEmailFromToken(token);
        User user = userRespository.findByEmail(email);
        return user;
    }

    @Override
    public User findUserById(String id) {
        User user = userRespository.findById(id).orElse(null);
        return user;
    }

    @Override
    public User enableTwoFactorAuth(VerificationType verificationType, String sendto, User user) {
        TwoFactorAuthentication twoFactorAuthentication = new TwoFactorAuthentication();
        twoFactorAuthentication.setEnabled(true);
        twoFactorAuthentication.setSendTo(verificationType);
        user.setTF(twoFactorAuthentication);
        return userRespository.save(user);
    }


    @Override
    public User updatePaassword(User user, String newPassword) {
        user.setPassword(newPassword);
        return userRespository.save(user);
    }
}
