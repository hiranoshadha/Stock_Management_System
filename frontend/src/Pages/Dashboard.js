import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('product');
  const navigate = useNavigate();

  const roles = {
    product: "Product Manager",
    feedback: "Feedback Manager",
  };

  const menuItems = {
    product: [
      { name: 'Product Add', path: 'product/add' },
      { name: 'Product Update/Delete', path: 'product/manage' },
      { name: 'Product Details', path: 'product/details' },
    ],
    feedback: [
      { name: 'Feedbacks', path: 'feedback/list' },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Role Selection Buttons */}
      <div className="bg-dark p-3 text-center">
        <div className="btn-group mb-4">
          <button 
            className={`btn ${userRole === 'product' ? 'btn-light' : 'btn-outline-light'}`}
            onClick={() => setUserRole('product')}
          >
            Product Manager
          </button>
          <button 
            className={`btn ${userRole === 'feedback' ? 'btn-light' : 'btn-outline-light'}`}
            onClick={() => setUserRole('feedback')}
          >
            Feedback Manager
          </button>
        </div>
      

      {/* Left Sidebar */}
      <div className="w-64 bg-dark text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">{roles[userRole]}</h2>
          <nav>
            {menuItems[userRole]?.map((item, index) => (
              <div
                key={index}
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 mb-1 cursor-pointer"
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </div>
            ))}
          </nav>
        </div>
      </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;