import React, {useContext, useRef} from 'react';
import './Navbar.css';
import {Link} from "react-router-dom";
import cart from "../Assets/cart_icon.png"
import {ShopContext} from "../../Context/shop-context.jsx";
// import { CSSTransition } from 'react-transition-group';

export const Navbar = () => {
  const {cartCounter} = useContext(ShopContext);
  // const [sample,setSample] = useState(false);
  const nodeRef = useRef(null);
  
  return (
    <div className='navbar'>
      <div className="shop-container">
        <Link to="/" className='shop bayon-regular'>SHOP</Link>
      </div>

       {/* will handle orders when implementing customers*/}
        {/* <Link to="/orders" className='shop bayon-regular'>ORDERS</Link> */}
        <div className={`image-container`}>
          <Link to="/cart"><img src={cart} alt="cart icon" className="cart"></img></Link>
        </div>
        {cartCounter > 0 ? 
          <p ref={nodeRef} id="counter" className='bayon-regular'>{cartCounter}</p>       
        : <span></span>}
    
    </div>
  )
}
