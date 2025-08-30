export const parseNum = (v: string | number) => {
  if (typeof v === "number") return v;
  const s = v.replace(",", ".").replace(/[^0-9.+-]/g, "");
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
};

export const clamp = (n: number, min = 0, max = 1000) =>
  Math.min(max, Math.max(min, n));

export const r1 = (n: number, digits = 1) => {
  const p = Math.pow(10, digits);
  return Math.round((n + Number.EPSILON) * p) / p;
};

export function calcData(
  carb100: string,
  prot100: string,
  fat100: string,
  weight: string
) {
  const c100 = clamp(parseNum(carb100), 0, 100);
  const p100 = clamp(parseNum(prot100), 0, 100);
  const f100 = clamp(parseNum(fat100), 0, 100);
  const w = clamp(parseNum(weight), 0, 5000);

  const factor = r1(w / 100, 2);

  const cG = c100 * factor;
  const pG = p100 * factor;
  const fG = f100 * factor;

  const kcalC = r1(cG * 4, 2);
  const kcalP = r1(pG * 4, 2);
  const kcalF = r1(fG * 9, 2);

  const kcalTotal = r1(kcalC + kcalP + kcalF, 2);
  const gTotal = cG + pG + fG;

  const pctC = kcalTotal ? (kcalC / kcalTotal) * 100 : 0;
  const pctP = kcalTotal ? (kcalP / kcalTotal) * 100 : 0;
  const pctF = kcalTotal ? (kcalF / kcalTotal) * 100 : 0;

  return {
    carbs: {
      percent: pctC,
      kcal: kcalC,
      grams: cG,
    },
    protein: {
      percent: pctP,
      kcal: kcalP,
      grams: pG,
    },
    fat: {
      percent: pctF,
      kcal: kcalF,
      grams: fG,
    },
    total: {
      kcal: kcalTotal,
      grams: gTotal,
    },
    weight: w,
  };
}
