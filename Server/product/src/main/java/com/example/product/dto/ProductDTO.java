package com.example.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ProductDTO {
    private int productId;
    private String productName;
    private String productDescription;
    private int productPrice;
    private int forSale;

    // For file upload
    private MultipartFile imageFile;

    // For response
    private String imageName;
    private String imageType;
    private byte[] imageData;
}
