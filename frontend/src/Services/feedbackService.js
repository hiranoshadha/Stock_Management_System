import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Get all feedback
const getAllFeedback = async () => {
  const response = await axios.get(`${API_URL}/feedback`);
  return response.data;
};

// Get a single feedback by ID
const getFeedbackById = async (id) => {
  const response = await axios.get(`${API_URL}/feedback/${id}`);
  return response.data;
};

// Create a new feedback
const createFeedback = async (feedbackData) => {
  const response = await axios.post(`${API_URL}/feedback`, feedbackData);
  return response.data;
};

// Update a feedback by ID
const updateFeedback = async (id, feedbackData) => {
  const response = await axios.put(`${API_URL}/feedback/${id}`, feedbackData);
  return response.data;
};

// Delete a feedback by ID
const deleteFeedback = async (id) => {
  const response = await axios.delete(`${API_URL}/feedback/${id}`);
  return response.data;
};

// Get feedback by email
const getFeedbackByEmail = async (email) => {
  const response = await axios.get(`${API_URL}/feedback/email/${email}`);
  return response.data;
};



const feedbackService = {
  getAllFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackByEmail
};

export default feedbackService;
