import { CATEGORIES, FILTERS, type Category, type Product } from '../features/products/types'
import { type PageFilters } from '../features/products/types'
import { useProducts } from '../hooks/useProducts'
import { generateNewProduct }  from '../utils/generateProducts'
import { useNavigate } from 'react-router-dom'
import type { ChangeEvent } from 'react'
import { useCart } from '../hooks/useCart'

export interface Filters {
  search: string,
  category: Category,
  minPrice: number,
  maxPrice: number,
  sortBy: PageFilters
}

export const DEFAULT_FILTERS: Filters = {
  search: '',
  category: CATEGORIES[0],
  minPrice: -1,
  maxPrice: 0,
  sortBy: FILTERS[0]
}

const COMPARATORS: Record<PageFilters, (a: Product, b: Product) => number> = {
  price: (a, b) => a.price - b.price,
  category: (a, b) => a.category.localeCompare(b.category),
  id: (a, b) => a.id - b.id,
  name:(a,b) => a.name.localeCompare(b.name),
  rating: (a,b) => a.rating - b.rating
}

export const applyFilters = (products: Product[], filters: Filters) => {
  const { search, category, minPrice, maxPrice, sortBy } = filters

  let newProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(search.toLowerCase())
  })

  if(category != CATEGORIES[0]) {
    newProducts = newProducts.filter(item => item.category == category)
  }

  if(minPrice != -1 && maxPrice > 0) {
    newProducts = newProducts.filter(product => product.price > minPrice && product.price <= maxPrice )
  } else if( minPrice >-1) {
    newProducts = newProducts.filter(product => product.price > minPrice )
  } else if( maxPrice > 0) {
    newProducts = newProducts.filter(product => product.price <= maxPrice )
  }

  return newProducts.toSorted(COMPARATORS[sortBy])
}

interface HeaderProps {
  filters: Filters,
  setFilters: (filters: Filters) => void
}

const Header = ({ filters, setFilters }:HeaderProps) => {
  const navigate = useNavigate();
  const { products, addProduct, removeLastProduct } = useProducts()

  const count = products.length
  const {productWithQuantity} = useCart();

  const addNewProduct = () => {
    const id = products.length + 1;
    const product = generateNewProduct(id);
    addProduct(product);
  }

  const removeLastProductFromList = () => {
    removeLastProduct();
  }

  const handleCategoryChange = (e:ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, category: e.target.value as Category })
  }

  const setMinRangeValue = (e:ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, minPrice: Number(e.target.value) || 0 })
  }

  const setMaxPriceValue = (e:ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, maxPrice: Number(e.target.value) || 0 })
  }

  const setString = (e:ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value })
  }

  const setSortBy = (sortBy: PageFilters) => {
    setFilters({ ...filters, sortBy })
  }

  const selectFilter = (e:ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as PageFilters)
  }

  const cartCount = productWithQuantity.reduce((total,item) =>{
    return item.qty + total
  },0)
  

  return (
    <div>
      <h2>Header {count}</h2>
      <div className="w3-dropdown-click">
      <div className='flex justify-around w-[600px]' >
        <button onClick={() => navigate('/stats') } className="w-full p-2 m-2 bg-gray-200">
          Stats
        </button>
        <button onClick={() => navigate('/cart') } className="w-full p-2 m-2  bg-gray-200">
          Cart {cartCount}
        </button>
      </div>
      <div className='flex justify-around p-2 m-2 border-2 border-black'>
        <button  className='border border-gray-400 rounded p-2' onClick = {addNewProduct} > add Product </button>
        <button  className='border border-gray-400 rounded p-2' onClick = {removeLastProductFromList} > Remove Last Product </button>
        <label>
          <select value={filters.sortBy} onChange={selectFilter}>
            {
              FILTERS.map((filter) => {
                return (
                <option key={filter} value={filter}>{filter}</option>
                )
              })
            }
          </select>

        </label>

        <label>
          <select value={filters.category} onChange={handleCategoryChange}>
            {
              CATEGORIES.map((category) => {
                return (
                <option key={category} value={category}>{category}</option>
                )
              })
            }
          </select>

        </label>

        <div className="mb-4">
            <input onChange={setMinRangeValue} className="p-2 m-2  shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="minPrice" type="number" placeholder="min" value = {filters.minPrice}/>
            <input onChange={setMaxPriceValue} className="p-2 m-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="maxPrice" type="number" placeholder="max" value = {filters.maxPrice}/>
        </div>
      </div>



    <div className="mb-4 p-2">
        <input onChange={setString} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="search" type="text" placeholder="Search" value = {filters.search}/>
    </div>
      </div>
    </div>
  )
}

export default Header
