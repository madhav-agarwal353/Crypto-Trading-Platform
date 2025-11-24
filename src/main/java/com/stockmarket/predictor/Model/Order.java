package com.stockmarket.predictor.Model;

import com.mongodb.lang.NonNull;
import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.domain.OrderStatus;
import com.stockmarket.predictor.domain.OrderType;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class Order {

    @Id
    private String Id;
    private User user;
    @NonNull
    private OrderType orderType;
    @NonNull
    private BigDecimal price;
    private LocalDate timestamp = LocalDate.now();
    private OrderStatus status;
    private OrderItem orderItem;

}
