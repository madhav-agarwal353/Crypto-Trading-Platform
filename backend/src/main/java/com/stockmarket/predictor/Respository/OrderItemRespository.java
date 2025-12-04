package com.stockmarket.predictor.Respository;

import com.stockmarket.predictor.Model.OrderItem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderItemRespository extends MongoRepository<OrderItem, String> {
}
