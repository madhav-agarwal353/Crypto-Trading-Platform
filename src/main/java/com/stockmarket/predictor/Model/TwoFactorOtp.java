package com.stockmarket.predictor.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.stockmarket.predictor.Entity.User;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
public class TwoFactorOtp {
    @Id
    private String id;
    private String otp;


    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User user;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String token;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
