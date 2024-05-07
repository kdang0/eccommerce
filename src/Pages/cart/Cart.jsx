import React, {useContext} from 'react'
import { CartItem } from './cart-item'
import {ShopContext} from "../../Context/shop-context.jsx"
import { Link } from 'react-router-dom';
import cart from './cart.module.css';
import {Toaster} from 'react-hot-toast'

export const Cart = () => {
  const {cartItems} = useContext(ShopContext);
  const totalCost = (cart) => {
    let total = 0;
    for(let i = 0; i<cart.length;i++){
      total += (cart[i].price * cart[i].quantity);
    }
    return total;
  }
  return (
    <div className={`${cart.cartContainer}`}>
      <div>
        <h1 className={`bayon-regular ${cart.title}`}>Cart Items: </h1>
        { 
          cartItems.length > 0 ?
        <div className={`${cart.itemContainer}`}>
          {
            cartItems?.map((product, i) => {
              return <CartItem product={product} key={i}/>
            })
          }
        </div> : 
        
        <span>
          
        empty cart
        </span>
            }
      </div>
      {
        cartItems.length !== 0 ? 
      <div>
        
        {
          cartItems?.map((product, i) => {
            const cost = product.price * product.quantity
            return <p className={`bayon-regular`}key={i}>{product.name}: ${cost}</p>
          })
        }
        <hr></hr>
        <p className={`bayon-regular ${cart.totalCost}`}>Total: ${totalCost(cartItems)}</p>
        <button className={`bayon-regular ${cart.button}`}><Link className={`${cart.link}`} to="/checkout">CHECKOUT</Link></button>
        <Toaster/>
      </div> : <span></span>
      }
    </div>
  )
}
