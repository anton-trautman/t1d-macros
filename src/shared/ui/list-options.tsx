import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/shared/components/ui/dropdown-menu";

export function ListOptions({ onReset }: { onReset: VoidFunction }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="my-2.5">
          <Button variant={"outline"}>Опции</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right">
          <DropdownMenuItem onClick={onReset}>Очистить всё</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
