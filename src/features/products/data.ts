import { generateProducts } from "../../utils/generateProducts";
import { type Product } from "./types";


export const PRODUCT_COUNT = 10000
export const products:Product[]  = generateProducts(PRODUCT_COUNT)