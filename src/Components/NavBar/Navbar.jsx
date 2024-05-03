import React, {useContext, useState, useEffect} from 'react';
import './Navbar.css';
import {Link} from "react-router-dom";
import { HamburgerMenu } from '../HamburgerMenu/HamburgerMenu.jsx';
import cart from "../Assets/cart_icon.png"
import {ShopContext} from "../../Context/shop-context.jsx";
// import { CSSTransition } from 'react-transition-group';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches)
  
  useEffect(() => {
    const media = window.matchMedia(query);
    if(media.matches !== matches){
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches,query]
);

return matches;
}


export const Navbar = () => {
  const {cartCounter} = useContext(ShopContext);
  // const [sample,setSample] = useState(false);
  const isMobile = useMediaQuery("(max-width:428px)");

  return (
//     <div>
//       { isMobile ? 
//         <div className="navbar">
//             <HamburgerMenu/>
//         </div>
      
//     :    
//     <div className='navbar'>
//       <div className="shop-container">
//         <Link to="/" className='shop bayon-regular'>SHOP</Link>
//       </div>

//        {/* will handle orders when implementing customers*/}
//         {/* <Link to="/orders" className='shop bayon-regular'>ORDERS</Link> */}
//         <div className={`image-container`}>
//           <Link to="/cart"><img src={cart} alt="cart icon" className="cart"></img></Link>
//         </div>
//         {cartCounter > 0 ? 
//           <p id="counter" className='bayon-regular'>{cartCounter}</p>       
//         : <span></span>}
    
//     </div>
// }
//     </div>

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
          <p id="counter" className='bayon-regular'>{cartCounter}</p>       
        : <span></span>}
    
    </div>
  )
}
