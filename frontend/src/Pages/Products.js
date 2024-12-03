import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import productService from '../Services/productService';

const Productspage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);  // Initialize with empty array

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadProducts = async () => {
    try {
      let data;
      if (selectedCategory === 'all') {
        data = await productService.getAllProducts();
      } else {
        data = await productService.getProductsByCategory(selectedCategory);
      }
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col text-center">
          <button 
            className={`btn ${selectedCategory === 'all' ? 'btn-dark' : 'btn-outline-dark'} me-2`}
            onClick={() => setSelectedCategory('all')}
          >
            ALL PRODUCTS
          </button>
          <button 
            className={`btn ${selectedCategory === 'bedding' ? 'btn-dark' : 'btn-outline-dark'} me-2`}
            onClick={() => setSelectedCategory('bedding')}
          >
            BEDDING
          </button>
          <button 
            className={`btn ${selectedCategory === 'bed-linen' ? 'btn-dark' : 'btn-outline-dark'} me-2`}
            onClick={() => setSelectedCategory('bed-linen')}
          >
            BED LINEN
          </button>
          <button 
            className={`btn ${selectedCategory === 'bath-linen' ? 'btn-dark' : 'btn-outline-dark'} me-2`}
            onClick={() => setSelectedCategory('bath-linen')}
          >
            BATH LINEN
          </button>
        </div>
      </div>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {Array.isArray(products) && products.map((product) => (
            <div className="col" key={product.id}>
              <div className="card h-100 shadow">
                <img
                  src={product.imgurl}
                  className="card-img-top" 
                  alt={product.name}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text fw-bold">{product.price}</p>
                  <button className="btn btn-dark mt-auto">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Productspage;
