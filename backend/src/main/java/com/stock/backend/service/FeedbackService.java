package com.stock.backend.service;

import com.stock.backend.model.Feedback;
import com.stock.backend.repository.FeedbackRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Log4j2
@Service
@Transactional
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public Feedback getFeedbackById(Integer id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Feedback not found with id: " + id));
    }

    public Feedback getFeedbackByEmail(String email) {
        return feedbackRepository.findFeedbackByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Feedback not found with Email: " + email));
    }

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    public Feedback updateFeedback(Integer id, Feedback feedback) {
        Feedback existingFeedback = getFeedbackById(id);
        existingFeedback.setName(feedback.getName());
        existingFeedback.setEmail(feedback.getEmail());
        existingFeedback.setSubject(feedback.getSubject());
        existingFeedback.setMessage(feedback.getMessage());
        existingFeedback.setStatus(feedback.getStatus());
        return feedbackRepository.save(existingFeedback);
    }

    public void deleteFeedback(Integer id) {
        Feedback feedback = getFeedbackById(id);
        feedbackRepository.delete(feedback);
    }

}
