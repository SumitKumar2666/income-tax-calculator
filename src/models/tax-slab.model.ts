export interface TaxSlab {
    minIncome: number;
    maxIncome: number;
    taxRate: number;
}
  
export const TAX_SLABS: TaxSlab[] = [
  { minIncome: 0, maxIncome: 350000, taxRate: 0 },
  { minIncome: 350001, maxIncome: 625000, taxRate: 0.09 },
  { minIncome: 625001, maxIncome: 1200000, taxRate: 0.18 },
  { minIncome: 1200001, maxIncome: Infinity, taxRate: 0.35 }
];