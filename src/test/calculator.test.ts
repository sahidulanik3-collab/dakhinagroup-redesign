import { describe, it, expect } from 'vitest';
import { calculateLoanEmi, formatBDT, toBanglaDigits } from '../lib/utils';

describe('Loan Calculator & BDT Formatting', () => {
  it('correctly calculates monthly EMI and amortization for a standard 1.5 Cr villa', () => {
    // 15,000,000 BDT, 20% down payment (3,000,000), loan 12,000,000, 9% annual, 15 years
    const result = calculateLoanEmi(15000000, 20, 9, 15);

    expect(result.downPaymentAmount).toBe(3000000);
    expect(result.principalAmount).toBe(12000000);
    expect(result.monthlyEmi).toBeGreaterThan(120000);
    expect(result.monthlyEmi).toBeLessThan(130000);
    expect(result.totalPayment).toBeGreaterThan(result.principalAmount + result.downPaymentAmount);
    expect(result.amortizationPreview.length).toBeGreaterThanOrEqual(10);
  });

  it('handles edge cases safely with zero principal, zero tenure or zero interest', () => {
    const zeroTenure = calculateLoanEmi(10000000, 20, 9, 0);
    expect(zeroTenure.monthlyEmi).toBe(0);

    const fullDownPayment = calculateLoanEmi(10000000, 100, 9, 10);
    expect(fullDownPayment.monthlyEmi).toBe(0);
    expect(fullDownPayment.principalAmount).toBe(0);

    const zeroInterest = calculateLoanEmi(10000000, 20, 0, 10);
    expect(zeroInterest.monthlyEmi).toBe(0);
  });

  it('formats BDT currency accurately in compact and full modes', () => {
    // 2.45 Crore
    const formattedEn = formatBDT(24500000, true, 'en');
    expect(formattedEn).toBe('৳ 2.45 Cr');

    const formattedBn = formatBDT(24500000, true, 'bn');
    expect(formattedBn).toContain('কোটি');
    expect(formattedBn).toContain('২.৪৫');

    // 85 Lakh
    const lakhEn = formatBDT(8500000, true, 'en');
    expect(lakhEn).toBe('৳ 85.00 Lac');
  });

  it('converts western digits to Bangla numerals accurately', () => {
    expect(toBanglaDigits('1234567890')).toBe('১২৩৪৫৬৭৮৯০');
    expect(toBanglaDigits('BDT 6,500 Plot')).toBe('BDT ৬,৫০০ Plot');
  });
});
