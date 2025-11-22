package com.stockmarket.predictor.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.stockmarket.predictor.domain.USER_ROLE;
import com.stockmarket.predictor.Model.TwoFactorAuthentication;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private TwoFactorAuthentication tF = new TwoFactorAuthentication();

    private USER_ROLE role = USER_ROLE.COSTUMER;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public TwoFactorAuthentication gettF() {
        return tF;
    }

    public void settF(TwoFactorAuthentication tF) {
        this.tF = tF;
    }

    public USER_ROLE getRole() {
        return role;
    }

    public void setRole(USER_ROLE role) {
        this.role = role;
    }

}
