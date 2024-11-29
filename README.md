# Income Tax Calculator

## Project Description
A TypeScript-based tax calculator that computes income tax based on predefined tax slabs.

## Features
- Calculate tax for different income levels
- Input validation
- Supports multiple tax slabs
- Precise tax calculation
- Comprehensive unit testing

## Prerequisites
- Node.js (v14 or later)
- npm

## Setup Instructions
1. Clone the repository
2. Install dependencies: \`npm install\`
3. Run tests: \`npm test\`
4. Build project: \`npm run build\`
5. Run application: \`npm start\`

## Tax Slabs
- 0 - 3,50,000: 0% tax
- 3,50,001 - 6,25,000: 9% tax
- 6,25,001 - 12,00,000: 18% tax
- 12,00,001 and above: 35% tax

## Assumptions
- Tax for income between the maxIncome in any slab and minIncome of next slab is calculated with the rate of next slab. Example Income = 3,50,000.5, taxable income = 0.5, rate 9%, tax payable = 0.045.