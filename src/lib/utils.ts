import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number into Bangladeshi Taka (BDT)
 * e.g. 24500000 -> "৳ 2.45 Crore" or full formatted "৳ 24,500,000"
 */
export function formatBDT(amount: number, compact: boolean = false, lang: 'en' | 'bn' = 'en'): string {
  if (compact) {
    if (amount >= 10000000) {
      const crore = (amount / 10000000).toFixed(2);
      return lang === 'bn' ? `৳ ${toBanglaDigits(crore)} কোটি` : `৳ ${crore} Cr`;
    }
    if (amount >= 100000) {
      const lakh = (amount / 100000).toFixed(2);
      return lang === 'bn' ? `৳ ${toBanglaDigits(lakh)} লাখ` : `৳ ${lakh} Lac`;
    }
  }

  const formatted = new Intl.NumberFormat(lang === 'bn' ? 'bn-BD' : 'en-IN').format(amount);
  return `৳ ${formatted}`;
}

/**
 * Convert western digits to Bangla numerals
 */
export function toBanglaDigits(num: number | string): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
}

/**
 * Real Estate Loan EMI Calculator in BDT
 * Formula: EMI = [P x r x (1 + r)^n] / [(1 + r)^n - 1]
 * P = Principal loan amount
 * r = Monthly interest rate (annualRate / 12 / 100)
 * n = Tenure in months (tenureYears * 12)
 */
export interface EmiCalculationResult {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  principalAmount: number;
  downPaymentAmount: number;
  amortizationPreview: {
    year: number;
    principalPaid: number;
    interestPaid: number;
    remainingBalance: number;
  }[];
}

export function calculateLoanEmi(
  propertyPrice: number,
  downPaymentPercent: number,
  interestRateAnnual: number,
  tenureYears: number
): EmiCalculationResult {
  const downPaymentAmount = Math.round(propertyPrice * (downPaymentPercent / 100));
  const principalAmount = Math.max(0, propertyPrice - downPaymentAmount);

  if (principalAmount <= 0 || tenureYears <= 0 || interestRateAnnual <= 0) {
    return {
      monthlyEmi: 0,
      totalInterest: 0,
      totalPayment: downPaymentAmount,
      principalAmount: 0,
      downPaymentAmount,
      amortizationPreview: [],
    };
  }

  const monthlyRate = interestRateAnnual / 12 / 100;
  const totalMonths = tenureYears * 12;

  const monthlyEmi = Math.round(
    (principalAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = Math.round(monthlyEmi * totalMonths);
  const totalInterest = Math.max(0, totalPayment - principalAmount);

  // Generate annual preview
  const amortizationPreview = [];
  let balance = principalAmount;

  for (let year = 1; year <= Math.min(tenureYears, 10); year++) {
    let yearInterest = 0;
    let yearPrincipal = 0;

    for (let m = 0; m < 12; m++) {
      const monthInt = balance * monthlyRate;
      const monthPrin = monthlyEmi - monthInt;
      yearInterest += monthInt;
      yearPrincipal += monthPrin;
      balance = Math.max(0, balance - monthPrin);
    }

    amortizationPreview.push({
      year,
      principalPaid: Math.round(yearPrincipal),
      interestPaid: Math.round(yearInterest),
      remainingBalance: Math.round(balance),
    });
  }

  return {
    monthlyEmi,
    totalInterest,
    totalPayment: totalPayment + downPaymentAmount,
    principalAmount,
    downPaymentAmount,
    amortizationPreview,
  };
}

/**
 * Validate anti-spam form submission (honeypot + time-trap)
 */
export function validateFormSecurity(honeypot: string, startTime: number): { valid: boolean; reason?: string } {
  if (honeypot && honeypot.trim().length > 0) {
    return { valid: false, reason: 'Spam bot detected via honeypot' };
  }
  const elapsedSeconds = (Date.now() - startTime) / 1000;
  if (elapsedSeconds < 2.0) {
    return { valid: false, reason: 'Submission completed unnaturally fast' };
  }
  return { valid: true };
}
