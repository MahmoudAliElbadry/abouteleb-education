import { ContactAdminSection } from './ContactAdminSection.js';
import { SocialLinksAdminSection } from './SocialLinksAdminSection.js';
import { TestimonialsAdminSection } from './TestimonialsAdminSection.js';
import { useLanguage, type Language } from '../i18n/LanguageContext.js';

export type AdminLanguage = Language;
export type AdminContentMode = 'testimonials' | 'contact-social';
export const adminContentCopy = {
  ar: {
    title: 'التواصل والروابط',
    testimonials: 'آراء العملاء',
    social: 'الروابط الاجتماعية',
    contact: 'بيانات التواصل',
  },
  en: {
    title: 'Contact & social',
    testimonials: 'Testimonials',
    social: 'Social links',
    contact: 'Contact details',
  },
  tr: {
    title: 'İletişim ve sosyal',
    testimonials: 'Referanslar',
    social: 'Sosyal bağlantılar',
    contact: 'İletişim bilgileri',
  },
} as const;
export function AdminManagedContentPage({ mode = 'testimonials' }: { mode?: AdminContentMode }) {
  const { language, setLanguage } = useLanguage();
  return (
    <main className="admin-page">
      <header className="admin-header">
        <h1>
          {mode === 'testimonials'
            ? adminContentCopy[language].testimonials
            : adminContentCopy[language].title}
        </h1>
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
      {mode === 'testimonials' ? (
        <section className="admin-panel">
          <TestimonialsAdminSection language={language} />
        </section>
      ) : (
        <section className="admin-content-grid">
          <article className="admin-panel">
            <h2>{adminContentCopy[language].social}</h2>
            <SocialLinksAdminSection language={language} />
          </article>
          <article className="admin-panel">
            <h2>{adminContentCopy[language].contact}</h2>
            <ContactAdminSection language={language} />
          </article>
        </section>
      )}
    </main>
  );
}
