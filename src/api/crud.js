import {getProduct, allProduct} from '../graphql/queries.js'

import {generateClient} from 'aws-amplify/api'

export const client = generateClient();

//QUERIES
export const grabProduct = async (SK) => {
  const result = await client.graphql({
    query:getProduct,
    variables : {
      SK: SK
    }
  })
  return result;
}

export const grabAllProducts = async () => {
  const result = await client.graphql({query:allProduct,
    variables: {
      PK:"PRODUCT"
    }});
    return result;
}

//MUTATIONS


        