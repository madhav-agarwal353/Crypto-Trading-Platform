package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.domain.VerificationType;


public interface UserService {
    public User findUserByEmail(String email);

    public User findUserByJwtToken(String token);

    public User findUserById(String id);

    public User enableTwoFactorAuth(VerificationType verificationType,
                                    String sendto,
                                    User user);

    public User updatePaassword(User user, String newPassword);
}
