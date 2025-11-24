package com.stockmarket.predictor.Model;

import com.stockmarket.predictor.Entity.User;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Asset {

    @Id
    private String id;
    private double quantity;
    private double buyPrice;
    private Coin coin;
    private User user;


}
