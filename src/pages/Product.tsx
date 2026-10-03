import { useParams } from "react-router-dom";
import { products } from "../features/products/data";
import ProductRow from "../components/ProductRow";

const Product = () => {

  const { productId } = useParams()

  const product = products.find(product => product.id === Number(productId) )

  if(!product) {
    return <>Product Not Found</>
  }

  return (
    <div>
      <ProductRow item={product} qty={1} showRemoveButton = {false} showAddToCard={true} />
    </div>
  );
};

export default Product;