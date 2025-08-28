import type { Product } from "../../../types";
import { Results } from "./results";
import { ProductForm } from "./product-form";
import { useEffect, useId, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Trash2, Edit3, Check } from "lucide-react";
import { useDebounceCallback } from "usehooks-ts";
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
  const debounced = useDebounceCallback(onUpdateName, 500);

  return (
    <Card className="w-full ">
      <ProductName name={product.name} onUpdate={debounced} />
      <Separator />
      <CardContent className="flex flex-col md:flex-row gap-5 w-full">
        <ProductForm product={product} updateProduct={updateProduct} />

        <Results product={product} />
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => removeProduct(product.id)}
          variant={"destructive"}
        >
          <Trash2 /> <span>Удалить</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProductName({
  name,
  onUpdate,
}: {
  name: string;
  onUpdate: (name: string) => void;
}) {
  const id = useId();
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

  useEffect(() => {
    if (name) {
      setNextName(name);
    }
  }, [name]);

  return (
    <CardHeader>
      <CardTitle className="my-auto">
        {edit ? (
          <Input
            inputMode="text"
            value={nextName}
            autoFocus
            onChange={(e) => setNextName(e.target.value)}
            id={id}
            onKeyDown={(e) => {
              if (e.key === "Enter" && nextName?.length) {
                onClick();
              }
            }}
          />
        ) : (
          <h2 className="text-3xl ">{nextName}</h2>
        )}
      </CardTitle>

      <CardAction>
        <Button onClick={onClick} variant={"outline"} size={"icon"}>
          {edit ? <Check /> : <Edit3 />}
        </Button>
      </CardAction>
    </CardHeader>
  );
}
