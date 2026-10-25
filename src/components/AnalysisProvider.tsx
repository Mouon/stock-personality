"use client";
import { createContext, useContext, useState } from "react";
import type { Analysis } from "@/types/personality";
const AnalysisContext = createContext<{analysis: Analysis | null; setAnalysis: (analysis: Analysis | null) => void}>({analysis:null,setAnalysis:()=>{}});
export function AnalysisProvider({ children }: { children: React.ReactNode }) { const [analysis,setAnalysis] = useState<Analysis|null>(null); return <AnalysisContext.Provider value={{analysis,setAnalysis}}>{children}</AnalysisContext.Provider>; }
export function useAnalysis() { return useContext(AnalysisContext); }
