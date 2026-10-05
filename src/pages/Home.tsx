import { useState } from "react";
import ProductRow from "../components/ProductRow";
import Header, { applyFilters, DEFAULT_FILTERS, type Filters } from "../components/Header";
import "../style/Home.css"
import { List, type RowComponentProps } from 'react-window'
import { useProductState } from "../hooks/useProducts";
import type { Product } from "../features/products/types";


const ROW_HEIGHT = 220

const getColumns = (width: number) => (width >= 900 ? 3 : width >= 560 ? 2 : 1)

const Row = ({ index, style, products, columns }: RowComponentProps<{ products: Product[], columns: number }>) => {
  const start = index * columns
  const items = products.slice(start, start + columns)

  return (
    <div style={style}>
      <div className="grid h-full gap-4 pb-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {
          items.map((product) => <ProductRow key={product.id} item={product} qty={1} showRemoveButton={false} showAddToCard={true} />)
        }
      </div>
    </div>
  )
}

const Home = () => {

    const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
    const [columns, setColumns] = useState(1)

    const { products } = useProductState();
    const newProducts = applyFilters(products, filters)

    return (
        <div className="min-h-screen bg-slate-50">
            <Header filters={filters} setFilters={setFilters} />
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
                <List
                    rowComponent={Row}
                    rowCount={Math.ceil(newProducts.length / columns)}
                    rowHeight={ROW_HEIGHT}
                    rowProps={{ products: newProducts, columns }}
                    onResize={({ width }) => setColumns(getColumns(width))}
                    style={{ height: '80vh' }}
                />
            </div>
        </div>
    )
}

export default Home;
