import './App.css';
import Login from './Auth/Login';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Auth/Register';
import AddProduct from './Products/AddProduct';
import ProductList from './Products/ProductList';
import Layout from './Common/Layout';
import AdminProduct from './Products/AdminProduct';
import DeleteProduct from './Products/DeleteProduct';
import BaskerList from './Basket/BaskerList';
import Logout from './Common/Logout';
function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />} >
                <Route index element={<ProductList />} />
                <Route path='/products' element={<ProductList />} />
                <Route path='/product/add' element={<AddProduct />} />
                <Route path='/product/delete' element={<DeleteProduct />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/AdminProduct' element={<AdminProduct />} />
                <Route path='/baskets' element={<BaskerList />} />
                <Route path='/logout' element={<Logout />} />
              </Route>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
}

export default App;
