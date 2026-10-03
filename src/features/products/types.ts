export const CATEGORIES = [
    'SPORTS', 'TOYS', "INSTRUMENTS", "ELECTRONICS"
] as const


export type Category = ( typeof  CATEGORIES)[number]

export interface Product {
    id:number,
    name:string,
    category:Category,
    price:number,
    rating:number,
    stock:number,
    createdAt:string
}

export const FILTERS = ['price','category','id', 'name','rating'] as const
export type PageFilters = (typeof FILTERS)[number]


