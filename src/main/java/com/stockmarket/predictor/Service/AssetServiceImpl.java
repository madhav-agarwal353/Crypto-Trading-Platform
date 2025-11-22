package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.Asset;
import com.stockmarket.predictor.Model.Coin;
import com.stockmarket.predictor.Respository.AssetRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssetServiceImpl implements AssetService {

    @Autowired
    private AssetRespository assetRespository;

    @Override
    public Asset createAsset(User user, Coin coin, double quantity) {
        Asset asset = new Asset();
        asset.setUser(user);
        asset.setCoin(coin);
        asset.setQuantity(quantity);
        asset.setBuyPrice(coin.getCurrentPrice().doubleValue());
        return assetRespository.save(asset);
    }

    @Override
    public Asset getAssetById(String assetId) throws Exception {
        return assetRespository.findById(assetId).orElseThrow(() -> new Exception("Asset not found for id: " + assetId));
    }

    @Override
    public Asset getAssetByUserAndCoin(String userId, String coinSymbol) throws Exception {
        return null;
    }

    @Override
    public List<Asset> getAllAssetsOfUser(String userId) {
        return assetRespository.findByUserId(userId);
    }

    @Override
    public Asset updateAsset(String asset, double quantity) throws Exception {
        Asset existingAsset = getAssetById(asset);
        existingAsset.setQuantity(quantity + existingAsset.getQuantity());
        return assetRespository.save(existingAsset);
    }

    @Override
    public Asset findAssetByUserAndCoin(String userId, String coinId) {
        return assetRespository.findByUserIdAndCoinId(userId, coinId);
    }

    @Override
    public void deleteAsset(String asset) {
        assetRespository.deleteById(asset);
    }
}
