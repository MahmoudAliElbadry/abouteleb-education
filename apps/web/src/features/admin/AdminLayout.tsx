import { NavLink, Outlet } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext.js';

const navCopy = {
  ar: {
    orders: 'الطلبات',
    universities: 'الجامعات',
    testimonials: 'آراء العملاء',
    contactSocial: 'التواصل والروابط',
    home: 'العودة إلى الصفحة الرئيسية',
  },
  en: {
    orders: 'Orders',
    universities: 'Universities',
    testimonials: 'Testimonials',
    contactSocial: 'Contact & social',
    home: 'Return to home page',
  },
  tr: {
    orders: 'Siparişler',
    universities: 'Üniversiteler',
    testimonials: 'Referanslar',
    contactSocial: 'İletişim ve sosyal',
    home: 'Ana sayfaya dön',
  },
} as const;

const navItems = [
  { to: '/admin/orders', key: 'orders' },
  { to: '/admin/universities', key: 'universities' },
  { to: '/admin/testimonials', key: 'testimonials' },
  { to: '/admin/contact-social', key: 'contactSocial' },
] as const;

export function AdminLayout() {
  const { language } = useLanguage();
  const t = navCopy[language];

  return (
    <div className="admin-shell" dir={language === 'ar' ? 'rtl' : 'ltr'} lang={language}>
      <nav className="admin-sidebar" aria-label="Admin sections">
        <div className="admin-sidebar-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            >
              {t[item.key]}
            </NavLink>
          ))}
        </div>
        <NavLink className="admin-sidebar-home" to="/">
          ← {t.home}
        </NavLink>
      </nav>
      <div className="admin-shell-content">
        <Outlet />
      </div>
    </div>
  );
}
