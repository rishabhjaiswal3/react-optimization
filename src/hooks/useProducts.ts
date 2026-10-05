import { useContext } from "react";
import { ProductActionsContext, ProductStateContext } from "../contexts/ProductContext";

export const useProductActions = () => {

    const productActionData =  useContext(ProductActionsContext)

    if(!productActionData) 
            throw new Error('use ProductAction must ave used Actions products')

    return productActionData;
}

export const useProductState = () => {

    const productStateData =  useContext(ProductStateContext)

    if(!productStateData) 
            throw new Error('use ProductAction must ave used Actions products')

    return productStateData;

}