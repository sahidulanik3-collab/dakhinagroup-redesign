import { describe, it, expect } from 'vitest';
import { validateFormSecurity } from '../lib/utils';
import { InquiryFormSchema, CallbackFormSchema, VisitScheduleFormSchema } from '../data/schema';

describe('Form Validation & Anti-Spam Security', () => {
  it('blocks submissions that trigger honeypot traps', () => {
    const startTime = Date.now() - 5000; // 5 seconds ago
    const result = validateFormSecurity('http://spam-link.ru', startTime);
    expect(result.valid).toBe(false);
    expect(result.reason).toContain('honeypot');
  });

  it('blocks unnatural sub-2 second automated bot form fills', () => {
    const startTime = Date.now() - 500; // only 0.5s elapsed
    const result = validateFormSecurity('', startTime);
    expect(result.valid).toBe(false);
    expect(result.reason).toContain('unnaturally fast');
  });

  it('permits legitimate human submissions after 2.5 seconds with empty honeypot', () => {
    const startTime = Date.now() - 3000; // 3.0s elapsed
    const result = validateFormSecurity('', startTime);
    expect(result.valid).toBe(true);
  });

  it('validates InquiryFormSchema against valid and invalid inputs', () => {
    const validData = {
      fullName: 'Brigadier General (Retd.) Rahman',
      email: 'rahman@defense.gov.bd',
      phone: '+8801711000000',
      propertyInterest: 'Lakeview Villa #12',
      message: 'Kindly send legal verification documents and schedule a site inspection.',
      honeypot: '',
      formStartTime: Date.now() - 5000,
    };
    expect(InquiryFormSchema.safeParse(validData).success).toBe(true);

    const invalidEmail = { ...validData, email: 'not-an-email' };
    expect(InquiryFormSchema.safeParse(invalidEmail).success).toBe(false);

    const shortMessage = { ...validData, message: 'Too short' };
    expect(InquiryFormSchema.safeParse(shortMessage).success).toBe(false);
  });

  it('validates CallbackFormSchema and VisitScheduleFormSchema', () => {
    const callbackData = {
      fullName: 'Major General (Retd.) Karim',
      phone: '+8801407048190',
      preferredTime: 'morning',
      honeypot: '',
      formStartTime: Date.now() - 4000,
    };
    expect(CallbackFormSchema.safeParse(callbackData).success).toBe(true);

    const visitData = {
      fullName: 'Wing Commander (Retd.) Tariq',
      email: 'tariq@baf.mil.bd',
      phone: '+8801819000000',
      visitDate: '2026-11-01',
      visitTime: '11:00 AM',
      numberOfGuests: 3,
      pickupNeeded: true,
      honeypot: '',
      formStartTime: Date.now() - 6000,
    };
    expect(VisitScheduleFormSchema.safeParse(visitData).success).toBe(true);
  });
});
