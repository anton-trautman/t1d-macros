import { useState } from "react";
import { AppLayout } from "@/shared/ui/layout";
import { Products } from "@/features/products";
import { Summary } from "@/shared/ui/summary";
import { ThemeProvider } from "@/shared/components/theme-provider";
import { Button } from "@/shared/components/ui/button";
import { ListOptions } from "@/shared/ui/list-options";
import { Toaster } from "@/shared/components/ui/sonner";

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
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AppLayout>
        <ListOptions onReset={onReset} />
        <Products
          products={products}
          updateProduct={updateProduct}
          removeProduct={removeProduct}
        />

        <div className="my-4">
          <AddProduct onClick={addProduct} />
        </div>

        <Summary products={products} />
        <Toaster />
      </AppLayout>
    </ThemeProvider>
  );
}

function AddProduct({ onClick }: { onClick: VoidFunction }) {
  return (
    <Button variant={"default"} onClick={onClick}>
      ➕ Добавить продукт
    </Button>
  );
}
