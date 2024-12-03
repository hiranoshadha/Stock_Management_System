package com.stock.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "product", schema = "stock_manage")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productid", nullable = false)
    private Integer productId;

    @NotBlank(message = "Product name is mandatory and cannot be blank.")
    @Column(name = "name", nullable = false)
    private String name;

    @NotBlank(message = "Category is mandatory and cannot be blank.")
    @Column(name = "category", nullable = false)
    private String category;

    @NotBlank(message = "Description is mandatory and cannot be blank.")
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull(message = "Price is mandatory and cannot be null.")
    @PositiveOrZero(message = "Price must be zero or a positive value.")
    @Column(name = "price", nullable = false)
    private double price;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @NotNull(message = "Stock is mandatory and cannot be null.")
    @PositiveOrZero(message = "Stock must be zero or a positive value.")
    @Column(name = "stock", nullable = false)
    private int stock;
}

