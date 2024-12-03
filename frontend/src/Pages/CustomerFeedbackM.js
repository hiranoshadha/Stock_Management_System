import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import feedbackService from '../Services/feedbackService';

const CustomerFeedbackM = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // Fetch feedbacks on component mount
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

  const handleEdit = (feedback) => {
    setSelectedFeedback(feedback);
    setShowEditModal(true);
  };

  const handleDelete = (feedback) => {
    setSelectedFeedback(feedback);
    setShowDeleteModal(true);
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Use FormData to collect all inputs
    const formData = new FormData(e.target);
    
    const updatedFeedback = {
        feedbackId: selectedFeedback.feedbackId,
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        status: formData.get('status')
    };

    try {
        await feedbackService.updateFeedback(selectedFeedback.feedbackId, updatedFeedback);
        await loadFeedbacks();
        setShowEditModal(false);
        showAlert('Feedback updated successfully!', 'success');
    } catch (error) {
        showAlert('Error updating feedback', 'danger');
        console.error('Error updating feedback:', error);
    }
};

  const handleDeleteConfirm = async () => {
    try {
      await feedbackService.deleteFeedback(selectedFeedback.feedbackId);
      await loadFeedbacks();
      setShowDeleteModal(false);
      showAlert('Feedback deleted successfully!', 'success');
    } catch (error) {
      showAlert('Error deleting feedback', 'danger');
      console.error('Error deleting feedback:', error);
    }
  };

  {alert.show && (
    <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
      {alert.message}
      <button type="button" className="btn-close" onClick={() => setAlert({ show: false })}></button>
    </div>
  )}

  const filteredFeedbacks = searchTerm.length > 0 
    ? feedbacks.filter(feedback => {
        const searchValue = searchTerm.toLowerCase().trim();
        return feedback.name.toLowerCase().includes(searchValue) ||
               feedback.email.toLowerCase().includes(searchValue) ||
               feedback.subject.toLowerCase().includes(searchValue);
      })
    : feedbacks;
  const EditModal = () => (
    <div className={`modal ${showEditModal ? 'd-block backdrop-blur-sm bg-black/30' : ''}`} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-gray-100">
            <h5 className="modal-title font-bold text-xl">Edit Feedback</h5>
            <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label font-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control border rounded-lg p-2 w-full"
                    defaultValue={selectedFeedback?.name || ''}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control border rounded-lg p-2 w-full"
                    defaultValue={selectedFeedback?.email || ''}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label font-semibold">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control border rounded-lg p-2 w-full"
                  defaultValue={selectedFeedback?.subject || ''}
                />
              </div>

              <div className="form-group">
                <label className="form-label font-semibold">Message</label>
                <textarea
                  name="message"
                  className="form-control border rounded-lg p-2 w-full"
                  rows="3"
                  defaultValue={selectedFeedback?.message || ''}
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label font-semibold">Status</label>
                <select 
                  name="status"
                  className="form-select border rounded-lg p-2 w-full"
                  defaultValue={selectedFeedback?.status || ''}
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              <div className="modal-footer bg-gray-50 rounded-b-lg">
                <button 
                  type="button" 
                  className="btn btn-secondary hover:bg-gray-600"
                  onClick={() => setShowEditModal(false)}
                >
                  Close
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary bg-blue-600 hover:bg-blue-700"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const DeleteModal = () => (
    <div className={`modal ${showDeleteModal ? 'd-block backdrop-blur-sm bg-black/30' : ''}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Feedback</h5>
            <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete feedback from "{selectedFeedback?.name}"?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Customer Feedback Management</h2>
      {alert.show && (
    <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
      {alert.message}
      <button type="button" className="btn-close" onClick={() => setAlert({ show: false })}></button>
    </div>
  )}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-dark text-white">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
              autoFocus
            />
            {searchTerm && (
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => setSearchTerm('')}
              >
                Clear
              </button>
            )}
          </div>
          <div className="mt-2">
            <small className="text-muted me-2">
              Showing {filteredFeedbacks.length} of {feedbacks.length} feedbacks
            </small>
          </div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.map(feedback => (
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
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(feedback)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(feedback)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditModal />
      <DeleteModal />
    </div>
  );
};

export default CustomerFeedbackM;
