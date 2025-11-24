package com.stockmarket.predictor.Model;

import com.stockmarket.predictor.Entity.User;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;

@Data
public class Wallet {

    @Id
    private String id;

    private User user;

    private BigDecimal balance;


}
