package com.stockmarket.predictor.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stockmarket.predictor.Entity.User;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.math.BigDecimal;

@Data
public class Wallet {

    @Id
    private String id;

    @DBRef
    private User user;

    private BigDecimal balance;


}
