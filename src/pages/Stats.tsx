import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../features/products/types";

const getAveragePriceByCategory = (products: Product[]) => {
  const totals: Record<string, { sum: number, count: number }> = {}

  for (const product of products) {
    const entry = totals[product.category] ?? { sum: 0, count: 0 }
    entry.sum += product.price
    entry.count += 1
    totals[product.category] = entry
  }

  return Object.entries(totals).map(([category, { sum, count }]) => ({
    category,
    averagePrice: Number((sum / count).toFixed(2)),
  }))
}

const getTopRated = (products: Product[], count: number) =>
  products.toSorted((a, b) => b.rating - a.rating).slice(0, count)

const Stats = () => {
  const { products } = useProducts()

  const averageByCategory = getAveragePriceByCategory(products)
  const topRated = getTopRated(products, 20)

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Stats</h2>

      <h3 className="font-semibold mb-2">Average price per category</h3>
      <div className="w-full h-[300px] mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={averageByCategory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="averagePrice" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3 className="font-semibold mb-2">Top 10 rated products</h3>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topRated} layout="vertical" margin={{ left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 5]} />
            <YAxis type="category" dataKey="name" width={180} />
            <Tooltip />
            <Bar dataKey="rating" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Stats;
