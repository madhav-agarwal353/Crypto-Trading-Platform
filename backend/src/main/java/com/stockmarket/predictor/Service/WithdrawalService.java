package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.Withdrawal;

import java.util.List;

public interface WithdrawalService {
    Withdrawal requestWithdrawal(User user, double amount);
    Withdrawal processWithdrawal(String withdrawalId, boolean isSuccess) throws Exception;
    List<Withdrawal> getAllWithdrawalsOfUser(String userId);
    List<Withdrawal> getAllWithdrawalRequest();
}
