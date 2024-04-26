import React, {useContext} from 'react'
import { ShopContext } from '../../Context/shop-context';

import item from './item.module.css'
export const CartItem = (props) => {
    const {product} = props;
    const {addToCart, removeFromCart, updateCartItemCount} = useContext(ShopContext);
    return (
        <div className={`${item.itemContainer}`}>
            <img src={product.imgSrc} className={`${item.cartImg}`}alt='cart-item'></img>
            <div>
            <p className={`bayon-regular ${item.name}`}>{product.name}</p>
            <p className={`bayon-regular ${item.price}`}>${product.price}</p>
            <div className={`${item.inputContainer}`}>
                <button className={`bayon-regular ${item.adjust}`} onClick={() => removeFromCart(product)}>-</button>
                <input className={`bayon-regular ${item.input}`} value={product.quantity} onChange={(e)=>(updateCartItemCount(Number(e.target.value), product))}/>
                <button className={`bayon-regular ${item.adjust}`} onClick={(e)=> addToCart(e,product)}>+</button>
            </div>
            </div>
        </div>
  )
}
