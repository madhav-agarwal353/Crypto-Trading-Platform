package com.stockmarket.predictor.Model;

import com.stockmarket.predictor.Entity.User;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.io.LineNumberInputStream;
import java.util.ArrayList;
import java.util.List;

@Data
public class Watchlist {

    @Id
    private String id;
    private User user;
    private List<Coin> coins =new ArrayList<>();


}
