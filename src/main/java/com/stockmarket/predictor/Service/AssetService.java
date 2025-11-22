package com.stockmarket.predictor.Service;

import com.stockmarket.predictor.Entity.User;
import com.stockmarket.predictor.Model.Asset;
import com.stockmarket.predictor.Model.Coin;

import java.util.List;

public interface AssetService {
    Asset createAsset(User user, Coin coin, double quantity);
    Asset getAssetById(String assetId) throws Exception;
    Asset getAssetByUserAndCoin(String userId, String coinSymbol) throws Exception;
    List<Asset> getAllAssetsOfUser(String userId);
    Asset updateAsset(String asset,double quantity) throws Exception;
    Asset findAssetByUserAndCoin(String userId, String coinId);
    void deleteAsset(String asset);
}
