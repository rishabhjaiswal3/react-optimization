import { useState } from "react";
import ProductRow from "../components/ProductRow";
import Header, { applyFilters, DEFAULT_FILTERS, type Filters } from "../components/Header";
import "../style/Home.css"
import { useProducts } from "../hooks/useProducts";

const Home = () => {

    const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)

    const { products } = useProducts();
    const newProducts = applyFilters(products, filters)

    return (
        <>
            <Header filters={filters} setFilters={setFilters} />
            <>
                {
                    newProducts.map((product)=> <ProductRow showRemoveButton = {false} showAddToCard={true} key={product.id}  qty={1} item={product} />)
                }
            </>
        </>
    )
}

export default Home;
