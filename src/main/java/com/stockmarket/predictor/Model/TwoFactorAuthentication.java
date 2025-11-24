package com.stockmarket.predictor.Model;

import com.stockmarket.predictor.domain.VerificationType;
import lombok.Data;

@Data
public class TwoFactorAuthentication {
    private boolean isEnabled = false;
    private VerificationType sendTo;


}
