import { useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes, useSearchParams } from 'react-router-dom';
import { universities } from './data/universities.js';
import { ApplicationPage } from './ApplicationPage.js';
import { EnrollmentSection } from './features/enrollment/EnrollmentSection.js';
import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  VerifyEmailPage,
} from './features/auth/AuthPages.js';
import { RequireAdmin, RequireAuth } from './features/auth/guards.js';
import { AdminOrderDetailPage, AdminOrdersPage } from './features/admin-orders/AdminOrdersPages.js';
import { ClientOrdersPage } from './features/client-orders/ClientOrdersPage.js';
import { AdminUniversityPage } from './features/admin-content/AdminUniversityPage.js';
import { AdminManagedContentPage } from './features/admin-content/AdminManagedContentPage.js';

type Language = 'ar' | 'en' | 'tr';

export function normalizeCatalogSearch(value: string) {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('tr').replaceAll('ı', 'i');
}

const copy = {
  ar: {
    language: 'العربية',
    languagePicker: 'اللغة',
    home: 'الرئيسية',
    services: 'خدماتنا',
    universities: 'الجامعات',
    registrationSteps: 'خطوات التسجيل',
    contact: 'تواصل معنا',
    apply: 'سجل الآن',
    badge: 'وكيل معتمد لأقوى الجامعات التركية',
    titleBefore: 'مستقبلك الدراسي في',
    titleAccent: 'تركيا',
    titleAfter: 'يبدأ من هنا',
    description:
      'نوفر لك القبولات الجامعية المجانية والتسهيلات اللازمة للدراسة في أفضل الجامعات الخاصة التركية.',
    consult: 'احصل على استشارة مجانية',
    discover: 'اكتشف خدماتنا',
    partners: 'شركاؤنا في النجاح',
    catalogTitle: 'أفضل الجامعات التركية',
    catalogDescription: 'تصفح شركاءنا الأكاديميين وابحث عن الجامعة التي تناسب طموحك.',
    search: 'ابحث باسم الجامعة',
    allCities: 'كل المدن',
    noResults: 'لم نجد جامعة مطابقة. جرّب بحثاً أو مدينة أخرى.',
    showMore: 'عرض المزيد من الجامعات',
    showLess: 'عرض أقل',
    universitiesCount: 'جامعة متعاقدة',
    students: 'طالب مسجل',
    admission: 'قبول مضمون',
    experience: 'سنوات خبرة',
    serviceTag: 'لماذا نحن؟',
    serviceTitle: 'خدماتنا المتكاملة للطلاب',
    serviceCards: [
      ['القبول الجامعي', 'نساعدك في اختيار الجامعة وتجهيز طلب القبول دون رسوم إضافية.'],
      ['خصومات حصرية', 'نمنحك الوصول إلى خصومات الوكيل المعتمد على الرسوم الدراسية.'],
      ['تجهيز الملفات', 'نرتب ملف التقديم والترجمة والتصديقات المطلوبة خطوة بخطوة.'],
      ['تأمين السكن', 'نساعدك في الوصول إلى خيارات سكن مناسبة لميزانيتك وموقع جامعتك.'],
    ],
    stepsTag: 'بساطة الإجراءات',
    stepsTitle: 'خطوات رحلتك معنا',
    steps: [
      ['تواصل معنا', 'أخبرنا عن طموحك الدراسي وسنبدأ بمساعدتك.'],
      ['اختر تخصصك', 'نقترح الخيارات المناسبة لاهتماماتك وميزانيتك.'],
      ['أرسل أوراقك', 'نراجع أوراقك ونجهز ملف التقديم.'],
      ['ابدأ الدراسة', 'نتابع معك حتى بداية رحلتك الجامعية في تركيا.'],
    ],
    ready: 'هل أنت جاهز لبدء مستقبلك؟',
    readyDescription: 'تواصل معنا الآن، وسيتابع معك أحد مستشارينا التعليميين.',
    catalog: 'كتالوج الجامعات',
    notFoundTitle: 'الصفحة غير موجودة',
    returnHome: 'العودة إلى الرئيسية',
  },
  en: {
    language: 'English',
    languagePicker: 'Language',
    home: 'Home',
    services: 'Services',
    universities: 'Universities',
    registrationSteps: 'Registration steps',
    contact: 'Contact',
    apply: 'Apply now',
    badge: 'Authorized agent for leading Turkish universities',
    titleBefore: 'Your academic future in',
    titleAccent: 'Türkiye',
    titleAfter: 'starts here',
    description:
      'We provide free university admissions and the guidance you need to study at leading private universities in Türkiye.',
    consult: 'Get a free consultation',
    discover: 'Explore our services',
    partners: 'Our partners in success',
    catalogTitle: 'Leading Turkish universities',
    catalogDescription:
      'Browse our academic partners and find the university that matches your ambitions.',
    search: 'Search by university name',
    allCities: 'All cities',
    noResults: 'No universities match that search. Try another name or city.',
    showMore: 'Show more universities',
    showLess: 'Show fewer',
    universitiesCount: 'Partner universities',
    students: 'Registered students',
    admission: 'Guaranteed admission',
    experience: 'Years of experience',
    serviceTag: 'Why us?',
    serviceTitle: 'Student support from start to finish',
    serviceCards: [
      [
        'University admission',
        'We help you choose a university and prepare your admission application.',
      ],
      [
        'Exclusive discounts',
        'Access agent-approved tuition discounts not available through direct application.',
      ],
      [
        'Document preparation',
        'We organise translations, certifications, and your application file step by step.',
      ],
      [
        'Accommodation',
        'We help you explore housing suited to your budget and university location.',
      ],
    ],
    stepsTag: 'A simple process',
    stepsTitle: 'Your journey with us',
    steps: [
      ['Contact us', 'Tell us about your academic goals and we will start guiding you.'],
      ['Choose your major', 'We suggest options that fit your interests and budget.'],
      ['Send your documents', 'We review your documents and prepare the application file.'],
      ['Start studying', 'We stay with you until your university journey in Türkiye begins.'],
    ],
    ready: 'Ready to start your future?',
    readyDescription: 'Contact us now and one of our educational consultants will guide you.',
    catalog: 'University catalog',
    notFoundTitle: 'Page not found',
    returnHome: 'Return home',
  },
  tr: {
    language: 'Türkçe',
    languagePicker: 'Dil',
    home: 'Ana sayfa',
    services: 'Hizmetlerimiz',
    universities: 'Üniversiteler',
    registrationSteps: 'Kayıt adımları',
    contact: 'İletişim',
    apply: 'Şimdi başvur',
    badge: 'Önde gelen Türk üniversitelerinin yetkili temsilcisi',
    titleBefore: 'Akademik geleceğiniz',
    titleAccent: "Türkiye'de",
    titleAfter: 'burada başlıyor',
    description:
      "Türkiye'nin seçkin vakıf üniversitelerinde eğitim için ücretsiz kabul desteği ve rehberlik sağlıyoruz.",
    consult: 'Ücretsiz danışmanlık alın',
    discover: 'Hizmetlerimizi keşfedin',
    partners: 'Başarı ortaklarımız',
    catalogTitle: 'Önde gelen Türk üniversiteleri',
    catalogDescription:
      'Akademik ortaklarımızı inceleyin ve hedeflerinize uygun üniversiteyi bulun.',
    search: 'Üniversite adına göre ara',
    allCities: 'Tüm şehirler',
    noResults: 'Eşleşen üniversite bulunamadı. Başka bir ad veya şehir deneyin.',
    showMore: 'Daha fazla üniversite göster',
    showLess: 'Daha az göster',
    universitiesCount: 'Anlaşmalı üniversite',
    students: 'Kayıtlı öğrenci',
    admission: 'Garantili kabul',
    experience: 'Yıllık deneyim',
    serviceTag: 'Neden biz?',
    serviceTitle: 'Öğrenciler için uçtan uca destek',
    serviceCards: [
      [
        'Üniversite kabulü',
        'Üniversite seçmenize ve kabul başvurunuzu hazırlamanıza yardımcı oluyoruz.',
      ],
      ['Özel indirimler', 'Doğrudan başvuruda bulunmayan danışmanlık indirimlerine erişin.'],
      ['Belge hazırlığı', 'Çeviri, tasdik ve başvuru dosyanızı adım adım düzenliyoruz.'],
      [
        'Konaklama',
        'Bütçenize ve üniversite konumunuza uygun konaklama seçeneklerini araştırıyoruz.',
      ],
    ],
    stepsTag: 'Basit süreç',
    stepsTitle: 'Bizimle yolculuğunuz',
    steps: [
      [
        'Bizimle iletişime geçin',
        'Akademik hedeflerinizi paylaşın, size rehberlik etmeye başlayalım.',
      ],
      ['Bölümünüzü seçin', 'İlgi alanlarınıza ve bütçenize uygun seçenekler öneriyoruz.'],
      ['Belgelerinizi gönderin', 'Belgelerinizi inceliyor ve başvuru dosyanızı hazırlıyoruz.'],
      ['Eğitime başlayın', "Türkiye'deki üniversite yolculuğunuz başlayana kadar yanınızdayız."],
    ],
    ready: 'Geleceğinize başlamaya hazır mısınız?',
    readyDescription: 'Şimdi iletişime geçin, eğitim danışmanlarımızdan biri size yardımcı olsun.',
    catalog: 'Üniversite kataloğu',
    notFoundTitle: 'Sayfa bulunamadı',
    returnHome: 'Ana sayfaya dön',
  },
} as const;

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const numericValue = Number(value.replace(/\D/g, ''));
    const prefix = value.startsWith('+') ? '+' : '';
    const suffix = value.endsWith('%') ? '%' : '';
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (reducedMotion) {
      setDisplayValue(value);
      return;
    }

    const duration = 900;
    const startedAt = performance.now();
    let animationFrame = 0;
    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setDisplayValue(`${prefix}${Math.round(numericValue * progress).toLocaleString()}${suffix}`);
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return (
    <div>
      <strong>{displayValue}</strong>
      <span>{label}</span>
    </div>
  );
}

