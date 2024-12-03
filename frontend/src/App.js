import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductPage from './Pages/Products';
import Dashboard from './Pages/Dashboard';
import ProductM from './Pages/ProductM';
import FeedbackM from './Pages/FeedbackM';
import Navbar from './Components/navbar';
import ContactUs from './Pages/ContactUs';
import CustomerFeedbackM from './Pages/CustomerFeedbackM';


const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/cfeedbackM" element={<CustomerFeedbackM />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="product/*" element={<ProductM />} />
              <Route path="feedback/*" element={<FeedbackM />} />
        </Route>
          </Routes>
        </main>
        
      </div>
    </Router>
  );
};

export default App;