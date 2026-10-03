import { CATEGORIES, FILTERS, type Category, type Product } from '../features/products/types'
import { type PageFilters } from '../features/products/types'
import { useProducts } from '../hooks/useProducts'
import { generateNewProduct }  from '../utils/generateProducts'
import type { ChangeEvent } from 'react'

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
  const { products, addProduct, removeLastProduct } = useProducts()

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

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
      <div className="w3-dropdown-click space-y-3">
      <div className='flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:flex-wrap sm:items-center'>
        <button  className='rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50' onClick = {addNewProduct} > add Product </button>
        <button  className='rounded-lg border border-rose-300 bg-white px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50' onClick = {removeLastProductFromList} > Remove Last Product </button>
        <label className="w-full sm:w-auto">
          <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:w-auto" value={filters.sortBy} onChange={selectFilter}>
            {
              FILTERS.map((filter) => {
                return (
                <option key={filter} value={filter}>{filter}</option>
                )
              })
            }
          </select>

        </label>

        <label className="w-full sm:w-auto">
          <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:w-auto" value={filters.category} onChange={handleCategoryChange}>
            {
              CATEGORIES.map((category) => {
                return (
                <option key={category} value={category}>{category}</option>
                )
              })
            }
          </select>

        </label>

        <div className="flex w-full gap-2 sm:w-auto">
            <input onChange={setMinRangeValue} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:w-28" id="minPrice" type="number" placeholder="min" value = {filters.minPrice}/>
            <input onChange={setMaxPriceValue} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:w-28" id="maxPrice" type="number" placeholder="max" value = {filters.maxPrice}/>
        </div>
      </div>



    <div>
        <input onChange={setString} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" id="search" type="text" placeholder="Search" value = {filters.search}/>
    </div>
      </div>
      </div>
    </div>
  )
}

export default Header
