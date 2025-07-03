import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productId: '',
    productName: '',
    productDescription: '',
    productPrice: '',
    forSale: 0
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setProduct({ ...product, forSale: e.target.checked ? 1 : 0 });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.post("http://localhost:8082/api/v1/addproduct", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Product successfully added!");
      navigate("/products"); // ✅ Navigate to product list
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error occurred. Check console.");
    }
  };

  return (
    <div className="add-product-container">
      <p className="auth_topic">Add Product</p>
      <form onSubmit={handleSubmit} className="form_container">
        <div className="form-group">
          <label htmlFor="productId">Product ID:</label>
          <input type="number" id="productId" name="productId" value={product.productId} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="productName">Product Name:</label>
          <input type="text" id="productName" name="productName" value={product.productName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="productDescription">Product Description:</label>
          <input type="text" id="productDescription" name="productDescription" value={product.productDescription} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="productPrice">Product Price:</label>
          <input type="number" id="productPrice" name="productPrice" value={product.productPrice} onChange={handleChange} required />
        </div>

        <div className="form-group checkbox-group">
          <input type="checkbox" id="forSale" checked={product.forSale === 1} onChange={handleCheckboxChange} />
          <label htmlFor="forSale">Available for Sale</label>
        </div>

        <div className="form-group">
          <label htmlFor="productImages">Product Image:</label>
          <input type="file" id="productImages" name="productImages" accept="image/*" onChange={handleImageChange} required />
        </div>

        <button type="submit" className="submit-button">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
