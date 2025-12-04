package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.Coin;
import com.stockmarket.predictor.Model.Order;
import com.stockmarket.predictor.Model.OrderItem;
import com.stockmarket.predictor.domain.ORDER_TYPE;

import java.math.BigDecimal;
import java.util.List;

public interface OrderService {
    Order createOrder(User user, OrderItem orderItem, ORDER_TYPE ORDER_TYPE);

    Order getOrderById(String orderId) throws Exception;

    List<Order> getAllOrdersOfUser(String userId, String OrderType, String assetSymbol);

    Order processOrder(Coin coin, BigDecimal quantity, ORDER_TYPE ORDER_TYPE, User user);



}
