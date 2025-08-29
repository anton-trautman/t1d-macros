import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useId } from "react";

export function InputField({
  label,
  value,
  onChange,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  inputMode?:
    | "search"
    | "text"
    | "none"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | undefined;
}) {
  const id = useId();
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Input
        value={value}
        id={id}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      />
    </div>
  );
}
