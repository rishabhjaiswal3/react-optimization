import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"

export const useCart = () => {
    const cartData = useContext(CartContext)
    
    if(!cartData)
            throw new Error("Cart Data not found ")
    return cartData;
}