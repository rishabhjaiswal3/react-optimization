import { createContext } from "react";
import type { Product } from "../features/products/types";
import type { ReactNode } from "react";
import { products } from "../features/products/data";
import { useState } from "react";

interface ProductProps {
  children: ReactNode
}

interface ProductContextValue {
  products: Product[]
  addProduct: (product: Product) => void
  removeLastProduct: () => void
}

export const ProductContext = createContext<ProductContextValue | null>(null)


const ProductProvider = ({ children }:ProductProps) => {

    const [productList, setProductList] = useState<Product[]>(products)

    const addProduct = (product: Product) => {
        setProductList(prev => [...prev, product])
    }

    const removeLastProduct = () => {
       const newProducts =  [ ...productList.sort((a,b)=> a.id - b.id)]
       newProducts.pop();
       setProductList(newProducts)
    }

    return (
        <ProductContext.Provider value={{ products:productList, addProduct, removeLastProduct }}>
            {children}
        </ProductContext.Provider>
    );
}

export default ProductProvider;