"use client";
import { createContext, useContext, useEffect, useState } from "react";
const VisitsContext = createContext<number | null>(null);
let visitRequest: Promise<number | null> | undefined;
export function VisitsProvider({ children }: { children: React.ReactNode }) {
  const [total, setTotal] = useState<number | null>(null);
  useEffect(() => {
    let active = true;
    visitRequest ??= fetch("/api/visits", { method: "POST", signal: AbortSignal.timeout(5000) })
      .then(response => response.ok ? response.json() : null)
      .then(data => data?.enabled && Number.isSafeInteger(data.total) && data.total >= 0 ? data.total as number : null)
      .catch(() => null);
    void visitRequest.then(value => { if (active) setTotal(value); });
    return () => { active = false; };
  }, []);
  return <VisitsContext.Provider value={total}>{children}</VisitsContext.Provider>;
}
export function VisitorCount() {
  const total = useContext(VisitsContext);
  if (total === null) return null;
  return <section className="visitor-count"><span className="eyebrow">YOU ARE IN GOOD COMPANY</span><h2>벌써 {total.toLocaleString("ko-KR")}명이<br/>자기 종목을 찾으러 왔어요.</h2><p>다들 대체 무슨 종목이길래.</p></section>;
}
