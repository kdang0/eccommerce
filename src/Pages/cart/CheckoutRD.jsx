import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {ShopContext} from "../../Context/shop-context.jsx"
import {TailSpin} from 'react-loader-spinner'
import '../../global-styling/index.css'
export const CheckoutRD = () => {
  const [sessionID, setSessionID] = useState('');
  const navigate = useNavigate();
  const {cartItems} = useContext(ShopContext);
  useEffect(() => {
    const fetchSessionToken = async () => {
      const response = await fetch("https://nsxhuu5eva.execute-api.us-east-1.amazonaws.com/prod/create-payment-intent", {    
      method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cartItems }),
        });
      const data = await response.json();
      console.log("DATA", data);
      setSessionID(data.clientSecret);
    }
    fetchSessionToken();
    if(!!sessionID){
      navigate(`/checkout/${sessionID}`);
    }
  
}, [navigate ,sessionID, cartItems]);

if(sessionID === ''){
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
    <div>CheckoutRD</div>
  )
}
