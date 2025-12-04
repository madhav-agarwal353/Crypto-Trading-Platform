package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.PaymentDetails;

public interface PaymentDetailsService {
    public PaymentDetails addPaymentDetails(
            String accoundNumber,
            String accountHolderName,
            String ifsc,
            String bankName,
            User user
    );
    public PaymentDetails getUserPaymentDetails(User user);
}
