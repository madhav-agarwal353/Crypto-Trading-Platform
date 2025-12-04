package com.stockmarket.predictor.Model;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.domain.PaymentMethod;
import com.stockmarket.predictor.domain.PaymentOrderStatus;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
public class PaymentOrder {
    @Id
    private String id;
    private Double amount;
    private PaymentOrderStatus status;
    private PaymentMethod paymentMethod;
    @DBRef
    private User user;
}
