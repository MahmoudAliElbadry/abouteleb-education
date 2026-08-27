import type { EmailLocale, EmailPurpose, OrderNotificationEvent } from './email.provider.js';

export type EmailTemplate = {
  subject: string;
  text: string;
  html: string;
};

type EmailBrand = {
  name: string;
  logoUrl: string;
  brandUrl: string;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

function layout(brand: EmailBrand, content: string, direction: 'ltr' | 'rtl' = 'ltr') {
  const name = escapeHtml(brand.name);
  const logoUrl = escapeHtml(brand.logoUrl);
  const brandUrl = escapeHtml(brand.brandUrl);

  return `<!doctype html>
<html lang="en" dir="${direction}">
  <body style="margin:0;background:#f5f5f5;color:#111111;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f5f5f5;width:100%;">
      <tr><td align="center" style="padding:28px 12px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">
          <tr><td align="center" style="padding:24px 24px 18px;border-top:6px solid #e30613;">
            <a href="${brandUrl}" style="text-decoration:none;">
              <img src="${logoUrl}" width="112" alt="${name}" style="display:block;width:112px;height:auto;border:0;">
            </a>
            <div style="padding-top:10px;color:#111111;font-size:18px;font-weight:700;">${name}</div>
          </td></tr>
          <tr><td style="padding:8px 28px 30px;line-height:1.6;font-size:16px;">${content}</td></tr>
          <tr><td style="padding:18px 28px;border-top:1px solid #eeeeee;color:#666666;font-size:12px;line-height:1.5;">
            <a href="${brandUrl}" style="color:#e30613;text-decoration:none;">${name}</a>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

export function createOtpTemplate(
  input: { code: string; purpose: EmailPurpose; locale?: EmailLocale },
  brand: EmailBrand,
): EmailTemplate {
  const locale = input.locale ?? 'en';
  const subject = {
    ar: input.purpose === 'EMAIL_VERIFY' ? 'تحقق من بريدك الإلكتروني' : 'إعادة تعيين كلمة المرور',
    en: input.purpose === 'EMAIL_VERIFY' ? 'Verify your email' : 'Reset your password',
    tr: input.purpose === 'EMAIL_VERIFY' ? 'E-postanızı doğrulayın' : 'Şifrenizi sıfırlayın',
  }[locale];
  const text = {
    ar: `رمزك من Abou-Taleb Education هو ${input.code}. تنتهي صلاحيته خلال 10 دقائق.`,
    en: `Your Abou-Taleb Education code is ${input.code}. It expires in 10 minutes.`,
    tr: `Abou-Taleb Education kodunuz: ${input.code}. Kod 10 dakika içinde geçerliliğini yitirir.`,
  }[locale];
  const heading = {
    ar: input.purpose === 'EMAIL_VERIFY' ? 'تحقق من بريدك الإلكتروني' : 'إعادة تعيين كلمة المرور',
    en: input.purpose === 'EMAIL_VERIFY' ? 'Verify your email' : 'Reset your password',
    tr: input.purpose === 'EMAIL_VERIFY' ? 'E-postanızı doğrulayın' : 'Şifrenizi sıfırlayın',
  }[locale];
  const codeLabel = { ar: 'رمز التحقق', en: 'Your code', tr: 'Kodunuz' }[locale];
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return {
    subject,
    text,
    html: layout(
      brand,
      `<h1 style="margin:0 0 16px;color:#111111;font-size:24px;">${heading}</h1>
       <p style="margin:0 0 18px;">${escapeHtml(text)}</p>
       <div style="margin:22px 0;padding:16px;text-align:center;background:#fff1f2;border:1px solid #e30613;border-radius:6px;">
         <div style="color:#666666;font-size:13px;">${codeLabel}</div>
         <div style="margin-top:6px;color:#e30613;font-size:30px;font-weight:700;letter-spacing:6px;">${escapeHtml(input.code)}</div>
       </div>
       <p style="margin:0;color:#666666;font-size:13px;">${locale === 'ar' ? 'تنتهي صلاحية هذا الرمز خلال 10 دقائق.' : locale === 'tr' ? 'Bu kodun süresi 10 dakika içinde dolar.' : 'This code expires in 10 minutes.'}</p>`,
      direction,
    ),
  };
}

export function createOrderTemplate(
  input: {
    reference: string;
    event: OrderNotificationEvent;
    newStatus?: string;
    clientVisibleMessage?: string;
  },
  brand: EmailBrand,
): EmailTemplate {
  const status = input.newStatus ?? 'updated';
  const escapedReference = escapeHtml(input.reference);
  const escapedStatus = escapeHtml(status);
  const escapedMessage = input.clientVisibleMessage ? escapeHtml(input.clientVisibleMessage) : null;
  const subject =
    input.event === 'submitted'
      ? `تم استلام طلب التقديم | Application request received: ${input.reference}`
      : `تحديث طلب التقديم | Application request update: ${input.reference}`;
  const arabicText =
    input.event === 'submitted'
      ? `تم استلام طلب التقديم الخاص بك ${input.reference}.`
      : `تم تحديث طلب التقديم الخاص بك ${input.reference}. الحالة الحالية: ${status}.`;
  const englishText =
    input.event === 'submitted'
      ? `We received your application request ${input.reference}.`
      : `Your application request ${input.reference} is now ${status}.`;
  const messageText = input.clientVisibleMessage
    ? `\n\nرسالة من المستشار / Message from your consultant:\n${input.clientVisibleMessage}`
    : '';
  const arabicTitle = input.event === 'submitted' ? 'تم استلام طلب التقديم' : 'تحديث طلب التقديم';
  const englishTitle =
    input.event === 'submitted' ? 'Application request received' : 'Application request update';
  const messageHtml = escapedMessage
    ? `<div style="margin-top:18px;padding:14px 16px;background:#fff7ed;border:1px solid #fed7aa;border-radius:6px;">
         <div dir="rtl" style="font-weight:700;">رسالة من المستشار</div>
         <div dir="ltr" style="margin-top:4px;color:#666666;font-size:13px;">Message from your consultant</div>
         <p style="margin:10px 0 0;white-space:pre-wrap;">${escapedMessage}</p>
       </div>`
    : '';

  return {
    subject,
    text: `${arabicText}\n\n${englishText}${messageText}`,
    html: layout(
      brand,
      `<section dir="rtl" lang="ar" style="text-align:right;">
         <h1 style="margin:0 0 16px;color:#111111;font-size:24px;">${arabicTitle}</h1>
         <p style="margin:0 0 18px;">${escapeHtml(arabicText)}</p>
       </section>
       <hr style="margin:24px 0;border:0;border-top:1px solid #eeeeee;">
       <section dir="ltr" lang="en" style="text-align:left;">
         <h1 style="margin:0 0 16px;color:#111111;font-size:24px;">${englishTitle}</h1>
         <p style="margin:0 0 18px;">${escapeHtml(englishText)}</p>
       </section>
       <div style="padding:14px 16px;background:#f7f7f7;border-left:4px solid #e30613;">
         <div style="color:#666666;font-size:13px;">مرجع الطلب / Application reference</div>
         <div dir="ltr" style="margin-top:4px;font-weight:700;">${escapedReference}</div>
         ${input.event === 'status_changed' ? `<div style="margin-top:12px;color:#666666;font-size:13px;">الحالة الحالية / Current status</div><div dir="ltr" style="margin-top:4px;font-weight:700;color:#e30613;">${escapedStatus}</div>` : ''}
       </div>
       ${messageHtml}`,
    ),
  };
}
