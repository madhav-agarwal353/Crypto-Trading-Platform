package com.stockmarket.predictor.Respository;

import com.stockmarket.predictor.Model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRespository extends MongoRepository<Order, String> {
    List<Order> findByUserId(String orderId);
}
