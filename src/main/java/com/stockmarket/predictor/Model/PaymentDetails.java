package com.stockmarket.predictor.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.stockmarket.predictor.Entity.User;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
public class PaymentDetails {

    @Id
    private String id;
    private String accountNumber;
    private String accountHolderName;
    private String ifsc;
    private String bankName;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @DBRef
    private User user;


}
