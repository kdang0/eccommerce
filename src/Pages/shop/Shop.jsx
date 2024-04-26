import React from 'react'
import { ProductCatalog } from '../../Components/ProductCatalog/ProductCatalog.jsx'
import './Shop.css'
import {useSpring, animated} from 'react-spring'
import {Toaster} from 'react-hot-toast';
export const Shop = () => {
  const drop = useSpring({ 
    from: { y:-100, opacity:0 },
    to: { y:0, opacity:1 },
    config: { friction:10, tension:200 } 
  });
  return (
    <div>
      <animated.div style={drop}>
        <h1 className='bayon-regular sumthing-title'>SUMTHING</h1>
        <ProductCatalog/>
      </animated.div>
      
    </div>
  )
}
