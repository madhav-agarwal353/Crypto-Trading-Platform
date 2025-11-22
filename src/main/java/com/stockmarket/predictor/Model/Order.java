package com.stockmarket.predictor.Model;

import com.mongodb.lang.NonNull;
import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.domain.OrderStatus;
import com.stockmarket.predictor.domain.OrderType;
import lombok.Data;
import org.springframework.context.annotation.Primary;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
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

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        Id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @NonNull
    public OrderType getOrderType() {
        return orderType;
    }

    public void setOrderType(@NonNull OrderType orderType) {
        this.orderType = orderType;
    }

    @NonNull
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(@NonNull BigDecimal price) {
        this.price = price;
    }

    public LocalDate getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDate timestamp) {
        this.timestamp = timestamp;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public OrderItem getOrderItem() {
        return orderItem;
    }

    public void setOrderItem(OrderItem orderItem) {
        this.orderItem = orderItem;
    }
}
