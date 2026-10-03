import { useState } from 'react';
import type { Product } from '../features/products/types';
import { useCart } from '../hooks/useCart';
import "./style.css"
import { useNavigate } from 'react-router-dom';

interface ProductRowProps {
  item: Product,
  qty : number,
  showRemoveButton: boolean,
  showAddToCard: boolean
}

const ProductRow = ({ item, qty = 1, showRemoveButton = false,showAddToCard = false  } : ProductRowProps) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(qty);
  const { addToCard, removeCard, setQty } = useCart();

  return (
    <div className='productCard' >
      <div onClick={()=>navigate(`/product/${item.id}`)}>
        <div>
          {item.id}
        </div>
        <div>
          {item.category}
        </div>
        <div>
          {item.name}
        </div>
        <div>
          {item.rating}
        </div>
        <div>
          {item.stock}
        </div>
      </div>
      <div className='flex justify-between'>
        {
          showRemoveButton ? (
              <input
                type="number"
                min={1}
                value={qty}
                onChange={e => setQty(item, Number(e.target.value))}
              />
            ) : (
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
              />
            )
        }
        {
          showAddToCard ?
          <button className='border border-gray-400 rounded p-2' onClick={()=> addToCard(item,quantity)}>
            Add To Cart
          </button> : null
        }
        {
          showRemoveButton ?
          <button className='border border-gray-400 rounded p-2' onClick={()=> removeCard(item)}>
            Remove From Cart
          </button> : null
        }
        
      </div>
    </div>
  );
};

export default ProductRow;