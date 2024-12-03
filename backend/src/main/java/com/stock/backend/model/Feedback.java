package com.stock.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "feedback", schema = "stock_manage")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedbackid", nullable = false)
    private Integer feedbackId;

    @NotBlank(message = "Name is mandatory and cannot be blank.")
    @Column(name = "name", nullable = false)
    private String name;

    @NotBlank(message = "Email is mandatory and cannot be blank.")
    @Column(name = "email", nullable = false)
    private String email;

    @NotBlank(message = "Subject is mandatory and cannot be blank.")
    @Column(name = "subject", nullable = false)
    private String subject;

    @NotBlank(message = "Message is mandatory and cannot be blank.")
    @Column(name = "message", nullable = false)
    private String message;

    @NotBlank(message = "Status is mandatory and cannot be blank.")
    @Column(name = "status", nullable = false)
    private String status;
}

