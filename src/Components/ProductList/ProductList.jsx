import React, {useState, useEffect} from 'react'
import { generateClient } from 'aws-amplify/api';
import { Hub } from 'aws-amplify/utils';
import { CONNECTION_STATE_CHANGE } from 'aws-amplify/api'
import { allProduct } from '../../graphql/queries.js';
import {updateProduct} from '../../graphql/mutations.js'
import {Form} from '../Form/Form.tsx';
import * as subscriptions from '../../graphql/subscriptions.js';
import {DeleteBtn} from '../../Components/DeleteBtn/DeleteBtn.jsx';
import { PutObjectCommand, DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

import './ProductList.css'
export const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const client = generateClient();
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
    

    const handleEdit = (SK) =>{
      setProducts(products?.map(product => {
        if(product.SK === SK){
          return {...product, isEditing:true};
        }
        return product;
      }));
    };

    const updatedProduct = async (product) =>{
      const client = generateClient();
      
      const s3client = new S3Client({
        region: 'us-east-1',
        credentials:{
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        }
      });

      let productDetails;
      if(product.file){
        const deleteCommand = new DeleteObjectCommand({
          Bucket: 'test-bucket-ecc-one',
          Key: product.imageMetaData
        });
  
        try{
          const response = await s3client.send(deleteCommand);
          console.log("DELETE RESPONSE:", response);
        } catch(err){
          console.error(err);
        }
        
        const putCommand = new PutObjectCommand({
          Bucket: 'test-bucket-ecc-one',
          Key:product.file.name,
          Body: product.file,
          ContentType: product.file.type
        });
        
        productDetails = {
          PK:product.PK,
          SK:product.SK,
          name:product.name,
          price:product.price,
          description:product.description,
          imageMetaData:product.file.name
        } 
        
        try{
          const response = await s3client.send(putCommand);
          console.log(response);
        } catch(err){
          console.log(err);
        }
      
      } else{
        productDetails ={
          PK:product.PK,
          SK:product.SK,
          name:product.name,
          price:product.price,
          description:product.description,
          imageMetaData: product.imageMetaData
        }
      }
      await client.graphql({
        query:updateProduct,
        variables:productDetails
      });
    }

    //grab image URL from s3 bucket
    const grabImage = (imageKey) =>{
      const url = `https://d2e64dv9223u3l.cloudfront.net/${encodeURIComponent(imageKey)}`;
      return url;
    }

    const productElements = products?.map((product,i) => {
      const imageUrl = grabImage(product.imageMetaData);
      return(
        <div key={i}>
          {product.isEditing ? (
            <Form initialProduct={product} onSubmitProp={updatedProduct} pImageUrl={imageUrl}/>
          ) : (
            <div className='productContainer' key={i}>
                <img className="productImage" src={imageUrl} alt='product'></img>
                <p className='bayon-regular productName'>{product.name}</p>
                <p className='bayon-regular productPrice'>${product.price}</p>
                <p className='bayon-regular'>{product.description}</p>
                <div>
                  <button onClick={() => handleEdit(product.SK)}>edit</button>
                  <DeleteBtn productPK = {product.PK} productSK={product.SK}/>
                </div>
            </div>
          )}

        </div>
        )
    })

  return (
    <div className="productsContainer">
      {productElements}
    </div>
               
  
  )
}
