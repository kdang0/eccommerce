import React from 'react';
import {deleteProduct} from "../../graphql/mutations.js"
import {generateClient} from 'aws-amplify/api';
export const DeleteBtn = (props) => {
    const {productPK,productSK} = props;

    const client = generateClient();


    const deletedProduct = async () => 
        await client.graphql({
        query:deleteProduct,
        variables:{
            PK:productPK,
            SK:productSK
        }
    });

    return (
    <button className="bayon-regular" onClick={deletedProduct}>DELETE</button>
    )
}
