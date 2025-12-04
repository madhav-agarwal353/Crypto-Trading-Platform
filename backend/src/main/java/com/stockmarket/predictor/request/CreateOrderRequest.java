package com.stockmarket.predictor.request;

import com.stockmarket.predictor.domain.ORDER_TYPE;
import lombok.Data;

@Data
public class CreateOrderRequest {

    private String coinId;
    private double quantity;
    private ORDER_TYPE orderType;

}
