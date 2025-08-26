import type { Product } from "../../../types";
import { calcData, r1 } from "../../../utils";

export function Results({ product }: { product: Product }) {
  const d = calcData(
    product.carbs,
    product.protein,
    product.fat,
    product.weight
  );
  return (
    <>
      {/* Results */}
      <section>
        <h2 className="text-lg font-semibold mb-4 md:mb-10">Результаты</h2>
        <div className="grid grid-cols-1 gap-4">
          <MacroRow
            label="Углеводы"
            grams={d.cG}
            kcal={d.kcalC}
            pct={d.pctC}
            hint="4 ккал/г"
          />
          <MacroRow
            label="Белки"
            grams={d.pG}
            kcal={d.kcalP}
            pct={d.pctP}
            hint="4 ккал/г"
          />
          <MacroRow
            label="Жиры"
            grams={d.fG}
            kcal={d.kcalF}
            pct={d.pctF}
            hint="9 ккал/г"
          />
          <div className="mt-2 border-t pt-4">
            <div className="flex items-baseline justify-between">
              <span className="text-slate-600 dark:text-slate-300">
                Всего БЖУ (г)
              </span>
              <span className="font-semibold text-lg">{r1(d.gTotal, 1)} г</span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-slate-600 dark:text-slate-300">
                Итого калорий
              </span>
              <span className="font-semibold text-2xl">
                {r1(d.kcalTotal, 0)} ккал
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MacroRow({
  label,
  grams,
  kcal,
  pct,
  hint,
}: {
  label: string;
  grams: number;
  kcal: number;
  pct: number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{label}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {hint}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold">{grams.toFixed(1)} г</div>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            {kcal.toFixed(0)} ккал · {pct.toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
}
