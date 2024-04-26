/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $PK: String!
    $SK: String!
    $name: String
    $price: Float
    $description: String
    $imageMetaData: String
  ) {
    updateProduct(
      PK: $PK
      SK: $SK
      name: $name
      price: $price
      description: $description
      imageMetaData: $imageMetaData
    ) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct($PK: String!, $SK: String!, $expectedVersion: Int) {
    deleteProduct(PK: $PK, SK: $SK, expectedVersion: $expectedVersion) {
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
export const addProduct = /* GraphQL */ `
  mutation AddProduct(
    $PK: String
    $SK: ID
    $name: String
    $price: Float
    $description: String
    $imageMetaData: String
  ) {
    addProduct(
      PK: $PK
      SK: $SK
      name: $name
      price: $price
      description: $description
      imageMetaData: $imageMetaData
    ) {
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
