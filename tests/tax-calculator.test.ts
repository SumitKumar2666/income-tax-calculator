import { TaxCalculatorService } from '../src/services/tax-calculator.service';
import request from 'supertest';
import server from '../src/index';

describe('TaxCalculatorService', () => {
  const taxCalculator = new TaxCalculatorService();

  test('calculates tax for income of 0', () => {
    expect(taxCalculator.calculateTax(0)).toBe(0);
  });

  test('calculates tax for income of 2,50,000', () => {
    expect(taxCalculator.calculateTax(250000)).toBe(0);
  });

  test('calculates tax for income of 5,00,000', () => {
    const expectedTax = (5_00_000 - 3_50_000) * 0.09;
    expect(taxCalculator.calculateTax(500000)).toBeCloseTo(expectedTax);
  });

  test('calculates tax for income of 25,00,000', () => {
    const expectedTax = 
      0 +                          // 0-3,50,000
      (2_75_000 * 0.09) +           // 3,50,001 - 6,25,000
      (5_75_000 * 0.18) +           // 6,25,001 - 12,00,000
      (13_00_000 * 0.35);           // 12,00,001 and above
    
    expect(taxCalculator.calculateTax(2_500_000)).toBeCloseTo(expectedTax);
  });

  test('throws error for negative income', () => {
    expect(() => taxCalculator.calculateTax(-1000)).toThrow('Income must be a non-negative number');
  });
});

describe('Tax Calculator API', () => {
  afterAll(done => {
    server.close(done);
  });

  test('GET /health endpoint', async () => {
    const response = await request(server).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'tax calculation server is healthy' });
  });

  test('POST /calculate-tax with valid income', async () => {
    const response = await request(server)
      .post('/calculate-tax')
      .send({ income: 2_500_000 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('income', 2_500_000);
    expect(response.body).toHaveProperty('taxPayable');
  });

  test('POST /calculate-tax with invalid income', async () => {
    const response = await request(server)
      .post('/calculate-tax')
      .send({ income: -1000 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});