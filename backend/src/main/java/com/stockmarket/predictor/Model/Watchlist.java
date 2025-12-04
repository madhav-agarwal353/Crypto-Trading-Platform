package com.stockmarket.predictor.Model;

import com.stockmarket.predictor.Entity.User;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.LineNumberInputStream;
import java.util.ArrayList;
import java.util.List;

@Data
public class Watchlist {

    @Id
    private String id;
    @DBRef
    private User user;
    @DBRef
    private List<Coin> coins = new ArrayList<>();


}
