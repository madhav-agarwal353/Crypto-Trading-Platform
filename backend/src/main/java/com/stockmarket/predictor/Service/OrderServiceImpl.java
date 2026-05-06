package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.*;
import com.stockmarket.predictor.Respository.OrderItemRespository;
import com.stockmarket.predictor.Respository.OrderRespository;
import com.stockmarket.predictor.Respository.WalletTransactionRespository;
import com.stockmarket.predictor.domain.ORDER_STATUS;
import com.stockmarket.predictor.domain.ORDER_TYPE;
import com.stockmarket.predictor.domain.WalletTransactionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRespository orderRespository;

    @Autowired
    private WalletService walletService;

    @Autowired
    private OrderItemRespository orderItemRespository;

    @Autowired
    private AssetService assetService;

    @Autowired
    private WalletTransactionRespository walletTransactionRespository;

    @Override
    public Order createOrder(User user, OrderItem orderItem, ORDER_TYPE ORDER_TYPE) {
        BigDecimal price = orderItem.getCoin().
                getCurrentPrice().
                multiply(
                        BigDecimal.valueOf
                                (orderItem.getQuantity()));
        Order order = new Order();
        order.setUser(user);
        order.setOrderItem(orderItem);
        order.setORDER_TYPE(ORDER_TYPE);
        order.setPrice(price);
        order.setTimestamp(LocalDate.now());
        order.setStatus(ORDER_STATUS.PENDING);
        return orderRespository.save(order);
    }

    @Override
    public Order getOrderById(String orderId) throws Exception {
        return orderRespository.findById(orderId).orElseThrow(() -> new Exception("Order not found for id: "));
    }

    @Override
    public List<Order> getAllOrdersOfUser(String userId, String OrderType, String assetSymbol) {
        return orderRespository.findByUserId(userId);
    }

    private OrderItem createOrderItem(Coin coin,
                                      BigDecimal quantity,
                                      double buyPrice,
                                      double sellPrice) {
        OrderItem orderItem = new OrderItem();
        orderItem.setCoin(coin);
        orderItem.setQuantity(quantity.doubleValue());
        orderItem.setBuyPrice(buyPrice);
        orderItem.setSellPrice(sellPrice);
        return orderItemRespository.save(orderItem);
    }


    @Override
    public  Order buyAsset(Coin coin,
                           BigDecimal quantity,
                           User user) throws Exception {
        double buyPrice = coin.getCurrentPrice().doubleValue();
        OrderItem orderItem = createOrderItem(coin, quantity, buyPrice, 0.0);
        Order order = createOrder(user, orderItem, ORDER_TYPE.BUY);
        orderItem.setOrder(order);
        walletService.payOrder(order, user);
        order.setStatus(ORDER_STATUS.SUCCESS);
        order.setORDER_TYPE(ORDER_TYPE.BUY);
        Order savedOrder = orderRespository.save(order);
        Asset existingAsset = assetService.findAssetByUserAndCoin(user.getId(), coin.getId());
        if (existingAsset != null) {
            assetService.updateAsset(existingAsset.getId(), quantity.doubleValue());
        } else {
            assetService.createAsset(user, coin, quantity.doubleValue());
        }
        //--------------------------------------------
        String id = user.getId();
        WalletTransaction walletTransactionfrom = new WalletTransaction();
        walletTransactionfrom.setAmount(quantity.multiply(BigDecimal.valueOf(-1 * buyPrice)));
        walletTransactionfrom.setCreatedAt(Instant.now());
        walletTransactionfrom.setType(WalletTransactionType.BUY_ASSET);
        walletTransactionfrom.setUserId(id);
        walletTransactionRespository.save(walletTransactionfrom);
        return savedOrder;
    }

    public Order sellAsset(Coin coin,
                            BigDecimal quantity,
                            User user) throws Exception {
        double sellPrice = coin.getCurrentPrice().doubleValue();
        Asset assetToSell = assetService.findAssetByUserAndCoin(user.getId(), coin.getId());
        if (assetToSell == null) {
            throw new Exception("No asset found to sell");
        }
        double buyPrice = assetToSell.getBuyPrice();
        OrderItem orderItem = createOrderItem(coin, quantity, 0, sellPrice);
        Order order = createOrder(user, orderItem, ORDER_TYPE.SELL);
        orderItem.setOrder(order);
        if (assetToSell.getQuantity() >= quantity.doubleValue()) {
            order.setStatus(ORDER_STATUS.SUCCESS);
            order.setORDER_TYPE(ORDER_TYPE.SELL);
            Order savedOrder = orderRespository.save(order);
            walletService.payOrder(order, user);
            Asset updatedAsset = assetService.updateAsset(assetToSell.getId(), quantity.multiply(BigDecimal.valueOf(-1)).doubleValue());
            if (updatedAsset.getQuantity() * coin.getCurrentPrice().doubleValue() < 1) {
                assetService.deleteAsset(updatedAsset.getId());
            }
            String idFrom = user.getId();
            WalletTransaction walletTransactionfrom = new WalletTransaction();
            walletTransactionfrom.setAmount(quantity.multiply(BigDecimal.valueOf(1)));
            walletTransactionfrom.setCreatedAt(Instant.now());
            walletTransactionfrom.setType(WalletTransactionType.SELL_ASSET);
            walletTransactionfrom.setUserId(idFrom);
            walletTransactionRespository.save(walletTransactionfrom);
            return savedOrder;
        }
        throw new Exception("Insufficient asset quantity to sell");
    }

    @Override
    @Transactional
    public Order processOrder(Coin coin, BigDecimal quantity, ORDER_TYPE orderType, User user) {
        if (orderType == ORDER_TYPE.BUY) {
            try {
                return buyAsset(coin, quantity, user);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        } else if (orderType == ORDER_TYPE.SELL) {
            try {
                return sellAsset(coin, quantity, user);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        throw new RuntimeException("Invalid order type");
    }
}
