import  { CATEGORIES, type Product }  from "../features/products/types";

const ADJECTIVES = ['Smart', 'Classic', 'Ultra', 'Eco', 'Pro', 'Compact', 'Wireless', 'Vintage'] as const
const NOUNS = ['Speaker', 'Notebook', 'Jacket', 'Lamp', 'Bottle', 'Backpack', 'Watch', 'Chair'] as const

const DAY_MS = 24 * 60 * 60 * 1000
const BASE_DATE = Date.UTC(2026, 0, 1)   // fixed date instead of "now"

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const randomFloat = (min: number, max: number, decimals = 2) =>
  Number((Math.random() * (max - min) + min).toFixed(decimals))

const pick = <T,>(items: readonly T[]): T =>
  items[Math.floor(Math.random() * items.length)]


export const generateNewProduct = (id:number) : Product=> {
  return  {
    id,
    name: `${pick(ADJECTIVES)} ${pick(NOUNS)} ${id}`,
    category: pick(CATEGORIES),
    price: randomFloat(5,2000),
    rating:randomFloat(1,5,1),
    stock: randomInt(0,10000),
    createdAt: new Date(BASE_DATE - randomInt(0, 730) * DAY_MS).toISOString(),
  }
}

export const generateProducts = (count:number) : Product[] => {

    const products: Product[] = [];

    for( let i = 0; i < count; i++ ) {
        const id = i+1;
        products.push({
            id,
            name: `${pick(ADJECTIVES)} ${pick(NOUNS)} ${id}`,
            category: pick(CATEGORIES),
            price: randomFloat(5,2000),
            rating:randomFloat(1,5,1),
            stock: randomInt(0,10000),
            createdAt: new Date(BASE_DATE - randomInt(0, 730) * DAY_MS).toISOString(),
        })
    } 
    return products    
}

export default { 
  generateProducts,
  generateNewProduct
}