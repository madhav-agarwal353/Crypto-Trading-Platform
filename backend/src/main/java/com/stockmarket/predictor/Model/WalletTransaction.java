package com.stockmarket.predictor.Model;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.domain.WalletTransactionType;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Data
public class WalletTransaction {

    @Id
    private String id;
    private WalletTransactionType type;
    private String userId;
    @CreatedDate
    private Instant createdAt;
    private String transferId;
    private String purpose;
    private BigDecimal amount;
}
