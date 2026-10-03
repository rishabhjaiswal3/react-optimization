import type { CartProviderValue } from "../contexts/CartContext";
import type { ProductQuantity } from "../contexts/CartContext";
import ProductRow from "../components/ProductRow";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { productWithQuantity }:CartProviderValue = useCart();

  if(!productWithQuantity || productWithQuantity.length == 0)
      return <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-center text-lg font-medium text-slate-500">No Product existed in cart</div>

  return (
    <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 content-start gap-4 bg-slate-50 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
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