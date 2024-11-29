export class ValidationUtil {
    static validateIncome(value: number): void {
      // Check if the value is a number
    if (typeof value !== 'number') {
      throw new Error('Income must be a number');
    }

    // Check if the value is not NaN, Infinity, or -Infinity
    if (isNaN(value) || !isFinite(value)) {
      throw new Error('Income must be a valid number');
    }

    // Check if the value is non-negative (includes zero)
    if (value < 0) {
      throw new Error('Income must be a non-negative number');
    }

    // Check if the value is not falsy (e.g., null or undefined)
    if (value === null || value === undefined) {
      throw new Error('Income must be present');
    }
    }
}