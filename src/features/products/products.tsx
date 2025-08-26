import type { Product } from "../../types";
import { ProductItem } from "./ui/product-item";

export function Products({
  products,
  updateProduct,
  removeProduct,
}: {
  products: Product[];
  updateProduct: (i: number, field: string, value: string) => void;
  removeProduct: (i: number) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      {products.map((p) => {
        return (
          <ProductItem
            product={p}
            key={p.id}
            updateProduct={updateProduct}
            removeProduct={removeProduct}
          />
        );
      })}
    </div>
  );
}
