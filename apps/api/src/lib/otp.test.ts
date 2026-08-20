import { describe, expect, it } from 'vitest';
import { generateOtp, hashOtp } from './otp.js';

describe('OTP helpers', () => {
  it('generates a six-digit code', () => {
    expect(generateOtp()).toMatch(/^\d{6}$/);
  });

  it('hashes the same code deterministically', () => {
    expect(hashOtp('123456')).toBe(hashOtp('123456'));
    expect(hashOtp('123456')).not.toBe(hashOtp('654321'));
  });
});
