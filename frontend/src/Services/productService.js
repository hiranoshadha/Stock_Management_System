import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Get all products
const getAllProducts = async () => {
    const response = await axios.get(`${API_URL}/product`);
    return response.data;
};

// Get a single product by ID
const getProductById = async (id) => {
    const response = await axios.get(`${API_URL}/product/${id}`);
    return response.data;
};

// Create a new product
const createProduct = async (productData) => {
    const formData = new FormData();

    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("stock", productData.stock);

    if (productData.image) {
        formData.append("image", productData.image);
    }

    try {
        const response = await axios.post(`${API_URL}/product`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

// Update a product by ID
const updateProduct = async (id, productData) => {

    const formData = new FormData();

    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("stock", productData.stock);
    if (productData.image) {
        formData.append("image", productData.image);
    }

    console.log(productData);

    try {
        const response = await axios.put(`${API_URL}/product/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

// Delete a product by ID
const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/product/${id}`);
    return response.data;
};

// Get products by category
const getProductsByCategory = async (category) => {
    const response = await axios.get(`${API_URL}/product/category/${category}`);
    return response.data;
};


const productService = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
};

export default productService;
