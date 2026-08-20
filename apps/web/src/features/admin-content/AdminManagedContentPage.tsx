import { useState } from 'react';
import { ContactAdminSection } from './ContactAdminSection.js';
import { SocialLinksAdminSection } from './SocialLinksAdminSection.js';
import { TestimonialsAdminSection } from './TestimonialsAdminSection.js';

export type AdminContentSection = 'testimonials' | 'social' | 'contact';
export type AdminLanguage = 'ar' | 'en' | 'tr';
export const adminContentCopy = {
  ar: { testimonials: 'آراء العملاء', social: 'الروابط الاجتماعية', contact: 'بيانات التواصل' },
  en: { testimonials: 'Testimonials', social: 'Social links', contact: 'Contact details' },
  tr: { testimonials: 'Referanslar', social: 'Sosyal bağlantılar', contact: 'İletişim bilgileri' },
} as const;
export function AdminManagedContentPage({
  section = 'testimonials',
}: {
  section?: AdminContentSection;
}) {
  const [language, setLanguage] = useState<AdminLanguage>('en');
  return (
    <main className="admin-page">
      <header>
        <h1>{adminContentCopy[language][section]}</h1>
        <select
          aria-label="Language"
          value={language}
          onChange={(event) => setLanguage(event.target.value as AdminLanguage)}
        >
          <option value="ar">العربية</option>
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
        </select>
      </header>
      {section === 'testimonials' ? <TestimonialsAdminSection language={language} /> : null}
      {section === 'social' ? <SocialLinksAdminSection language={language} /> : null}
      {section === 'contact' ? <ContactAdminSection language={language} /> : null}
    </main>
  );
}
