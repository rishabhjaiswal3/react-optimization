import { createContext, useCallback, useMemo } from "react";
import type { Product } from "../features/products/types";
import type { ReactNode } from "react";
import { products } from "../features/products/data";
import { useState } from "react";
import { generateNewProduct } from "../utils/generateProducts";

interface ProductProps {
  children: ReactNode
}

interface ProductStateContextValue {
  products: Product[]
}

interface ProductActionsContextValue {
  addProduct: () => void
  removeLastProduct: () => void
}

export const ProductStateContext = createContext<ProductStateContextValue | null>(null)
export const ProductActionsContext = createContext<ProductActionsContextValue | null >(null);

const ProductProvider = ({ children }:ProductProps) => {

    const [productList, setProductList] = useState<Product[]>(products)

    const addProduct = useCallback(() => {
         setProductList(prev => {
            const nextId = prev.reduce((max, p) => Math.max(max, p.id), 0) + 1
            return [...prev, generateNewProduct(nextId)]
        })
    },[])

    const removeLastProduct = useCallback(() => {
       setProductList(prev => prev.toSorted((a, b) => a.id - b.id).slice(0, -1))
    },[])

    const actions = useMemo(() => ({ addProduct, removeLastProduct }), [addProduct, removeLastProduct])

    return (
        <ProductActionsContext.Provider value = {actions} >
          <ProductStateContext.Provider value={{ products:productList }}>
              {children}
          </ProductStateContext.Provider>
        </ProductActionsContext.Provider>
    );
}

export default ProductProvider;