const cityLabels = {
  ar: { Istanbul: 'إسطنبول', Ankara: 'أنقرة', Kocaeli: 'كوجالي' },
  en: { Istanbul: 'Istanbul', Ankara: 'Ankara', Kocaeli: 'Kocaeli' },
  tr: { Istanbul: 'İstanbul', Ankara: 'Ankara', Kocaeli: 'Kocaeli' },
} as const;

function PublicPage() {
  const [language, setLanguage] = useState<Language>('ar');
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [showAllUniversities, setShowAllUniversities] = useState(false);
  const t = copy[language];
  const steps: ReadonlyArray<readonly [string, string]> = t.steps;
  const stats: ReadonlyArray<readonly [string, string]> = [
    ['+50', t.universitiesCount],
    ['+1500', t.students],
    ['100%', t.admission],
    ['+8', t.experience],
  ];
  const direction = language === 'ar' ? 'rtl' : 'ltr';
  const filteredUniversities = useMemo(
    () =>
      universities.filter(
        (university) =>
          normalizeCatalogSearch(university.name).includes(normalizeCatalogSearch(search)) &&
          (!city || university.city === city),
      ),
    [city, search],
  );
  const shownUniversities = showAllUniversities
    ? filteredUniversities
    : filteredUniversities.slice(0, 8);

  return (
    <div className="public-site" dir={direction} lang={language}>
      <header className="topbar">
        <Link className="brand" to="/" aria-label="Abou-Taleb Education">
          <img src="/logo.png" alt="" />
          <span>
            Abou-Taleb <strong>Education</strong>
          </span>
        </Link>
        <nav className={menuOpen ? 'open' : undefined} aria-label="Primary navigation">
          {[
            ['#home', t.home],
            ['#services', t.services],
            ['#universities', t.universities],
            ['#steps', t.registrationSteps],
            ['#contact', t.contact],
          ].map(([href, label]) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <label className="language-picker">
            <span className="sr-only">{t.languagePicker}</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value as Language)}
            >
              {Object.entries(copy).map(([code, labels]) => (
                <option key={code} value={code}>
                  {labels.language}
                </option>
              ))}
            </select>
          </label>
          <a className="button button-small" href="#enroll">
            {t.apply}
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="hero-badge">{t.badge}</p>
            <h1>
              {t.titleBefore} <span>{t.titleAccent}</span> {t.titleAfter}
            </h1>
            <p>{t.description}</p>
            <div className="hero-actions">
              <a className="button" href="#contact">
                {t.consult}
              </a>
              <a className="button button-outline" href="#services">
                {t.discover}
              </a>
            </div>
          </div>
        </section>

        <section className="stats" aria-label="Company statistics">
          {stats.map(([value, label]) => (
            <AnimatedStat key={label} value={value} label={label} />
          ))}
        </section>

        <section className="content-section catalog-section" id="universities">
          <div className="section-heading">
            <p>{t.partners}</p>
            <h2>{t.catalogTitle}</h2>
            <span>{t.catalogDescription}</span>
          </div>
          <div className="catalog-controls">
            <label>
              <span className="sr-only">{t.search}</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t.search}
                type="search"
              />
            </label>
            <label className="city-picker">
              <span className="sr-only">{t.allCities}</span>
              <select value={city} onChange={(event) => setCity(event.target.value)}>
                <option value="">{t.allCities}</option>
                {Object.entries(cityLabels[language]).map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {filteredUniversities.length ? (
            <div className="university-grid">
              {shownUniversities.map((university) => (
                <article className="university-card" key={university.id}>
                  <div className="university-logo">
                    <img src={university.image} alt={`${university.name} logo`} />
                  </div>
                  <h3>{university.name}</h3>
                  <span>{cityLabels[language][university.city]}</span>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty-state" role="status">
              {t.noResults}
            </p>
          )}
          {filteredUniversities.length > 8 && (
            <button
              className="catalog-toggle"
              type="button"
              onClick={() => setShowAllUniversities((showAll) => !showAll)}
            >
              {showAllUniversities ? t.showLess : t.showMore}
            </button>
          )}
        </section>

        <section className="content-section services" id="services">
          <div className="section-heading">
            <p>{t.serviceTag}</p>
            <h2>{t.serviceTitle}</h2>
          </div>
          <div className="service-grid">
            {t.serviceCards.map(([title, description], index) => (
              <article className="service-card" key={title}>
                <span aria-hidden="true">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section steps" id="steps">
          <div className="section-heading">
            <p>{t.stepsTag}</p>
            <h2>{t.stepsTitle}</h2>
          </div>
          <ol className="steps-list">
            {steps.map(([title, description], index) => (
              <li key={title}>
                <span>{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>
        <EnrollmentSection language={language} />
      </main>

      <section className="contact" id="contact">
        <div>
          <p>{t.catalog}</p>
          <h2>{t.ready}</h2>
          <span>{t.readyDescription}</span>
        </div>
        <a className="button" href="https://wa.me/905015959880" target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </section>
      <a
        className="whatsapp"
        href="https://wa.me/905015959880"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M19.11 17.54c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.08-1.77-.88-2.93-1.56-4.1-3.54-.31-.54.31-.5.89-1.68.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.13-.27-.2-.57-.35ZM16 2.67a13.33 13.33 0 0 0-11.6 20l-1.1 4.03 4.14-1.08A13.33 13.33 0 1 0 16 2.67Zm0 24A10.67 10.67 0 0 1 10.56 25l-.39-.23-2.46.64.66-2.4-.25-.4A10.67 10.67 0 1 1 16 26.67Z" />
        </svg>
      </a>
    </div>
  );
}

function NotFoundPage() {
  const [searchParams] = useSearchParams();
  const language = searchParams.get('lang');
  const t = copy[language === 'en' || language === 'tr' ? language : 'ar'];
  return (
    <main
      className="not-found"
      dir={language === 'ar' || !language ? 'rtl' : 'ltr'}
      lang={language ?? 'ar'}
    >
      <h1>{t.notFoundTitle}</h1>
      <Link to="/">{t.returnHome}</Link>
    </main>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicPage />} />
      <Route path="/applications" element={<ApplicationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route
        path="/account/orders"
        element={
          <RequireAuth>
            <ClientOrdersPage />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/universities"
        element={
          <RequireAdmin>
            <AdminUniversityPage />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/testimonials"
        element={
          <RequireAdmin>
            <AdminManagedContentPage section="testimonials" />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/social-links"
        element={
          <RequireAdmin>
            <AdminManagedContentPage section="social" />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/contact"
        element={
          <RequireAdmin>
            <AdminManagedContentPage section="contact" />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <RequireAdmin>
            <AdminOrdersPage />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/orders/:orderId"
        element={
          <RequireAdmin>
            <AdminOrderDetailPage />
          </RequireAdmin>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
