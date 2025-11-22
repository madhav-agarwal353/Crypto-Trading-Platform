package com.stockmarket.predictor.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "cryptocurrencies")
public class Coin {
//    public class Cryptocurrency {
//
        @Id
        @JsonProperty("id")
        private String id;

        @Field("symbol")
        @JsonProperty("symbol")
        private String symbol;

        @Field("name")
        @JsonProperty("name")
        private String name;

        @Field("image")
        @JsonProperty("image")
        private String image;

        @Field("current_price")
        @JsonProperty("current_price")
        private BigDecimal currentPrice;

        @Field("market_cap")
        @JsonProperty("market_cap")
        private BigDecimal marketCap;

        @Field("market_cap_rank")
        @JsonProperty("market_cap_rank")
        private Integer marketCapRank;

        @Field("fully_diluted_valuation")
        @JsonProperty("fully_diluted_valuation")
        private BigDecimal fullyDilutedValuation;

        @Field("total_volume")
        @JsonProperty("total_volume")
        private BigDecimal totalVolume;

        @Field("high_24h")
        @JsonProperty("high_24h")
        private BigDecimal high24h;

        @Field("low_24h")
        @JsonProperty("low_24h")
        private BigDecimal low24h;

        @Field("price_change_24h")
        @JsonProperty("price_change_24h")
        private BigDecimal priceChange24h;

        @Field("price_change_percentage_24h")
        @JsonProperty("price_change_percentage_24h")
        private BigDecimal priceChangePercentage24h;

        @Field("market_cap_change_24h")
        @JsonProperty("market_cap_change_24h")
        private BigDecimal marketCapChange24h;

        @Field("market_cap_change_percentage_24h")
        @JsonProperty("market_cap_change_percentage_24h")
        private BigDecimal marketCapChangePercentage24h;

        @Field("circulating_supply")
        @JsonProperty("circulating_supply")
        private BigDecimal circulatingSupply;

        @Field("total_supply")
        @JsonProperty("total_supply")
        private BigDecimal totalSupply;

        @Field("max_supply")
        @JsonProperty("max_supply")
        private BigDecimal maxSupply;

        @Field("ath")
        @JsonProperty("ath")
        private BigDecimal ath;

        @Field("ath_change_percentage")
        @JsonProperty("ath_change_percentage")
        private BigDecimal athChangePercentage;

        @Field("ath_date")
        @JsonProperty("ath_date")
        private String athDate;

        @Field("atl")
        @JsonProperty("atl")
        private BigDecimal atl;

        @Field("atl_change_percentage")
        @JsonProperty("atl_change_percentage")
        private BigDecimal atlChangePercentage;

        @Field("atl_date")
        @JsonProperty("atl_date")
        private Date atlDate;

        @Field("roi")
        @JsonProperty("roi")
        private String roi;

        @Field("last_updated")
        @JsonProperty("last_updated")
        private String lastUpdated;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getSymbol() {
            return symbol;
        }

        public void setSymbol(String symbol) {
            this.symbol = symbol;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getImage() {
            return image;
        }

        public void setImage(String image) {
            this.image = image;
        }

        public BigDecimal getCurrentPrice() {
            return currentPrice;
        }

        public void setCurrentPrice(BigDecimal currentPrice) {
            this.currentPrice = currentPrice;
        }

        public BigDecimal getMarketCap() {
            return marketCap;
        }

        public void setMarketCap(BigDecimal marketCap) {
            this.marketCap = marketCap;
        }

        public Integer getMarketCapRank() {
            return marketCapRank;
        }

        public void setMarketCapRank(Integer marketCapRank) {
            this.marketCapRank = marketCapRank;
        }

        public BigDecimal getFullyDilutedValuation() {
            return fullyDilutedValuation;
        }

        public void setFullyDilutedValuation(BigDecimal fullyDilutedValuation) {
            this.fullyDilutedValuation = fullyDilutedValuation;
        }

        public BigDecimal getTotalVolume() {
            return totalVolume;
        }

        public void setTotalVolume(BigDecimal totalVolume) {
            this.totalVolume = totalVolume;
        }

        public BigDecimal getHigh24h() {
            return high24h;
        }

        public void setHigh24h(BigDecimal high24h) {
            this.high24h = high24h;
        }

        public BigDecimal getLow24h() {
            return low24h;
        }

        public void setLow24h(BigDecimal low24h) {
            this.low24h = low24h;
        }

        public BigDecimal getPriceChange24h() {
            return priceChange24h;
        }

        public void setPriceChange24h(BigDecimal priceChange24h) {
            this.priceChange24h = priceChange24h;
        }

        public BigDecimal getPriceChangePercentage24h() {
            return priceChangePercentage24h;
        }

        public void setPriceChangePercentage24h(BigDecimal priceChangePercentage24h) {
            this.priceChangePercentage24h = priceChangePercentage24h;
        }

        public BigDecimal getMarketCapChange24h() {
            return marketCapChange24h;
        }

        public void setMarketCapChange24h(BigDecimal marketCapChange24h) {
            this.marketCapChange24h = marketCapChange24h;
        }

        public BigDecimal getMarketCapChangePercentage24h() {
            return marketCapChangePercentage24h;
        }

        public void setMarketCapChangePercentage24h(BigDecimal marketCapChangePercentage24h) {
            this.marketCapChangePercentage24h = marketCapChangePercentage24h;
        }

        public BigDecimal getCirculatingSupply() {
            return circulatingSupply;
        }

        public void setCirculatingSupply(BigDecimal circulatingSupply) {
            this.circulatingSupply = circulatingSupply;
        }

        public BigDecimal getTotalSupply() {
            return totalSupply;
        }

        public void setTotalSupply(BigDecimal totalSupply) {
            this.totalSupply = totalSupply;
        }

        public BigDecimal getMaxSupply() {
            return maxSupply;
        }

        public void setMaxSupply(BigDecimal maxSupply) {
            this.maxSupply = maxSupply;
        }

        public BigDecimal getAth() {
            return ath;
        }

        public void setAth(BigDecimal ath) {
            this.ath = ath;
        }

        public BigDecimal getAthChangePercentage() {
            return athChangePercentage;
        }

        public void setAthChangePercentage(BigDecimal athChangePercentage) {
            this.athChangePercentage = athChangePercentage;
        }

        public String getAthDate() {
            return athDate;
        }

        public void setAthDate(String athDate) {
            this.athDate = athDate;
        }

        public BigDecimal getAtl() {
            return atl;
        }

        public void setAtl(BigDecimal atl) {
            this.atl = atl;
        }

        public BigDecimal getAtlChangePercentage() {
            return atlChangePercentage;
        }

        public void setAtlChangePercentage(BigDecimal atlChangePercentage) {
            this.atlChangePercentage = atlChangePercentage;
        }

        public Date getAtlDate() {
            return atlDate;
        }

        public void setAtlDate(Date atlDate) {
            this.atlDate = atlDate;
        }

        public String getRoi() {
            return roi;
        }

        public void setRoi(String roi) {
            this.roi = roi;
        }

        public String getLastUpdated() {
            return lastUpdated;
        }

        public void setLastUpdated(String lastUpdated) {
            this.lastUpdated = lastUpdated;
        }
}
