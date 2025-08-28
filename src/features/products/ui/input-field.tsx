import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useId } from "react";

export function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Input
        inputMode="numeric"
        value={value}
        id={id}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
