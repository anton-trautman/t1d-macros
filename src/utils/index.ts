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
