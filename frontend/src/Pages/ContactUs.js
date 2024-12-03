import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import feedbackService from '../Services/feedbackService';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const feedbackData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      status: 'New'
    };

    try {
      const response = await feedbackService.createFeedback(feedbackData);
      // Clear form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
      alert('Feedback submitted successfully!');
    } catch (error) {
      alert('Error submitting feedback. Please try again.');
    }
  };
  
  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Get in Touch</h1>
        <p className="lead text-muted">We'd love to hear from you</p>
      </div>

      <div className="row">
        {/* Contact Information */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 bg-dark text-white p-4">
            <h3 className="mb-4">Contact Information</h3>
            
            <div className="d-flex align-items-center mb-3">
              <FaPhone className="me-3" />
              <div>
                <h6 className="mb-0">Phone</h6>
                <p className="mb-0">+94 11 234 5678</p>
              </div>
            </div>

            <div className="d-flex align-items-center mb-3">
              <FaEnvelope className="me-3" />
              <div>
                <h6 className="mb-0">Email</h6>
                <p className="mb-0">info@splendourlux.com</p>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <FaMapMarkerAlt className="me-3" />
              <div>
                <h6 className="mb-0">Address</h6>
                <p className="mb-0">123 Luxury Lane, Colombo 03, Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>

        {/* Updated Feedback Form */}
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="mb-4">Send us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-dark">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-5">
        <div className="ratio ratio-21x9">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467128558!2d79.84821631477235!3d6.927076994992611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2591614a33361%3A0x8d8a7adb9abf5bf3!2sColombo%2003%2C%20Colombo!5e0!3m2!1sen!2slk!4v1625471415251!5m2!1sen!2slk" 
            className="border-0 shadow-sm rounded"
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;