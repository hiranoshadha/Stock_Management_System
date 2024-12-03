package com.stock.backend.repository;

import com.stock.backend.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback,Integer> {
    Optional<Feedback> findFeedbackByEmail(String email);
}
