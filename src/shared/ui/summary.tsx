import { useMemo } from "react";
import type { Product } from "../../types";
import { calcData, r1 } from "../../utils";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useCopyToClipboard } from "usehooks-ts";
import { Button } from "@/shared/components/ui/button";
import { Copy } from "lucide-react";

export function Summary({ products }: { products: Product[] }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, copyToClipboard] = useCopyToClipboard();

  const handleCopy = (textToCopy: string) => {
    // Attempt to copy text to the clipboard
    copyToClipboard(textToCopy).then((success) => {
      if (success) {
        console.log(`Text "${textToCopy}" copied to clipboard successfully.`);
      } else {
        console.error("Failed to copy text to clipboard.");
      }
    });
  };
  const totals = useMemo(() => {
    return products.reduce(
      (acc, p) => {
        const d = calcData(p.carbs, p.protein, p.fat, p.weight);
        acc.cG += d.carbs.grams;
        acc.pG += d.protein.grams;
        acc.fG += d.fat.grams;
        acc.kcalC += d.carbs.kcal;
        acc.kcalP += d.protein.kcal;
        acc.kcalF += d.fat.kcal;
        acc.kcalTotal += d.total.kcal;
        acc.gTotal += d.total.grams;
        acc.w += d.weight;
        return acc;
      },
      {
        cG: 0,
        pG: 0,
        fG: 0,
        kcalC: 0,
        kcalP: 0,
        kcalF: 0,
        kcalTotal: 0,
        gTotal: 0,
        w: 0,
      }
    );
  }, [products]);

  return (
    <>
      {/* Summary */}
      <Card className="">
        <CardHeader className="text-lg font-semibold mb-3">
          <CardTitle>Краткая сводка по всем продуктам</CardTitle>
          <CardAction>
            <Button
              variant={"outline"}
              onClick={() =>
                handleCopy(
                  `${totals.cG}g carbs \n${totals.pG}g proteint (${totals.kcalP} kcal) \n${totals.fG}g fat (${totals.kcalF} kcal)`
                )
              }
            >
              <Copy /> Копировать
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-2.5">
          <SummaryItem label="Общий вес" value={`${r1(totals.w, 0)} г`} />
          <SummaryItem
            label="Углеводы всего"
            value={`${r1(totals.cG, 1)} г (${r1(totals.kcalC, 0)} ккал)`}
          />
          <SummaryItem
            label="Белки всего"
            value={`${r1(totals.pG, 1)} г (${r1(totals.kcalP, 0)} ккал)`}
          />
          <SummaryItem
            label="Жиры всего"
            value={`${r1(totals.fG, 1)} г (${r1(totals.kcalF, 0)} ккал)`}
          />
          <SummaryItem
            label="Итого калорий"
            value={`${r1(totals.kcalTotal, 0)} ккал`}
          />
        </CardContent>
      </Card>
    </>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-3">
      <span className="">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
