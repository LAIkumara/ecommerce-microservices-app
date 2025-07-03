import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
    productId: '',
    productName: '',
    productDescription: '',
    productPrice: '',
    forSale: 0,
    imageFile: null
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:8082/api/v1/getproducts')
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  };

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      axios.delete(`http://localhost:8082/api/v1/deleteproduct/${productId}`)
        .then(() => {
          alert("Product deleted successfully!");
          fetchProducts();
        })
        .catch(error => {
          console.error("Error deleting product:", error);
          alert("Error occurred. Check console.");
        });
    }
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(selectedProduct)], { type: "application/json" }));
    if (selectedProduct.imageFile) {
      formData.append("image", selectedProduct.imageFile);
    }

    try {
      await axios.put("http://localhost:8082/api/v1/updateproduct", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Product updated!");
      setShowUpdateModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddCheckboxChange = (e) => {
    setNewProduct({ ...newProduct, forSale: e.target.checked ? 1 : 0 });
  };

  const handleAddImageChange = (e) => {
    setNewProduct({ ...newProduct, imageFile: e.target.files[0] });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const { imageFile, ...productData } = newProduct;
    formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));
    if (imageFile) formData.append("image", imageFile);

    try {
      await axios.post("http://localhost:8082/api/v1/addproduct", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Product added!");
      setShowAddModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error adding:", error);
    }
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2 className="auth_topic">All Products</h2>
        <button className="add-product-button" onClick={() => setShowAddModal(true)}>+ Add Product</button>
      </div>

      <div className="product-grid">
        {products.map(product => (
          <div className="product-card hoverable" key={product.productId}>
            {product.imageData && (
              <img
                src={`data:${product.imageType};base64,${product.imageData}`}
                alt={product.productName}
                className="product-image"
              />
            )}
            <div className="product-details">
              <h3>{product.productName}</h3>
              <p>{product.productDescription}</p>
              <p><strong>Price:</strong> Rs. {product.productPrice}</p>
              <p className={product.forSale === 1 ? "status-available" : "status-unavailable"}>
                {product.forSale === 1 ? "Available for Sale" : "Not for Sale"}
              </p>
            </div>
            <div className="card-actions">
              <button onClick={() => handleUpdate(product)} className="btn-update">Update</button>
              <button onClick={() => handleDelete(product.productId)} className="btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Product</h3>
            <form onSubmit={handleAddSubmit}>
              <input type="number" name="productId" placeholder="Product ID" value={newProduct.productId} onChange={handleAddChange} required />
              <input type="text" name="productName" placeholder="Name" value={newProduct.productName} onChange={handleAddChange} required />
              <input type="text" name="productDescription" placeholder="Description" value={newProduct.productDescription} onChange={handleAddChange} required />
              <input type="number" name="productPrice" placeholder="Price" value={newProduct.productPrice} onChange={handleAddChange} required />
              <label>
                <input type="checkbox" checked={newProduct.forSale === 1} onChange={handleAddCheckboxChange} />
                Available for Sale
              </label>
              <input type="file" onChange={handleAddImageChange} required />
              <div className="modal-buttons">
                <button type="submit" className="btn-update">Add</button>
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal (same as before) */}
      {showUpdateModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Update Product</h3>
            <form onSubmit={handleUpdateSubmit}>
              <input type="text" name="productName" value={selectedProduct.productName} onChange={(e) => setSelectedProduct({ ...selectedProduct, productName: e.target.value })} required />
              <input type="text" name="productDescription" value={selectedProduct.productDescription} onChange={(e) => setSelectedProduct({ ...selectedProduct, productDescription: e.target.value })} required />
              <input type="number" name="productPrice" value={selectedProduct.productPrice} onChange={(e) => setSelectedProduct({ ...selectedProduct, productPrice: e.target.value })} required />
              <label>
                <input type="checkbox" checked={selectedProduct.forSale === 1} onChange={(e) => setSelectedProduct({ ...selectedProduct, forSale: e.target.checked ? 1 : 0 })} />
                Available for Sale
              </label>
              <input type="file" onChange={(e) => setSelectedProduct({ ...selectedProduct, imageFile: e.target.files[0] })} />
              <div className="modal-buttons">
                <button type="submit" className="btn-update">Update</button>
                <button type="button" className="btn-cancel" onClick={() => setShowUpdateModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
