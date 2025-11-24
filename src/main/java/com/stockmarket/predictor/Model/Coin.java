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

}
