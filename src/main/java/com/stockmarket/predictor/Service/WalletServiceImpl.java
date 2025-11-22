package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.Order;
import com.stockmarket.predictor.Model.Wallet;
import com.stockmarket.predictor.Respository.WalletRespository;
import com.stockmarket.predictor.domain.OrderType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class WalletServiceImpl implements WalletService {

    @Autowired
    WalletRespository walletRespository;

    @Override
    public Wallet getUserWallet(User user) {
        Wallet wallet = walletRespository.findByUserId(user.getId());
        if (wallet == null) {
            wallet = new Wallet();
            wallet.setId(user.getId());
            wallet.setUser(user);
            wallet.setBalance(BigDecimal.valueOf(0.0));
            walletRespository.save(wallet);
        }
        return wallet;
    }

    @Override
    public void addBalance(Wallet wallet, double amount) {
        BigDecimal currentBalance = wallet.getBalance();
        BigDecimal newBalance = currentBalance.add(BigDecimal.valueOf(amount));
        wallet.setBalance(newBalance);
        walletRespository.save(wallet);
    }

    @Override
    public Wallet findWalletById(String userId) throws Exception {
        Optional<Wallet> wallet = walletRespository.findById(userId);
        if (wallet.isPresent()) {
            return wallet.get();
        }
        throw new Exception("Wallet not found for user id: " + userId);
    }

    @Override
    @Transactional
    public void transferFunds(Wallet fromWallet, Wallet toWallet, BigDecimal amount) throws Exception {
        if (fromWallet.getBalance().compareTo(amount) < 0) {
            throw new Exception("Insufficient funds in the source wallet.");
        }
        fromWallet.setBalance(fromWallet.getBalance().subtract(amount));
        toWallet.setBalance(toWallet.getBalance().add(amount));
        walletRespository.save(fromWallet);
        walletRespository.save(toWallet);
    }

    @Override
    public Wallet payOrder(Order order, User user) throws Exception {
        Wallet wallet = getUserWallet(user);
        if (order.getOrderType().equals(OrderType.BUY)) {
            BigDecimal newBalance = wallet.getBalance();
            if (newBalance.compareTo(order.getPrice()) < 0) {
                throw new Exception("Less balance");
            }
            wallet.setBalance(wallet.getBalance().add(order.getPrice()));
        } else if (order.getOrderType().equals(OrderType.SELL)) {
            BigDecimal newBalance = wallet.getBalance().add(order.getPrice());
            wallet.setBalance(newBalance);
            return walletRespository.save(wallet);
        }
        return null;
    }
}
