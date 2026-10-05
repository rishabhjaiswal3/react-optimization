import { useNavigate } from 'react-router-dom'
import { useProductState } from '../hooks/useProducts'
import { useCartState } from '../hooks/useCart'

const NavBar = () => {
  const navigate = useNavigate();
  const { products } = useProductState()
  const { productWithQuantity } = useCartState();

  const count = products.length

  const cartCount = productWithQuantity.reduce((total,item) =>{
    return item.qty + total
  },0)

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <h1 onClick={() => navigate('/')} className="cursor-pointer text-lg font-bold text-slate-800 sm:text-xl">Header <span className="ml-1 rounded-full bg-indigo-100 px-2 py-0.5 text-sm font-semibold text-indigo-700">{count}</span></h1>
        <nav className='flex w-full gap-2 sm:w-auto' >
          <button onClick={() => navigate('/') } className="w-full rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 sm:w-auto">
            Products
          </button>
          <button onClick={() => navigate('/stats') } className="w-full rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 sm:w-auto">
            Stats
          </button>
          <button onClick={() => navigate('/cart') } className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 sm:w-auto">
            Cart {cartCount}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
