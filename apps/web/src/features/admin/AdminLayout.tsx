import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext.js';

const navCopy = {
  ar: {
    orders: 'الطلبات',
    universities: 'الجامعات',
    testimonials: 'آراء العملاء',
    contactSocial: 'التواصل والروابط',
    home: 'العودة إلى الصفحة الرئيسية',
    menu: 'فتح قائمة الإدارة',
    closeMenu: 'إغلاق قائمة الإدارة',
  },
  en: {
    orders: 'Orders',
    universities: 'Universities',
    testimonials: 'Testimonials',
    contactSocial: 'Contact & social',
    home: 'Return to home page',
    menu: 'Open admin navigation',
    closeMenu: 'Close admin navigation',
  },
  tr: {
    orders: 'Siparişler',
    universities: 'Üniversiteler',
    testimonials: 'Referanslar',
    contactSocial: 'İletişim ve sosyal',
    home: 'Ana sayfaya dön',
    menu: 'Yönetim menüsünü aç',
    closeMenu: 'Yönetim menüsünü kapat',
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
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  return (
    <div className="admin-shell" dir={language === 'ar' ? 'rtl' : 'ltr'} lang={language}>
      <button
        className="admin-navigation-toggle"
        type="button"
        aria-controls="admin-navigation"
        aria-expanded={isNavigationOpen}
        aria-label={isNavigationOpen ? t.closeMenu : t.menu}
        onClick={() => setIsNavigationOpen((isOpen) => !isOpen)}
      >
        ☰ {isNavigationOpen ? t.closeMenu : t.menu}
      </button>
      <nav
        id="admin-navigation"
        className={`admin-sidebar${isNavigationOpen ? ' is-open' : ''}`}
        aria-label="Admin sections"
      >
        <div className="admin-sidebar-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
              onClick={() => setIsNavigationOpen(false)}
            >
              {t[item.key]}
            </NavLink>
          ))}
        </div>
        <NavLink className="admin-sidebar-home" to="/" onClick={() => setIsNavigationOpen(false)}>
          ← {t.home}
        </NavLink>
      </nav>
      <div className="admin-shell-content">
        <Outlet />
      </div>
    </div>
  );
}
