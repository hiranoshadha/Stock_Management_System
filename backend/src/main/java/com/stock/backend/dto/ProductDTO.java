package com.stock.backend.dto;

import com.stock.backend.model.Product;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Base64;

@Data
@NoArgsConstructor
public class ProductDTO {
    private int id;
    private String name;
    private String description;
    private double price;
    private String category;
    private int stock;
    private String imgurl;

    public static ProductDTO ProductToDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();

        productDTO.setId(product.getProductId());
        productDTO.setName(product.getName());
        productDTO.setDescription(product.getDescription());
        productDTO.setPrice(product.getPrice());
        productDTO.setStock(product.getStock());
        productDTO.setCategory(product.getCategory());
        productDTO.setImgurl("http://localhost:8080/api/product/image/" + product.getProductId());
        return productDTO;
    }

}
