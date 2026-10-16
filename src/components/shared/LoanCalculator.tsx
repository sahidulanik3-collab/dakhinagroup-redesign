import React, { useState, useId } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { formatBDT, calculateLoanEmi, toBanglaDigits } from '../../lib/utils';
import { Calculator, PieChart, Calendar, DollarSign, ArrowRight } from 'lucide-react';

interface LoanCalculatorProps {
  initialPrice?: number;
  className?: string;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({
  initialPrice = 22000000,
  className = '',
}) => {
  const { isBn } = useLanguage();
  const priceInputId = useId();
  const downPaymentInputId = useId();
  const tenureInputId = useId();
  const rateInputId = useId();

  const [price, setPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25);
  const [tenureYears, setTenureYears] = useState<number>(10);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [showAmortization, setShowAmortization] = useState(false);

  const result = calculateLoanEmi(price, downPaymentPercent, interestRate, tenureYears);

  return (
    <div className={`rounded-2xl border bg-white/95 p-6 shadow-xl backdrop-blur-md transition-all text-gray-900 ${className}`}>
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">
              {isBn ? 'কিস্তি ও গৃহঋণ ক্যালকুলেটর (BDT)' : 'Installment & Loan EMI Calculator'}
            </h3>
            <p className="text-xs text-gray-500">
              {isBn ? 'সহজ মাসিক কিস্তি ও ডাউন পেমেন্ট প্রাক্কলন' : 'Calculate monthly payments and schedule for BDT'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Sliders Input Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Property Price */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={priceInputId} className="text-xs font-bold uppercase tracking-wider text-gray-600">
                {isBn ? 'জমির মূল্য / বাজেট' : 'Property Value'}
              </label>
              <span className="font-bold text-sm text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                {formatBDT(price, true, isBn ? 'bn' : 'en')}
              </span>
            </div>
            <input
              id={priceInputId}
              type="range"
              min={5000000}
              max={60000000}
              step={500000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>৳ ৫০ লাখ</span>
              <span>৳ ৩ কোটি</span>
              <span>৳ ৬ কোটি</span>
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={downPaymentInputId} className="text-xs font-bold uppercase tracking-wider text-gray-600">
                {isBn ? 'ডাউন পেমেন্ট' : 'Down Payment'} ({isBn ? toBanglaDigits(downPaymentPercent) : downPaymentPercent}%)
              </label>
              <span className="font-bold text-sm text-gray-800">
                {formatBDT(result.downPaymentAmount, true, isBn ? 'bn' : 'en')}
              </span>
            </div>
            <input
              id={downPaymentInputId}
              type="range"
              min={10}
              max={70}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>১০%</span>
              <span>৪০%</span>
              <span>৭০%</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={tenureInputId} className="text-xs font-bold uppercase tracking-wider text-gray-600">
                {isBn ? 'পরিশোধের মেয়াদ' : 'Loan Tenure'}
              </label>
              <span className="font-bold text-sm text-gray-800">
                {isBn ? `${toBanglaDigits(tenureYears)} বছর` : `${tenureYears} Years`}
              </span>
            </div>
            <input
              id={tenureInputId}
              type="range"
              min={3}
              max={25}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>৩ বছর</span>
              <span>১৫ বছর</span>
              <span>২৫ বছর</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={rateInputId} className="text-xs font-bold uppercase tracking-wider text-gray-600">
                {isBn ? 'বার্ষিক সুদের হার' : 'Annual Interest Rate'}
              </label>
              <span className="font-bold text-sm text-gray-800">
                {isBn ? `${toBanglaDigits(interestRate)}%` : `${interestRate}%`}
              </span>
            </div>
            <input
              id={rateInputId}
              type="range"
              min={6}
              max={15}
              step={0.25}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1">
              <span>৬%</span>
              <span>১০%</span>
              <span>১৫%</span>
            </div>
          </div>
        </div>

        {/* Results Summary Box Column */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-neutral-900 text-white rounded-2xl p-6 shadow-xl border border-neutral-800">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 uppercase tracking-widest font-semibold pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-1.5">
                <PieChart className="h-4 w-4 text-amber-400" />
                <span>{isBn ? 'মাসিক কিস্তির হিসাব' : 'Monthly EMI Summary'}</span>
              </div>
              <span className="text-amber-400 font-mono">BDT</span>
            </div>

            <div className="py-6 text-center">
              <span className="text-xs text-neutral-400 uppercase tracking-wider block mb-1">
                {isBn ? 'আনুমানিক মাসিক ইএমআই' : 'Estimated Monthly EMI'}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight">
                {formatBDT(result.monthlyEmi, false, isBn ? 'bn' : 'en')}
              </div>
              <span className="text-[11px] text-neutral-400 mt-1 block">
                {isBn ? 'ব্যাংক নীতি অনুযায়ী সামান্য পরিবর্তন হতে পারে' : 'Subject to standard bank terms'}
              </span>
            </div>

            <div className="space-y-3 pt-3 border-t border-neutral-800 text-xs">
              <div className="flex justify-between text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                  {isBn ? 'মূল ঋণের পরিমাণ:' : 'Principal Loan:'}
                </span>
                <span className="font-semibold text-white">
                  {formatBDT(result.principalAmount, true, isBn ? 'bn' : 'en')}
                </span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-amber-400" />
                  {isBn ? 'মোট প্রদেয় সুদ:' : 'Total Interest Payable:'}
                </span>
                <span className="font-semibold text-white">
                  {formatBDT(result.totalInterest, true, isBn ? 'bn' : 'en')}
                </span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>{isBn ? 'ডাউন পেমেন্ট সহ মোট:' : 'Total Outflow (Inc. Down Payment):'}</span>
                <span className="font-semibold text-amber-300">
                  {formatBDT(result.totalPayment, true, isBn ? 'bn' : 'en')}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800">
            <button
              onClick={() => setShowAmortization(!showAmortization)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors"
            >
              <span>{showAmortization ? (isBn ? 'তালিকা লুকান' : 'Hide Schedule') : (isBn ? 'বার্ষিক ঋণ পরিশোধের তালিকা' : 'View Annual Amortization')}</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Amortization Table */}
      {showAmortization && (
        <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-in overflow-x-auto">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
            {isBn ? 'বছরভিত্তিক ঋণ পরিশোধ প্রাক্কলন (প্রথম ১০ বছর)' : 'Amortization Breakdown (First 10 Years)'}
          </h4>
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
                <th className="py-2 px-3">{isBn ? 'বছর' : 'Year'}</th>
                <th className="py-2 px-3">{isBn ? 'মূল পরিশোধ' : 'Principal Paid'}</th>
                <th className="py-2 px-3">{isBn ? 'সুদ পরিশোধ' : 'Interest Paid'}</th>
                <th className="py-2 px-3">{isBn ? 'অবশিষ্ট ব্যালেন্স' : 'Ending Balance'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {result.amortizationPreview.map((row) => (
                <tr key={row.year} className="hover:bg-gray-50/50">
                  <td className="py-2 px-3 font-semibold text-gray-800">
                    {isBn ? `বছর ${toBanglaDigits(row.year)}` : `Year ${row.year}`}
                  </td>
                  <td className="py-2 px-3 text-emerald-700">{formatBDT(row.principalPaid, false, isBn ? 'bn' : 'en')}</td>
                  <td className="py-2 px-3 text-amber-700">{formatBDT(row.interestPaid, false, isBn ? 'bn' : 'en')}</td>
                  <td className="py-2 px-3 font-mono text-gray-700">{formatBDT(row.remainingBalance, false, isBn ? 'bn' : 'en')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
