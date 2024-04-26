import React, {createContext, useState} from 'react';
import toast from 'react-hot-toast'
export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [cartCounter,setCartCounter] = useState(0);
    const [cartItems, setCartItems] = useState([])

    const addToCart = (event, item) => {
        //prevents user from entering display page when adding a product to cart
        if(event.target.id === 'addCart'){
            event.preventDefault();
        }
        //check if product item added is already in cart
        const itemPresent = isPresent(item,cartItems);
        //if item is present modify quantity of item in cart
        if(itemPresent){
            setCartItems(cartItems => {
                return cartItems.map(cartItem => {
                    if(cartItem.SK === item.SK){
                        return {...cartItem, quantity: cartItem.quantity + 1}
                    }
                    return cartItem;
                });
            });
        //add item to cart with quantity property value of 1 
        } else{
            item.quantity = 1;
            setCartItems((prev) => [...prev, item]);
        }

        //keep track of number of items in cart (badge)
        setCartCounter((prev) => (prev+1)); 
        //toast to notify user when adding item to cart
        toast.success('added to cart!', {
            position: "bottom-center",
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#F4F4F4',
            },
            iconTheme: {
                primary: '#F4F4F4',
                secondary: '#333',
            }
        }) 
    }

    //checks to see if item is in cart by comparing its ID when iterating through cart array
    const isPresent = (item, array) => {
        for(let i = 0; i<array.length; i++){
            if(array[i].SK === item.SK){
                return true;
            }
        }
        return false;
    }


    //removes item quantity 
    const removeFromCart = (item) => {
        item.quantity--;
        setCartItems(items => items.filter(item => item.quantity > 0));
        setCartCounter((prev) => (prev-1));
    }

    const updateCartItemCount = (amount, item) => {
        // console.log("CART",cartCounter);
        const prevAmount = item.quantity;
        amount = Math.max(0, amount);
        item.quantity = amount;
        setCartCounter((prev) => (prev-prevAmount+item.quantity));
        console.log("ITEM",item.quantity);
    }

    const contextValue = {updateCartItemCount, cartCounter, cartItems, addToCart, removeFromCart}

    console.log(cartItems.length);
  return (
  <ShopContext.Provider value= {contextValue}>
    {props.children}
    </ShopContext.Provider>
  );
};
