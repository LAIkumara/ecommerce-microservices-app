import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './components/Home/Home';
import Addproduct from './components/Product/AddProduct';
import ProductList from './components/Product/ProductList';
function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
