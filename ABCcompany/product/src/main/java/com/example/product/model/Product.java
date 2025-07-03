package com.example.product.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data

public class Product {
    @Id
    private int productId;
    private String productName;
    private String productDescription;
    private int productPrice;
    private int forSale;

    private String imageName;
    private String imageType;

    @Lob
    @Column(length = 100000)  // For large image data
    private byte[] imageData; // Stores the actual image bytes
}
