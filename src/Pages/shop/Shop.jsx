import React from 'react'
import { ProductCatalog } from '../../Components/ProductCatalog/ProductCatalog.jsx'
import './Shop.css'
import {useSpring, animated} from 'react-spring'
import toast from 'react-hot-toast'
export const Shop = () => {
  const drop = useSpring({ 
    from: { y:-100, opacity:0 },
    to: { y:0, opacity:1 },
    config: { friction:10, tension:200 } 
  });
  

  window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('redirect_status');
    if(status === "succeeded"){
      toast.success('payment successful!', {
        position: "top-center",
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#F4F4F4',
        },
        iconTheme: {
            primary: '#77DD77',
            secondary: '#333',
        }
    })
    }

  }
  
  return (
    <div>
      <animated.div style={drop}>
        <h1 className='bayon-regular sumthing-title'>SUMTHING</h1>
        <ProductCatalog/>
      </animated.div>
      
    </div>
  )
}
