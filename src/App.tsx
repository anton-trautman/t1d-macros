import { useMemo, useState } from "react";

/**
 * T1D Food Impact — Macro & Calories Calculator with Multiple Products
 *
 * - User can add/remove products.
 * - Each product has БЖУ/100 г + вес.
 * - Shows per-product results and total summary across all products.
 */

const parseNum = (v: string | number) => {
  if (typeof v === "number") return v;
  const s = v.replace(",", ".").replace(/[^0-9.+-]/g, "");
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
};

const clamp = (n: number, min = 0, max = 1000) =>
  Math.min(max, Math.max(min, n));

const r1 = (n: number, digits = 1) => {
  const p = Math.pow(10, digits);
  return Math.round((n + Number.EPSILON) * p) / p;
};

function calcData(
  carb100: string,
  prot100: string,
  fat100: string,
  weight: string
) {
  const c100 = clamp(parseNum(carb100), 0, 100);
  const p100 = clamp(parseNum(prot100), 0, 100);
  const f100 = clamp(parseNum(fat100), 0, 100);
  const w = clamp(parseNum(weight), 0, 5000);

  const factor = w / 100;

  const cG = c100 * factor;
  const pG = p100 * factor;
  const fG = f100 * factor;

  const kcalC = cG * 4;
  const kcalP = pG * 4;
  const kcalF = fG * 9;

  const kcalTotal = kcalC + kcalP + kcalF;
  const gTotal = cG + pG + fG;

  const pctC = kcalTotal ? (kcalC / kcalTotal) * 100 : 0;
  const pctP = kcalTotal ? (kcalP / kcalTotal) * 100 : 0;
  const pctF = kcalTotal ? (kcalF / kcalTotal) * 100 : 0;

  return {
    c100,
    p100,
    f100,
    w,
    cG,
    pG,
    fG,
    kcalC,
    kcalP,
    kcalF,
    kcalTotal,
    gTotal,
    pctC,
    pctP,
    pctF,
  };
}

export default function App() {
  const [products, setProducts] = useState([
    { carb100: "0", prot100: "0", fat100: "0", weight: "100" },
  ]);

  const totals = useMemo(() => {
    return products.reduce(
      (acc, p) => {
        const d = calcData(p.carb100, p.prot100, p.fat100, p.weight);
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

  const addProduct = () => {
    setProducts([
      ...products,
      { carb100: "0", prot100: "0", fat100: "0", weight: "100" },
    ]);
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, field: string, value: string) => {
    setProducts(
      products.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Калькулятор БЖУ для нескольких продуктов
          </h1>
          <p className="text-slate-600 mt-2 max-w-2xl">
            Добавляйте продукты, вводите БЖУ/100 г и вес — мы посчитаем граммы и
            калории по каждому и общий итог.
          </p>
        </header>

        <div className="space-y-6">
          {products.map((p, idx) => {
            const d = calcData(p.carb100, p.prot100, p.fat100, p.weight);
            return (
              <div
                key={idx}
                className="grid md:grid-cols-2 gap-6 bg-white rounded-2xl shadow p-5"
              >
                {/* Inputs */}
                <section>
                  <h2 className="text-xl font-semibold mb-4">
                    Продукт {idx + 1}
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    <InputField
                      label="Углеводы на 100 г (г)"
                      value={p.carb100}
                      onChange={(v) => updateProduct(idx, "carb100", v)}
                    />
                    <InputField
                      label="Белки на 100 г (г)"
                      value={p.prot100}
                      onChange={(v) => updateProduct(idx, "prot100", v)}
                    />
                    <InputField
                      label="Жиры на 100 г (г)"
                      value={p.fat100}
                      onChange={(v) => updateProduct(idx, "fat100", v)}
                    />
                    <InputField
                      label="Вес продукта (г)"
                      value={p.weight}
                      onChange={(v) => updateProduct(idx, "weight", v)}
                    />
                  </div>
                  <button
                    onClick={() => removeProduct(idx)}
                    className="mt-4 rounded-xl px-4 py-2 bg-red-100 hover:bg-red-200 transition"
                  >
                    Удалить продукт
                  </button>
                </section>

                {/* Results */}
                <section>
                  <h2 className="text-xl font-semibold mb-4">Результаты</h2>
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
                        <span className="text-slate-600">Всего БЖУ (г)</span>
                        <span className="font-semibold text-lg">
                          {r1(d.gTotal, 1)} г
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between mt-2">
                        <span className="text-slate-600">Итого калорий</span>
                        <span className="font-semibold text-2xl">
                          {r1(d.kcalTotal, 0)} ккал
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            );
          })}

          <button
            onClick={addProduct}
            className="rounded-2xl border bg-white px-4 py-2 shadow-sm hover:shadow transition"
          >
            ➕ Добавить продукт
          </button>

          {/* Summary */}
          <section className="bg-white rounded-2xl shadow p-5">
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
        </div>

        <footer className="text-xs text-slate-500 mt-6">
          © {new Date().getFullYear()} T1D Food Impact · Сделано с заботой 💙
        </footer>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm text-slate-600 mb-1">{label}</label>
      <input
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
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
    <div className="rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{label}</div>
          <div className="text-xs text-slate-500">{hint}</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold">{r1(grams, 1)} г</div>
          <div className="text-sm text-slate-600">
            {r1(kcal, 0)} ккал · {r1(pct, 0)}%
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-3">
      <span className="text-slate-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
