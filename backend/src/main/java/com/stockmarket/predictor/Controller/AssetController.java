package com.stockmarket.predictor.Controller;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.Asset;
import com.stockmarket.predictor.Service.AssetService;
import com.stockmarket.predictor.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/assets")
public class AssetController {
    @Autowired
    private AssetService assetService;

    @Autowired
    private UserService userService;

    @GetMapping("/{assetId}")
    public ResponseEntity<?> getAssetById(@PathVariable String assetId) throws Exception {
        return ResponseEntity.ok(assetService.getAssetById(assetId));
    }

    @GetMapping("/coin/{coinId}/user")
    public ResponseEntity<?> getAssetByUseIdAndCoinId(
            @RequestHeader("Authorization") String token,
            @PathVariable String coinId
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Asset asset = assetService.getAssetByUserAndCoin(user.getId(), coinId);
        return ResponseEntity.ok(asset);
    }

    @GetMapping()
    public ResponseEntity<?> getAllAssetsOfUser(
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        return ResponseEntity.ok(assetService.getAllAssetsOfUser(user.getId()));
    }

}
