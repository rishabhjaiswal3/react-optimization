import React,{ useState } from 'react';
import type { Product } from '../features/products/types';
import { useCartActions } from '../hooks/useCart';
import "./style.css"
import { useNavigate } from 'react-router-dom';

interface ProductRowProps {
  item: Product,
  qty : number,
  showRemoveButton: boolean,
  showAddToCard: boolean
}

const ProductRow = React.memo(({ item, qty = 1, showRemoveButton = false,showAddToCard = false  } : ProductRowProps) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(qty);
  const { addToCard, removeCard, setQty } = useCartActions();

  return (
    <div className='flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md' >
      <div className="cursor-pointer space-y-1" onClick={()=>navigate(`/product/${item.id}`)}>
        <div className="text-xs font-medium text-slate-500">
          #{item.id}
        </div>
        <div className="inline-block rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-indigo-600">
          {item.category}
        </div>
        <div className="text-base font-semibold text-slate-800 hover:text-indigo-600">
          {item.name}
        </div>
        <div className="text-sm text-amber-700">
          ★ {item.rating}
        </div>
        <div className="text-sm text-slate-500">
          Stock: {item.stock}
        </div>
      </div>
      <div className='mt-4 flex flex-wrap items-center gap-2'>
        {
          showRemoveButton ? (
              <input
                className="w-20 rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                type="number"
                aria-label={`Quantity for ${item.name}`}
                min={1}
                value={qty}
                onChange={e => setQty(item, Number(e.target.value))}
              />
            ) : (
              <input
                className="w-20 rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                type="number"
                aria-label={`Quantity for ${item.name}`}
                min={1}
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
              />
            )
        }
        {
          showAddToCard ?
          <button className='flex-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-700' onClick={()=> addToCard(item,quantity)}>
            Add To Cart
          </button> : null
        }
        {
          showRemoveButton ?
          <button className='flex-1 rounded-lg border border-rose-300 px-3 py-1.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50' onClick={()=> removeCard(item)}>
            Remove From Cart
          </button> : null
        }
        
      </div>
    </div>
  );
});

export default ProductRow;