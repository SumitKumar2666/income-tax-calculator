import 'dotenv/config';
import express, { Request, Response } from 'express';
import { TaxCalculatorService } from './services/tax-calculator.service';
import { ValidationUtil } from './utils/validation-util';

const app = express();
const port = process.env.PORT;
const taxCalculator = new TaxCalculatorService();

app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'tax calculation server is healthy' });
});

// Tax calculation endpoint
app.post('/calculate-tax', (req: Request, res: Response) => {
  try {
    const { income } = req.body;

    // Validate income input
    ValidationUtil.validateIncome(income);

    // Calculate payable tax
    const taxPayable = taxCalculator.calculateTax(income);

    res.status(200).json({ 
      income, 
      taxPayable, 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ error: errorMessage });
  }
});

// Start server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default server;