import React, { useState, useCallback } from 'react'
import {useDropzone} from 'react-dropzone'
import "./Form.css"

export const Form = (props) => {
    const {initialProduct, onSubmitProp, pImageUrl } = props;
    const [product, setProduct] = useState(initialProduct);
    const [preview, setPreview] = useState<string | ArrayBuffer | null | undefined>();

    const handleSubmit = e => {
        e.preventDefault();
        console.log("PRODUCT", product);
        onSubmitProp(product);
    }   
    const onDrop = useCallback(acceptedFiles => {
        const fileReader = new FileReader();
        fileReader.onload = function(){
            setPreview(fileReader.result);
        }
        const file = acceptedFiles[0];
        fileReader.readAsDataURL(acceptedFiles[0]);
        setProduct({...product, file});
    
      }, [product]);

    const {getRootProps, getInputProps} = useDropzone({onDrop});
    return (
    <form onSubmit = {handleSubmit}>
        <label>Product Name:
        <input type="text" value={product.name} onChange = {e=>setProduct({...product, name: e.target.value})}/>
        </label>
        <label>Price: 
        <input type="number" value={product.price} onChange={e => setProduct({...product, price: e.target.value})}/>
        </label>
        <label>Description: 
        <textarea value={product.description} onChange= {e => setProduct({...product, description: e.target.value})}></textarea>
        </label>
        <label>
            <div {...getRootProps()} className="test1">
                <input type="file" {...getInputProps()}/>      
                <p className="testing">Drag 'n' drop some files here, or click to select files</p>
            </div>
        </label>
        {preview ? <img className="productImage" src={preview} alt="upload"></img> : (pImageUrl && product.imageMetaData) ? <img src={pImageUrl} alt="product"></img> : <span></span>}
        
        <br/>
        <button type="submit" className="bayon-regular add-button">SUBMIT</button>
    </form>
  )
}

