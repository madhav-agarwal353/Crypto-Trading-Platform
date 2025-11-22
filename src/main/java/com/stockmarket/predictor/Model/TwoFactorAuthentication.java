package com.stockmarket.predictor.Model;

import com.stockmarket.predictor.domain.VerificationType;
import lombok.Data;

@Data
public class TwoFactorAuthentication {
    private boolean isEnabled = false;
    private VerificationType sendTo;

    public boolean isEnabled() {
        return isEnabled;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

    public VerificationType getSendTo() {
        return sendTo;
    }

    public void setSendTo(VerificationType sendTo) {
        this.sendTo = sendTo;
    }
}
