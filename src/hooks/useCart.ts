import { useContext } from "react"
import { CartActionContext, CartStateContext } from "../contexts/CartContext"

export const useCartState = () => {
    const state = useContext(CartStateContext);
    if(!state)  throw new Error("State does not existed")
    return state;
}

export const useCartActions = () => {
    const actions = useContext(CartActionContext);
    if(!actions)  throw new Error("Actions does not existed")
    return actions;
}