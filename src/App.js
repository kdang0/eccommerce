import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import './App.css';
import {Navbar} from "./Components/NavBar/Navbar" 
import {Shop} from "./Pages/shop/Shop"
import {Cart} from "./Pages/cart/Cart"
import {Orders} from "./Pages/orders/Orders"
import {Admin} from "./Pages/admin/Admin"
import {Display} from "./Pages/display/Display"
import {Checkout} from "./Pages/checkout/Checkout"
import { CheckoutRD } from "./Pages/cart/CheckoutRD";
import { ShopContextProvider } from "./Context/shop-context";
import { LoginPage } from './Pages/LoginPage/loginPage.jsx';
import {SetNP} from './Pages/LoginPage/SetNP.jsx'
import {Amplify} from 'aws-amplify'
import config from './aws-exports.js'
import {Toaster} from 'react-hot-toast';
Amplify.configure(config);
function App() {
  const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    return !!accessToken;
  }

  const isSession = () => {
    const session = sessionStorage.getItem('session');
    return !!session;
  }

  return (
    <div className="App">
      <ShopContextProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Shop/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          {/* <Route path="/orders"element={<Orders/>}></Route> */}
          <Route path="/admin" element={ isAuthenticated() ? <Admin/>:<Navigate replace to="/login"/>}></Route>
          <Route path="/display/:id" element={<Display/>}></Route>
          <Route path="/login" element={ isSession()?<SetNP/>:<LoginPage/>}></Route>
          <Route path='/checkout' element={<Checkout/>}></Route>
          <Route path='/checkout/:id' element={<Checkout/>}></Route>
        </Routes>
      </Router>
      <Toaster/>
      </ShopContextProvider>
    </div>
  );
}

export default App;
