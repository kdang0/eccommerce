import React, {useState, useEffect, useContext} from 'react'
import { Hub } from 'aws-amplify/utils';
import {client} from '../../api/crud.js'
import { allProduct } from '../../graphql/queries.js';
import { CONNECTION_STATE_CHANGE } from 'aws-amplify/api'
import { Link } from 'react-router-dom';
import * as subscriptions from '../../graphql/subscriptions.js';
import {ShopContext} from "../../Context/shop-context.jsx";
import add from "../Assets/add_cart.png"

import './ProductCatalog.css'
export const ProductCatalog = () => {
    const [products, setProducts] = useState([]);
    const bucketName = 'test-bucket-ecc-one';
    const {addToCart} = useContext(ShopContext);
  
    useEffect(() => {
        async function fetchData(){
          const result = await client.graphql({query:allProduct,
              variables: {
                PK:"PRODUCT"
              }});
          setProducts(result.data.allProduct.products);
        }
  
        fetchData();
        const addProducts = client
        .graphql({query:subscriptions.onAddProduct})
        .subscribe({
          next:({data}) => {
            setProducts((prev) => [data.onAddProduct,...prev]);
          },
          error:(error) => console.warn(error)
        });
  
        const deleteProducts = client
        .graphql({query:subscriptions.onDeleteProduct})
        .subscribe({
          next:({data}) => {
            setProducts(products => products.filter(item=>item.SK !== data.onDeleteProduct.SK));
          },
          error:(error) => console.warn(error)
        });
  
        const updateProducts = client
        .graphql({query:subscriptions.onUpdateProduct})
        .subscribe({
          next:({data}) => {
            setProducts(products => products?.map(item => {
              if(item.SK === data.onUpdateProduct.SK){
                return {...data.onUpdateProduct, isEditing:false};
              }
              return item;
            }))
          }
        })
  
  
        return () => {
          addProducts.unsubscribe();
          deleteProducts.unsubscribe();
          updateProducts.unsubscribe();
        }
      },[]);
  
  
      Hub.listen('api', (data) => {
        const { payload } = data;
        if (payload.event === CONNECTION_STATE_CHANGE) {
          const connectionState = payload.data.connectionState;
          console.log(connectionState);
        }
      });

      const grabImage = (bucketName, imageKey) =>{
        const region = 'us-east-1';
        const url = `https://${bucketName}.s3.${region}.amazonaws.com/${encodeURIComponent(imageKey)}`;
        return url;
      }

      const productElements = products?.map((product,i) => {
        const imageUrl = grabImage(bucketName, product.imageMetaData);
        product['imgSrc'] = imageUrl;
        return(
          <Link className='productContainer' key={i} to={`/display/${product.SK}`}>         
            <div className='product-content'>
              <img className="productImage" src={imageUrl} alt='product'></img>
              <p className='bayon-regular productName'>{product.name}</p>
              <p className='bayon-regular productPrice'>${product.price}</p>
            </div>
            <div>
              <button className='addbutton' onClick={(e) => {addToCart(e, product)}}>
                <img id="addCart" className="add-to-cart" src={add} alt="add"></img>
              </button>
            </div>
          </Link>
            )})
  
    
          
  return (
    <div className='productsContainer'>
        {productElements}
    </div>
  )
}
