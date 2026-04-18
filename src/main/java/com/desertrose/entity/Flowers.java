package com.desertrose.entity;


import jakarta.persistence.*;
import lombok.Data;
import org.springframework.ai.moderation.Categories;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "flowers")
public class Flowers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flower_id")
    private Long flowerId;

    @Column(name = "flower_name", nullable = false, length = 150, unique = true)
    private String flowerName;

    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private Double price;

    @Column(name = "stock", nullable = false)
    private Integer stock = 0;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    @Column(name = "description", columnDefinition = "NVARCHAR(MAX)")
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

}
