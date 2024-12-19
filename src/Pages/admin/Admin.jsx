import React from 'react'
import "./Admin.css"
import {Form} from "../../Components/Form/Form.tsx" 
import { SignOut } from '../../Components/SignOut/SignOut.jsx'
import {ProductList} from "../../Components/ProductList/ProductList.jsx"
import {generateClient} from 'aws-amplify/api'
import {addProduct} from "../../graphql/mutations.js"

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {secret} from '../../api/secretsManager.js'
// const { fromEnv } = require("@aws-sdk/credential-providers"); // CommonJS import

//Generates appsync client 
const client = generateClient();
const process = await secret();
export const Admin = () => {
  const s3client = new S3Client({
    region: process.REACT_APP_REGION,
    credentials:{
      accessKeyId: process.REACT_APP_AWS_ACCESS,
      secretAccessKey: process.REACT_APP_AWS_SECRET_ACCESS_KEY,
    }
  });



 
  
  const createProduct = async (product) => {
   
    const command = new PutObjectCommand({
      Bucket: process.REACT_APP_BUCKET_NAME,
      Key:product.file.name,
      Body: product.file,
      ContentType: product.file.type
    });

    try{
      const response=await s3client.send(command);
      console.log(response);
    } catch(err){
      console.error(err);
    }

    //GRAPHQL queries

    try{
      const productInput = {
        name:product.name,
        price:product.price, 
        description: product.description,
        imageMetaData: product.file.name
      }
      await client.graphql({
          query:addProduct,
          variables:productInput
        });
    } catch(error){
      console.error('Error adding product: ', error);
    }
  }


  
  return (
    <div>
      <Form initialProduct={{name:"", price:0, description:""}} onSubmitProp={createProduct} pImageUrl=""/>
      <ProductList/>
      <SignOut/>
    </div>
  )
}
