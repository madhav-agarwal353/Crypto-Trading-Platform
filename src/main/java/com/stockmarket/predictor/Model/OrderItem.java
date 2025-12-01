package com.stockmarket.predictor.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
public class OrderItem {

    @Id
    private String id;

    private double quantity;

    @DBRef
    private Coin coin;

    private double buyPrice;

    private double sellPrice;

    @DBRef
    private Order order;


}
