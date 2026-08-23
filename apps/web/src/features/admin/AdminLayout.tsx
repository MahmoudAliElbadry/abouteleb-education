import { NavLink, Outlet } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext.js';

const navCopy = {
  ar: {
    orders: 'الطلبات',
    universities: 'الجامعات',
    testimonials: 'آراء العملاء',
    social: 'الروابط الاجتماعية',
    contact: 'بيانات التواصل',
  },
  en: {
    orders: 'Orders',
    universities: 'Universities',
    testimonials: 'Testimonials',
    social: 'Social links',
    contact: 'Contact',
  },
  tr: {
    orders: 'Siparişler',
    universities: 'Üniversiteler',
    testimonials: 'Referanslar',
    social: 'Sosyal bağlantılar',
    contact: 'İletişim',
  },
} as const;

const navItems = [
  { to: '/admin/orders', key: 'orders' },
  { to: '/admin/universities', key: 'universities' },
  { to: '/admin/testimonials', key: 'testimonials' },
  { to: '/admin/social-links', key: 'social' },
  { to: '/admin/contact', key: 'contact' },
] as const;

export function AdminLayout() {
  const { language } = useLanguage();
  const t = navCopy[language];

  return (
    <div className="admin-shell" dir={language === 'ar' ? 'rtl' : 'ltr'} lang={language}>
      <nav className="admin-sidebar" aria-label="Admin sections">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
          >
            {t[item.key]}
          </NavLink>
        ))}
      </nav>
      <div className="admin-shell-content">
        <Outlet />
      </div>
    </div>
  );
}
