package com.stockmarket.predictor.Respository;

import com.stockmarket.predictor.Entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRespository extends MongoRepository<User, String> {
    User findByEmail(String email);
}
