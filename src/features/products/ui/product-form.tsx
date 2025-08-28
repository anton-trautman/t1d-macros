import type { Product } from "@/types";
import { InputField } from "./input-field";

export function ProductForm({
  product,
  updateProduct,
}: {
  product: Product;
  updateProduct: (i: number, field: string, value: string) => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <InputField
          label="Углеводы на 100 г (г)"
          value={product.carbs}
          onChange={(v) => updateProduct(product.id, "carbs", v)}
        />
        <InputField
          label="Белки на 100 г (г)"
          value={product.protein}
          onChange={(v) => updateProduct(product.id, "protein", v)}
        />
        <InputField
          label="Жиры на 100 г (г)"
          value={product.fat}
          onChange={(v) => updateProduct(product.id, "fat", v)}
        />
        <InputField
          label="Вес продукта (г)"
          value={product.weight}
          onChange={(v) => updateProduct(product.id, "weight", v)}
        />
      </div>
    </>
  );
}
