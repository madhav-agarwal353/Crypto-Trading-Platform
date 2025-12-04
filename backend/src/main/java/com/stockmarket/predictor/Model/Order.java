package com.stockmarket.predictor.Model;

import com.mongodb.lang.NonNull;
import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.domain.ORDER_STATUS;
import com.stockmarket.predictor.domain.ORDER_TYPE;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class Order {

    @Id
    private String Id;
    @DBRef
    private User user;
    @NonNull
    private ORDER_TYPE ORDER_TYPE;
    @NonNull
    private BigDecimal price;
    private LocalDate timestamp = LocalDate.now();
    private ORDER_STATUS status;
    @DBRef
    private OrderItem orderItem;
}
