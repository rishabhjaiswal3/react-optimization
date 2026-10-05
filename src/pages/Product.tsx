import { useParams } from "react-router-dom";
import ProductRow from "../components/ProductRow";
import { useProductState } from "../hooks/useProducts";

const Product = () => {

  const { productId } = useParams()
  const { products } = useProductState();

  const product = products.find(product => product.id === Number(productId) )

  if(!product) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-lg font-medium text-slate-500">Product Not Found</div>
  }

  return (
    <div className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 py-10 sm:max-w-lg">
      <ProductRow item={product} qty={1} showRemoveButton = {false} showAddToCard={true} />
    </div>
  );
};

export default Product;