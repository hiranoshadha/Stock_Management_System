import React, {useState, useEffect, useRef} from 'react';
import {Routes, Route, useNavigate } from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';
import productService from '../Services/productService';

const ProductM = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState({text: '', type: ''});

    const navigate = useNavigate();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await productService.getAllProducts();
            console.log(data)
            setProducts(data);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    };

    const handleEdit = async (product) => {
        try {
            const productData = await productService.getProductById(product.id);
            console.log(productData)
            setSelectedProduct(productData);
            setShowEditModal(true);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleDelete = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await productService.deleteProduct(selectedProduct.id);
            await loadProducts();
            setShowDeleteModal(false);
            setMessage({text: 'Product deleted successfully!', type: 'success'});
            setTimeout(() => setMessage({text: '', type: ''}), 3000);
        } catch (error) {
            setMessage({text: 'Error deleting product', type: 'error'});
            console.error('Error deleting product:', error);
        }
    };

    const handleAddProduct = async (productData) => {
        try {
            await productService.createProduct(productData);
            await loadProducts();
            setMessage({text: 'Product added successfully!', type: 'success'});
            setTimeout(() => setMessage({text: '', type: ''}), 3000);
        } catch (error) {
            setMessage({text: 'Error creating product', type: 'error'});
            console.error('Error creating product:', error);
        }
    };

    {
        message.text && (
            <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} mt-3`}>
                {message.text}
            </div>
        )
    }

    const filteredProducts = searchTerm.length > 0
        ? products.filter(product => {
            const searchValue = searchTerm.toLowerCase().trim();
            const productName = product.name.toLowerCase();
            const productCategory = product.category.toLowerCase();
            const productDescription = product.description.toLowerCase();

            return productName.includes(searchValue) ||
                productCategory.includes(searchValue) ||
                productDescription.includes(searchValue);
        })
        : products;

    const EditModal = () => {
        const fileInputRef = useRef(null);

        const handleUpdate = async (e) => {
            e.preventDefault();

            // Use FormData to collect all inputs
            const formData = new FormData(e.target);
            const updatedProduct = {
                id: selectedProduct.id,
                name: formData.get('name'),
                price: formData.get('price'),
                description: formData.get('description'),
                category: formData.get('category'),
                stock: formData.get('stock'),
                image: selectedProduct.image,
            };

            // Check if a new image file was uploaded
            const file = fileInputRef.current?.files[0];
            console.log(file)
            if (file) {
                const updatedProduct = {
                    id: selectedProduct.id,
                    name: formData.get('name'),
                    price: formData.get('price'),
                    description: formData.get('description'),
                    category: formData.get('category'),
                    stock: formData.get('stock'),
                    image: formData.get('image'),
                };
                await submitUpdate(updatedProduct);
            } else {
                await submitUpdate(updatedProduct);
            }
        };

        const submitUpdate = async (updatedProduct) => {
            try {
                await productService.updateProduct(updatedProduct.id, updatedProduct);
                await loadProducts();
                setShowEditModal(false);
                setMessage({text: 'Product updated successfully!', type: 'success'});
                setTimeout(() => setMessage({text: '', type: ''}), 3000);
                navigate(0);
            } catch (error) {
                setMessage({text: 'Error updating product', type: 'error'});
                console.error('Error updating product:', error);
            }
        };

        const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSelectedProduct({...selectedProduct, image: reader.result});
                };
                reader.readAsDataURL(file);
            }
        };

        return (
            <div className={`modal ${showEditModal ? 'd-block backdrop-blur-sm bg-black/30' : ''}`} tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-gray-100">
                            <h5 className="modal-title font-bold text-xl">Edit Product</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowEditModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body p-4">
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-group">
                                        <label className="form-label font-semibold">Product Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control border rounded-lg p-2 w-full"
                                            defaultValue={selectedProduct?.name || ''}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label font-semibold">Price</label>
                                        <input
                                            type="text"
                                            name="price"
                                            className="form-control border rounded-lg p-2 w-full"
                                            defaultValue={selectedProduct?.price || ''}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label font-semibold">Description</label>
                                    <textarea
                                        name="description"
                                        className="form-control border rounded-lg p-2 w-full"
                                        rows="3"
                                        defaultValue={selectedProduct?.description || ''}
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-group">
                                        <label className="form-label font-semibold">Category</label>
                                        <select
                                            name="category"
                                            className="form-select border rounded-lg p-2 w-full"
                                            defaultValue={selectedProduct?.category || ''}
                                        >
                                            <option value="bedding">Bedding</option>
                                            <option value="bed-linen">Bed Linen</option>
                                            <option value="bath-linen">Bath Linen</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label font-semibold">Stock</label>
                                        <input
                                            type="number"
                                            name="stock"
                                            className="form-control border rounded-lg p-2 w-full"
                                            defaultValue={selectedProduct?.stock || ''}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label font-semibold">Product Image</label>
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={fileInputRef.current?.files[0]}
                                            alt="Product preview"
                                            className="w-24 h-24 object-cover rounded-lg border"
                                        />
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                name="image"
                                                ref={fileInputRef}
                                                className="form-control"
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>
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
    };


    const DeleteModal = () => (
        <div className={`modal ${showDeleteModal ? 'd-block backdrop-blur-sm bg-black/30' : ''}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Product</h5>
                        <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete "{selectedProduct?.name}"?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                onClick={() => setShowDeleteModal(false)}>Cancel
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );

    const ProductAdd = () => (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            {message.text && (
                <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} mt-3`}>
                    {message.text}
                </div>
            )}
            <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const productData = {
                    name: formData.get('name'),
                    description: formData.get('description'),
                    price: formData.get('price'),
                    category: formData.get('category'),
                    stock: formData.get('stock'),
                    image: formData.get('image')
                };
                await handleAddProduct(productData);
                e.target.reset();
            }}>
                <div className="form-group">
                    <label className="form-label">Product Name</label>
                    <input type="text" name="name" className="form-control" required/>
                </div>
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea name="description" className="form-control" rows="3" required></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-group">
                        <label className="form-label">Price</label>
                        <input type="number" name="price" className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            className="form-control"
                            min="0"
                            placeholder="Enter stock quantity"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Category</label>
                        <select name="category" className="form-control">
                            <option value="bedding">Bedding</option>
                            <option value="bed-linen">Bed Linen</option>
                            <option value="bath-linen">Bath Linen</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Product Image</label>
                    <input type="file" name="image" className="form-control" accept="image/*" required/>
                </div>
                <button type="submit" className="btn btn-dark mt-4">Add Product</button>
            </form>
        </div>
    );


    const ProductManagement = () => (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Product Management</h2>
            {message.text && (
                <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} mt-3`}>
                    {message.text}
                </div>
            )}
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="input-group">
            <span className="input-group-text bg-dark text-white">
              <FaSearch/>
            </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name, category, or description..."
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
                            Showing {filteredProducts.length} of {products.length} products
                        </small>
                        <small className="text-muted">
                            Filter by: Name, Category, Description
                        </small>
                    </div>
                </div>
            </div>

            <table className="table">
                <thead>
                <tr>
                    <th>Image</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(filteredProducts) && filteredProducts.map(product => (
                    <tr key={product.id}>
                        <td>
                            <img
                                src={product.imgurl}
                                alt={product.name}
                                className="rounded"
                                style={{width: '50px', height: '50px', objectFit: 'cover'}}
                            />
                        </td>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(product)}>Edit
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product)}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <EditModal/>
            <DeleteModal/>
        </div>
    );

    const ProductDetails = () => (
        <div className="bg-white p-6 rounded-lg shadow" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {products.map(product => (
                    <div className="col" key={product.id}>
                        <div className="card h-100">
                            <img
                                src={product.imgurl}
                                className="card-img-top"
                                alt={product.name}
                                style={{height: '200px', objectFit: 'cover'}}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">
                                    <small className="text-muted">
                                        Stock: {product.stock} units
                                    </small>
                                </p>
                                <p className="card-text fw-bold">{product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <Routes>
            <Route path="add" element={<ProductAdd/>}/>
            <Route path="manage" element={<ProductManagement/>}/>
            <Route path="details" element={<ProductDetails/>}/>
        </Routes>
    );
};

export default ProductM;