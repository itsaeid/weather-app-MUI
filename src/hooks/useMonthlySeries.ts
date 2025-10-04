import { useMemo } from "react";

export type Daily = { date: string; tempMax: number };
export type Point = { name: string; temp: number | null };

function buildMonthlySeries(daily?: Daily[], lang = "en"): Point[] {
  const agg = new Map<string, { sum: number; count: number }>();
  daily?.forEach((d) => {
    const dt = new Date(d.date);
    const key = `${dt.getFullYear()}-${dt.getMonth()}`;
    const cur = agg.get(key) || { sum: 0, count: 0 };
    cur.sum += Number(d.tempMax);
    cur.count += 1;
    agg.set(key, cur);
  });

  const out: Point[] = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const m = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${m.getFullYear()}-${m.getMonth()}`;
    const label = m.toLocaleDateString(lang, { month: "short" });
    const a = agg.get(key);
    out.push({ name: label, temp: a ? +(a.sum / a.count).toFixed(1) : null });
  }
  return out;
}

export function useMonthlySeries(daily?: Daily[], lang = "en") {
  return useMemo(() => buildMonthlySeries(daily, lang), [daily, lang]);
}
