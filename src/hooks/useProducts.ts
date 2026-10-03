import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

export const useProducts = () => {

    const productData =  useContext(ProductContext)

    if(!productData) 
            throw new Error('use Product musth ave used inside products')

    return productData;
}