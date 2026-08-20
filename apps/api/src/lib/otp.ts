import { createHash, randomInt } from 'node:crypto';

export function generateOtp() {
  return randomInt(100_000, 1_000_000).toString();
}

export function hashOtp(code: string) {
  return createHash('sha256').update(code).digest('hex');
}
