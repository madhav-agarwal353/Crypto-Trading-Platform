package com.stockmarket.predictor.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class OrderItem {

    @Id
    private String id;

    private double quantity;

    private Coin coin;

    private double buyPrice;

    private double sellPrice;

    @JsonIgnore
    private Order order;


}
