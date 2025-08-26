import type { Product } from "../../../types";
import { Results } from "./results";
import { ProductForm } from "./product-form";
import { useState } from "react";

export function ProductItem({
  product,
  updateProduct,
  removeProduct,
}: {
  product: Product;
  updateProduct: (i: number, field: string, value: string) => void;
  removeProduct: (i: number) => void;
}) {
  const onUpdateName = (name: string) =>
    updateProduct(product.id, "name", name);

  return (
    <div className="grid md:grid-cols-2 gap-6 bg-white dark:bg-slate-900 rounded-2xl shadow">
      <div className="md:col-span-2">
        <ProductName name={product.name} onUpdate={onUpdateName} />
      </div>
      <section>
        <ProductForm product={product} updateProduct={updateProduct} />
      </section>

      <Results product={product} />

      <div className="md:col-span-2">
        <button
          onClick={() => removeProduct(product.id)}
          className="mt-4 rounded-xl px-4 py-2 bg-red-100 dark:bg-red-800 hover:bg-red-200 transition cursor-pointer"
        >
          Удалить продукт
        </button>
      </div>
    </div>
  );
}

function ProductName({
  name,
  onUpdate,
}: {
  name: string;
  onUpdate: (name: string) => void;
}) {
  const [edit, setEdit] = useState(false);
  const [nextName, setNextName] = useState(() => name);

  const onClick = () => {
    if (edit) {
      onUpdate(nextName);
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  return (
    <div className="w-full flex flex-row justify-between items-center">
      {edit ? (
        <div>
          <input
            inputMode="text"
            value={nextName}
            autoFocus
            onChange={(e) => setNextName(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-600
                   bg-white dark:bg-slate-800
                   px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500
                   text-slate-900 dark:text-slate-100"
          />
        </div>
      ) : (
        <h2 className="text-xl font-semibold ">{nextName}</h2>
      )}

      <button
        onClick={onClick}
        className="rounded-xl px-4 py-2 bg-teal-500 hover:bg-teal-800 transition cursor-pointer"
      >
        {edit ? "Сохранить" : "Переименовать"}
      </button>
    </div>
  );
}
