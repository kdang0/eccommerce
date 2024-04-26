/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const allProduct = /* GraphQL */ `
  query AllProduct($PK: String!, $limit: Int, $nextToken: String) {
    allProduct(PK: $PK, limit: $limit, nextToken: $nextToken) {
      products {
        PK
        SK
        name
        price
        description
        imageMetaData
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($PK: String, $SK: String) {
    getProduct(PK: $PK, SK: $SK) {
      PK
      SK
      name
      price
      description
      imageMetaData
      __typename
    }
  }
`;
