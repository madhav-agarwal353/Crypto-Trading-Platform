package com.stockmarket.predictor.Model;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.domain.WithdrawalStatus;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
public class Withdrawal {
    @Id
    private Long id;
    private WithdrawalStatus status;
    private double amount;
    private User user;
    private LocalDateTime dateTime = LocalDateTime.now();


}
