package com.example.product.service;

import com.example.product.dto.ProductDTO;
import com.example.product.model.Product;
import com.example.product.repo.ProductRepo;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Value("${image.upload.dir}")
    private String uploadDirectory;

    public List<ProductDTO> getAllProducts() {
        List<Product> productList = productRepo.findAll();
        return modelMapper.map(productList, new TypeToken<List<ProductDTO>>() {}.getType());
    }

    public ProductDTO getProductById(Integer productId) {
        Product product = productRepo.getProductById(productId);
        return modelMapper.map(product, ProductDTO.class);
    }

    public ProductDTO saveProduct(ProductDTO productDTO, MultipartFile imageFile) throws IOException {
        Product product = modelMapper.map(productDTO, Product.class);

        if (imageFile != null && !imageFile.isEmpty()) {
            // Handle image upload
            String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDirectory);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Save file to filesystem
            Files.copy(imageFile.getInputStream(), Paths.get(uploadDirectory, fileName));

            // Set image properties
            product.setImageName(fileName);
            product.setImageType(imageFile.getContentType());
            product.setImageData(imageFile.getBytes());
        }

        Product savedProduct = productRepo.save(product);
        return modelMapper.map(savedProduct, ProductDTO.class);
    }

    public ProductDTO updateProduct(ProductDTO productDTO, MultipartFile imageFile) throws IOException {
        // Get existing product
        Product existingProduct = productRepo.getProductById(productDTO.getProductId());

        if (imageFile != null && !imageFile.isEmpty()) {
            // Delete old image if exists
            if (existingProduct.getImageName() != null) {
                Files.deleteIfExists(Paths.get(uploadDirectory, existingProduct.getImageName()));
            }

            // Save new image
            String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
            Files.copy(imageFile.getInputStream(), Paths.get(uploadDirectory, fileName));

            // Update image properties
            existingProduct.setImageName(fileName);
            existingProduct.setImageType(imageFile.getContentType());
            existingProduct.setImageData(imageFile.getBytes());
        }

        // Update other product fields
        existingProduct.setProductName(productDTO.getProductName());
        existingProduct.setProductDescription(productDTO.getProductDescription());
        existingProduct.setProductPrice(productDTO.getProductPrice());
        existingProduct.setForSale(productDTO.getForSale());

        Product updatedProduct = productRepo.save(existingProduct);
        return modelMapper.map(updatedProduct, ProductDTO.class);
    }

    public String deleteProduct(Integer productId) {
        Product product = productRepo.getProductById(productId);
        if (product != null && product.getImageName() != null) {
            try {
                Files.deleteIfExists(Paths.get(uploadDirectory, product.getImageName()));
            } catch (IOException e) {
                System.err.println("Failed to delete image file: " + e.getMessage());
            }
        }
        productRepo.deleteById(productId);
        return "Product deleted successfully";
    }
}