import { useState } from "react";
import ProductRow from "../components/ProductRow";
import Header, { applyFilters, DEFAULT_FILTERS, type Filters } from "../components/Header";
import "../style/Home.css"
import { useProductState } from "../hooks/useProducts";

const Home = () => {

    const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)

    const { products } = useProductState();
    const newProducts = applyFilters(products, filters)

    return (
        <div className="min-h-screen bg-slate-50">
            <Header filters={filters} setFilters={setFilters} />
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 xl:grid-cols-4">
                {
                    newProducts.map((product)=> <ProductRow showRemoveButton = {false} showAddToCard={true} key={product.id}  qty={1} item={product} />)
                }
            </div>
        </div>
    )
}

export default Home;
