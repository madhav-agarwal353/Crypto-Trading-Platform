package com.stockmarket.predictor.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.stockmarket.predictor.domain.USER_ROLE;
import com.stockmarket.predictor.Model.TwoFactorAuthentication;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "users")
@Data
public class User {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String email;

    private Long mobileNo;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private TwoFactorAuthentication tF = new TwoFactorAuthentication();

    private USER_ROLE role = USER_ROLE.COSTUMER;

}
