import { TaxSlab, TAX_SLABS } from '../models/tax-slab.model';
import { ValidationUtil } from '../utils/validation-util';

export class TaxCalculatorService {
  private readonly INCOME_OFFSET = 1;
  
  private validateIncome(income: number): void {
    ValidationUtil.validateIncome(income);
  }

  // The offset is added to ensure that the taxable income for a particular slab is calculated correctly. 
  // This is particularly useful when calculating the range between slabs, to include the first income 
  // that falls within a new slab (i.e., preventing any rounding errors or missing amounts). Usable in income like 350000.5
  private getTaxableIncomeForSlab(income: number, slab: TaxSlab): number {
    if (income <= (slab.minIncome - this.INCOME_OFFSET)) return 0;
    
    const taxableIncomeInSlab = Math.min(
      income - slab.minIncome + this.INCOME_OFFSET,
      slab.maxIncome - slab.minIncome + this.INCOME_OFFSET
    );

    return Math.max(taxableIncomeInSlab, 0);
  }

  private calculateTaxForSlab(income: number, slab: TaxSlab): number {
    const taxableIncome = this.getTaxableIncomeForSlab(income, slab);
    return taxableIncome * slab.taxRate;
  }

  calculateTax(income: number): number {
    this.validateIncome(income);

    return TAX_SLABS.reduce((totalTax, slab) => {
        return totalTax + this.calculateTaxForSlab(income, slab);
    }, 0);
  }
}
