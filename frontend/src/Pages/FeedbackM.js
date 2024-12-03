import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';
import feedbackService from '../Services/feedbackService';

const FeedbackM = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      const data = await feedbackService.getAllFeedback();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error loading feedbacks:', error);
    }
  };

  const CustomerFeedback = () => (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Customer Feedback Management</h1>
        <p className="lead text-muted">View and manage customer feedback</p>
      </div>

      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="mb-4">
                <FaEnvelope className="me-2" />
                Customer Messages
              </h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map(feedback => (
                    <tr key={feedback.id}>
                      <td>{feedback.name}</td>
                      <td>{feedback.email}</td>
                      <td>{feedback.subject}</td>
                      <td>{feedback.message}</td>
                      <td>
                        <span className={`badge ${
                          feedback.status === 'New' ? 'bg-primary' :
                          feedback.status === 'In Progress' ? 'bg-warning' :
                          'bg-success'
                        }`}>
                          {feedback.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="list" element={<CustomerFeedback />} />
    </Routes>
  );
};

export default FeedbackM;
