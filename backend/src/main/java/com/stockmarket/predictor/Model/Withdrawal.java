package com.stockmarket.predictor.Model;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.domain.WithdrawalStatus;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDateTime;

@Data
public class Withdrawal {
    @Id
    private String id;
    private WithdrawalStatus status;
    private double amount;
    @DBRef
    private User user;
    private LocalDateTime dateTime = LocalDateTime.now();

}
