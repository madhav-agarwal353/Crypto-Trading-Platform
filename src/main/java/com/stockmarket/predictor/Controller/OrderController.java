package com.stockmarket.predictor.Controller;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.Coin;
import com.stockmarket.predictor.Model.Order;
import com.stockmarket.predictor.Service.CoinService;
import com.stockmarket.predictor.Service.OrderService;
import com.stockmarket.predictor.Service.UserService;
import com.stockmarket.predictor.domain.OrderType;
import com.stockmarket.predictor.request.CreateOrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;
    @Autowired
    private CoinService coinService;

    //     @Autowired
//    private
    @PostMapping("/pay")
    public ResponseEntity<Order> payOrder(
            @RequestHeader("Authorization") String token,
            @RequestBody CreateOrderRequest req) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Coin coin = coinService.findById(req.getCoinId());
        Order order = orderService.processOrder(
                coin,
                BigDecimal.valueOf(req.getQuantity()),
                req.getOrderType(),
                user
        );
        return ResponseEntity.ok(order);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderById(
            @RequestHeader("Authorization") String token,
            @PathVariable String orderId
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Order order = orderService.getOrderById(orderId);
        if (!order.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("Forbidden: You don't have access to this order");
//            throw new Exception("Forbidden: You don't have access to this order");
        }
        return ResponseEntity.ok(order);
    }

    @GetMapping()
    public ResponseEntity<?> getAllOrdersOfUser(
            @RequestHeader("Authorization") String token,
            @RequestParam(required = false) OrderType orderType,
            @RequestParam(required = false) String assetSymbol
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        return ResponseEntity.ok(
                orderService.getAllOrdersOfUser(
                        user.getId(),
                        orderType.toString(),
                        assetSymbol
                )
        );
    }

}
