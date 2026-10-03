import type { CartProviderValue } from "../contexts/CartContext";
import type { ProductQuantity } from "../contexts/CartContext";
import ProductRow from "../components/ProductRow";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { productWithQuantity }:CartProviderValue = useCart();

  if(!productWithQuantity || productWithQuantity.length == 0)
      return <div>No Product existed in cart</div>

  return (
    <div>
      {
        productWithQuantity.map(({ product, qty }:ProductQuantity)=> {
          return (<>
            <ProductRow item={product} qty = {qty} showRemoveButton = {true} showAddToCard={false} />
          </>)
        })
      }
    </div>
  );
};

export default Cart;