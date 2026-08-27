import { describe, expect, it } from 'vitest';
import { createOrderTemplate, createOtpTemplate } from './email.templates.js';

const brand = {
  name: 'Abou-Taleb Education',
  logoUrl: 'https://aboutalebeducation.com/images/email-logo.png',
  brandUrl: 'https://aboutalebeducation.com',
};

describe('transactional email templates', () => {
  it('renders the shared branded layout and OTP fallback', () => {
    const template = createOtpTemplate(
      { code: '123456', purpose: 'EMAIL_VERIFY', locale: 'en' },
      brand,
    );

    expect(template.text).toBe(
      'Your Abou-Taleb Education code is 123456. It expires in 10 minutes.',
    );
    expect(template.html).toContain('https://aboutalebeducation.com/images/email-logo.png');
    expect(template.html).toContain('Abou-Taleb Education');
    expect(template.html).toContain('#e30613');
    expect(template.html).toContain('Your code');
  });

  it('escapes order values in HTML without changing the text fallback', () => {
    const template = createOrderTemplate(
      {
        reference: '<ATE&2026>',
        event: 'status_changed',
        newStatus: 'WAITING <CLIENT>',
        clientVisibleMessage: 'Please send <documents>.',
      },
      brand,
    );

    expect(template.text).toContain('<ATE&2026>');
    expect(template.html).toContain('&lt;ATE&amp;2026&gt;');
    expect(template.html).toContain('WAITING &lt;CLIENT&gt;');
    expect(template.html).toContain('Please send &lt;documents&gt;.');
    expect(template.html).toContain('تحديث طلب التقديم');
    expect(template.html).not.toContain('<ATE&2026>');
  });
});
