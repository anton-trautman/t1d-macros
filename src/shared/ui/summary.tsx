import { useMemo } from "react";
import type { Product } from "../../types";
import { calcData, r1 } from "../../utils";

export function Summary({ products }: { products: Product[] }) {
  const totals = useMemo(() => {
    return products.reduce(
      (acc, p) => {
        const d = calcData(p.carbs, p.protein, p.fat, p.weight);
        acc.cG += d.cG;
        acc.pG += d.pG;
        acc.fG += d.fG;
        acc.kcalC += d.kcalC;
        acc.kcalP += d.kcalP;
        acc.kcalF += d.kcalF;
        acc.kcalTotal += d.kcalTotal;
        acc.gTotal += d.gTotal;
        acc.w += d.w;
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
      <section className="bg-white dark:bg-slate-900 rounded-2xl shadow ">
        <h2 className="text-lg font-semibold mb-3">
          Краткая сводка по всем продуктам
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
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
        </div>
      </section>
    </>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-3">
      <span className="text-slate-600 dark:text-slate-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
