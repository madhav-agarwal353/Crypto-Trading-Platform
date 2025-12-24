 package com.stockmarket.predictor.Model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

 @Data
public class Article {

    @JsonProperty("article_id")
    private String articleId;

    private String title;
    private String description;
    private String link;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("pubDate")
    private String pubDate;

    @JsonProperty("source_name")
    private String sourceName;

    private String language;
    private String[] category;
}

