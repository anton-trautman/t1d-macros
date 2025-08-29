import type { Product } from "../../../types";
import { Results } from "./results";
import { ProductForm } from "./product-form";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
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
import { useDebounceCallback, useOnClickOutside } from "usehooks-ts";
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

  const onEditEnd = useCallback(
    (e?: MouseEvent | TouchEvent | FocusEvent) => {
      e?.stopPropagation();

      if (!edit) {
        return;
      }

      if (nextName && nextName !== name) {
        onUpdate(nextName);
      }
      setEdit(false);
    },
    [edit, name, nextName, onUpdate]
  );

  const containerRef = useRef(null);

  // @ts-expect-error ref type
  useOnClickOutside([containerRef], onEditEnd);

  const contentProps = edit
    ? {
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          const trimmedValue = e.target.value?.trimStart();

          setNextName(trimmedValue);
        },
        value: nextName,
        autoFocus: true,
        onFocus: (e: ChangeEvent<HTMLInputElement>) => e.target.select(),
        id,
      }
    : {
        children: nextName,
        className: "text-3xl",
      };

  const Component = edit ? Input : "h2";

  return (
    <CardHeader>
      <CardTitle className="my-auto">
        <Component {...contentProps} ref={containerRef} />
      </CardTitle>

      <CardAction>
        <Button onClick={onClick} variant={"outline"} size={"icon"}>
          {edit ? <Check /> : <Edit3 />}
        </Button>
      </CardAction>
    </CardHeader>
  );
}
