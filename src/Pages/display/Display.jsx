import React, {useState, useEffect,useContext} from 'react'
import { grabProduct } from '../../api/crud'
import { useParams } from 'react-router-dom'
import display from './display.module.css'
import {ShopContext} from "../../Context/shop-context.jsx";
import {TailSpin} from 'react-loader-spinner'
import '../../global-styling/index.css'
import {useSpring, animated, useChain, useSpringRef} from 'react-spring'
export const Display = () => {
    const {addToCart} = useContext(ShopContext);
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const grabImage = (imageKey) =>{
        const url = `https://d2e64dv9223u3l.cloudfront.net/${encodeURIComponent(imageKey)}`;
        // setProduct(product => {return {...product, imgSrc:url}}); 
        return url;
      }
    const springRef = useSpringRef();
    const propsImage = useSpring({
        ref:springRef,
        from:{y:-100, opacity:0},
        to:{y:0, opacity:1},
        config:{ tension: 120, friction: 14 }
    });

    const springRef1 = useSpringRef();
    const propsName = useSpring({
        ref:springRef1,
        from:{y:-100, opacity:0},
        to: {y:0, opacity:1},
        config: {friction:10, tension:200}
    })
    useChain([springRef, springRef1], [0,0.3]);
    useEffect(() => {
        async function displayProduct(){
            const result = await grabProduct(id);
            const product = result.data.getProduct;
            const imgUrl = grabImage(product.imageMetaData);
            product.imgSrc = imgUrl;
            setProduct(product);
        }
        displayProduct();
    }, [id]);


   if(!product){
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
    <div className={`${display.productContainer}`}>
        <animated.div style={propsImage}>
        <img className={`${display.image}`}src={product.imgSrc} alt='product'></img>
        </animated.div>
        <animated.div className={`${display.infContainer}`}style={propsName}>
        <h1 className={`bayon-regular ${display.title}`}>{product.name}</h1>
        <p className={`bayon-regular ${display.price}`}>${product.price}</p>
        <div className={`${display.descContainer}`}>
        <p className={`${display.description}`}>{product.description}</p>
        </div>
        <button className={`bayon-regular ${display.button}`} onClick={(e) => addToCart(e, product)}>add to cart</button>
        </animated.div>

    </div>
  )
}
