import type { Product } from "@/types";
import { calcData, r1 } from "@/utils";

import { lazy, Suspense, useMemo } from "react";

const ResultsChart = lazy(() => import("./results-chart"));

export function Results({ product }: { product: Product }) {
  const d = useMemo(
    () => calcData(product.carbs, product.protein, product.fat, product.weight),
    [product]
  );

  const chartData = [
    {
      fill: "var(--color-carbs)",
      element: "carbs",
      ...d.carbs,
    },
    {
      fill: "var(--color-protein)",

      element: "protein",
      ...d.protein,
    },
    {
      fill: "var(--color-fat)",

      element: "fat",
      ...d.fat,
    },
  ];
  return (
    <>
      {/* Results */}
      <section className="w-full">
        <div className="grid grid-cols-1 gap-4">
          <MacroRow label="Углеводы" {...d.carbs} hint="4 ккал/г" />
          <MacroRow label="Белки" {...d.protein} hint="4 ккал/г" />
          <MacroRow label="Жиры" {...d.fat} hint="9 ккал/г" />
          <div className="mt-2 border-t pt-4">
            <div className="flex items-baseline justify-between">
              <span className="">Всего БЖУ (г)</span>
              <span className="font-semibold text-lg">
                {r1(d.total.grams, 1)} г
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="">Итого калорий</span>
              <span className="font-semibold text-2xl">
                {r1(d.total.kcal, 0)} ккал
              </span>
            </div>
          </div>
        </div>

        {!!d.carbs.grams || !!d.fat.grams || !!d.protein.grams ? (
          <Suspense>
            <ResultsChart chartData={chartData} totalKcal={d.total.kcal} />
          </Suspense>
        ) : null}
      </section>
    </>
  );
}

function MacroRow({
  label,
  grams,
  kcal,
  percent,
  hint,
}: {
  label: string;
  grams: number;
  kcal: number;
  percent: number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border  p-2 ">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{label}</div>
          <div className="text-xs text-muted-foreground">{hint}</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold">{grams.toFixed(1)} г</div>
          <div className="text-sm text-muted-foreground">
            {kcal.toFixed(0)} ккал · {percent.toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
}
