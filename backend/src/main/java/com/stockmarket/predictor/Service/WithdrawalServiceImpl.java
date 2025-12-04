package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.Withdrawal;
import com.stockmarket.predictor.Respository.WithdrawalRepository;
import com.stockmarket.predictor.domain.WithdrawalStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WithdrawalServiceImpl implements WithdrawalService {

    @Autowired
    private WithdrawalRepository withdrawalRepository;

    @Override
    public Withdrawal requestWithdrawal(User user, double amount) {
        Withdrawal withdrawal = new Withdrawal();
        withdrawal.setUser(user);
        withdrawal.setAmount(amount);
        withdrawal.setStatus(WithdrawalStatus.PENDING);
        return withdrawalRepository.save(withdrawal);
    }

    @Override
    public Withdrawal processWithdrawal(String withdrawalId, boolean isSuccess) throws Exception {
        Optional<Withdrawal> optionalWithdrawal = withdrawalRepository.findById(withdrawalId);
        if (optionalWithdrawal.isEmpty()) {
            throw new Exception("Withdrawal not found for id: " + withdrawalId);
        }
        Withdrawal withdrawal = optionalWithdrawal.get();
        if (isSuccess) {
            withdrawal.setStatus(WithdrawalStatus.SUCCESS);
        } else {
            withdrawal.setStatus(WithdrawalStatus.FAILED);
        }
        return withdrawalRepository.save(withdrawal);
    }

    @Override
    public List<Withdrawal> getAllWithdrawalsOfUser(String userId) {
        return withdrawalRepository.findByUserId(userId);
    }

    @Override
    public List<Withdrawal> getAllWithdrawalRequest() {
        return withdrawalRepository.findAll();
    }
}
