import { useState } from "react";
import { AppLayout } from "./shared/ui/layout";
import { Products } from "./features/products";
import { Summary } from "./shared/ui/summary";

const initState = [
  {
    id: Date.now(),
    name: "продукт 1",
    carbs: "0",
    protein: "0",
    fat: "0",
    weight: "100",
  },
];
export default function App() {
  const [products, setProducts] = useState(initState);

  const addProduct = () => {
    setProducts([
      ...products,
      {
        carbs: "0",
        protein: "0",
        fat: "0",
        weight: "100",
        id: Date.now(),
        name: `продукт ${products.length + 1}`,
      },
    ]);
  };

  const removeProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateProduct = (id: number, field: string, value: string) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const onReset = () => setProducts(initState);

  return (
    <AppLayout>
      <ResetButton onClick={onReset} />
      <Products
        products={products}
        updateProduct={updateProduct}
        removeProduct={removeProduct}
      />

      <div className="my-4">
        <button
          onClick={addProduct}
          className="rounded-2xl  bg-white dark:bg-teal-700 px-4 py-2 shadow-sm hover:shadow transition"
        >
          ➕ Добавить продукт
        </button>
      </div>

      <Summary products={products} />
    </AppLayout>
  );
}

function ResetButton({ onClick }: { onClick: VoidFunction }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl bg-red-200  dark:bg-red-800 px-4 py-2 shadow-sm hover:shadow transition"
    >
      Очистить
    </button>
  );
}
