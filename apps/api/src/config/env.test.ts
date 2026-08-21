import { describe, expect, it } from 'vitest';
import { parseWebOrigins } from './env.js';

describe('parseWebOrigins', () => {
  it('parses a comma-separated origin allowlist', () => {
    expect(
      parseWebOrigins(
        'https://mahmoudalielbadry.github.io, https://aboutalebeducation.com',
      ),
    ).toEqual([
      'https://mahmoudalielbadry.github.io',
      'https://aboutalebeducation.com',
    ]);
  });

  it('rejects an empty allowlist', () => {
    expect(() => parseWebOrigins(' , ')).toThrow('At least one web origin is required');
  });
});
