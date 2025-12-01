package com.stockmarket.predictor.Model;

import com.stockmarket.predictor.Entity.User;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
public class Asset {

    @Id
    private String id;
    private double quantity;
    private double buyPrice;
    @DBRef
    private Coin coin;
    @DBRef
    private User user;


}
