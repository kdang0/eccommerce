import React, {useState, useEffect, useContext} from 'react';
import CheckoutForm from '../../Components/CheckoutForm/CheckoutForm'
import {useNavigate} from "react-router-dom";
import {ShopContext} from "../../Context/shop-context.jsx"
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {TailSpin} from 'react-loader-spinner'
import { v4 as uuid } from "uuid";
const stripePromise = loadStripe(process.env.REACT_APP_PK_STRIPE);
export const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const {cartItems} = useContext(ShopContext);
  const history = useNavigate();
  const unique_id = uuid();
  useEffect(() => {
    const fetchSessionToken = async () => {
      try{
        const response = await fetch("https://nsxhuu5eva.execute-api.us-east-1.amazonaws.com/prod/create-payment-intent", {    
        method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cartItems }),
          });
        const data = await response.json();
        console.log("DATA", data);
        setClientSecret(data.clientSecret);
        history(`/checkout/${unique_id}`);
      } catch(error){
        console.error('Failed to fetch data: ',  error);
      }
      
    }
    fetchSessionToken();
  }, []);
  
  
    
    const appearance = {
        theme: 'night',
      };
      const options = {
        clientSecret,
        appearance,
      };


if(!!!clientSecret){
  return(
    <div className='flex'>
    <TailSpin
    visible={true}
    height="80"
    width="80"
    color="#323232"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    />
</div>
  )
} 
    return (
    <Elements options={options} stripe={stripePromise}>
            <CheckoutForm/>
    </Elements>
  )
}