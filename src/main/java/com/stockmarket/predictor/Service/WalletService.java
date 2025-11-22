package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.Order;
import com.stockmarket.predictor.Model.Wallet;

import java.math.BigDecimal;

public interface WalletService {

    Wallet getUserWallet(User user);

    void addBalance(Wallet wallet, double amount);

    Wallet findWalletById(String userId) throws Exception;

    void transferFunds(Wallet fromWallet, Wallet toWallet, BigDecimal amount) throws Exception;

    Wallet payOrder(Order order , User user) throws Exception;
}
