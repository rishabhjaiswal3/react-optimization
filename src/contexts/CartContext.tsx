import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../features/products/types';


export interface CartProviderProps {
    children : ReactNode
}

export interface ProductQuantity {
    product: Product,
    qty: number
}

export interface CartProviderValue {
    productWithQuantity: ProductQuantity[],
    addToCard: ( product: Product, qty: number ) => void,
    removeCard: (product: Product) => void,
    setQty: ( product: Product, qty: number ) => void,
}

export const CartContext = createContext< CartProviderValue | null >(null); 


const CartProvider = ({children}:CartProviderProps) => {

    const [ productWithQuantity, setProductWithQuantity ] = useState<ProductQuantity[]>([])
    
    const addToCard = ( product:Product, qty:number ) => {
        setProductWithQuantity(prev => { 
            const exists = prev.some(item => item.product.id === product.id)
            if (exists) {
            return prev.map(item =>
                item.product.id === product.id
                ? { ...item, qty: item.qty + qty }
                : item
            )
            }

            return [...prev, { product, qty }]
        })
    }

    const removeCard = (product:Product) => {
        setProductWithQuantity((prev) => [ ...prev.filter(data => data.product.id != product.id) ] )
    }

    const setQty = ( product:Product, qty:number ) => {

        setProductWithQuantity(prev => {
            const isExisted = prev.find(item=> item.product.id === product.id)
            if(isExisted) {
                return [
                    ...prev.map((item) => {
                        if(item.product.id == product.id)
                            return {product, qty: qty }
                        return item
                    })
                ]
            } else {
                return prev
            }
    })
    }

    return (
        <CartContext.Provider  value={{ addToCard, productWithQuantity , removeCard, setQty }} >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;