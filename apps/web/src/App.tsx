import { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
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
import { AdminLayout } from './features/admin/AdminLayout.js';
import { AdminOrderDetailPage, AdminOrdersPage } from './features/admin-orders/AdminOrdersPages.js';
import { ClientOrdersPage } from './features/client-orders/ClientOrdersPage.js';
import { AdminUniversityPage } from './features/admin-content/AdminUniversityPage.js';
import { AdminManagedContentPage } from './features/admin-content/AdminManagedContentPage.js';
import { universities as bundledUniversities } from './data/universities.js';
import {
  getPublicContact,
  getPublicSocialLinks,
  getPublicTestimonials,
  getPublicUniversities,
  type PublicContact,
  type PublicSocialLink,
  type PublicUniversity,
} from './features/content/public-content-client.js';
import { useAuth } from './features/auth/useAuth.js';
import { useLanguage, type Language } from './features/i18n/LanguageContext.js';

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const fallbackUniversities: PublicUniversity[] = bundledUniversities.map(
  (university, sortOrder) => ({
    id: university.id,
    slug: university.id,
    nameAr: university.name,
    nameEn: university.name,
    nameTr: university.name,
    city: university.city,
    imageUrl: publicAsset(`images/${university.id}.png`),
    featured: sortOrder < 8,
    sortOrder,
  }),
);

const staticFooterLinks = [
  {
    url: 'https://wa.me/905015959880',
    ar: 'واتساب',
    en: 'WhatsApp',
    tr: 'WhatsApp',
  },
  {
    url: 'https://www.instagram.com/abou.taleb.education',
    ar: 'إنستجرام',
    en: 'Instagram',
    tr: 'Instagram',
  },
  {
    url: 'https://www.facebook.com/AbouTalebEducation',
    ar: 'فيسبوك',
    en: 'Facebook',
    tr: 'Facebook',
  },
  { url: 'https://x.com/ABOUTALEBEDU', ar: 'إكس', en: 'X', tr: 'X' },
  {
    url: 'https://www.linkedin.com/in/abou-taleb-education-108b413a7',
    ar: 'لينكدإن',
    en: 'LinkedIn',
    tr: 'LinkedIn',
  },
] as const;

const staticWhatsappUrl = 'https://wa.me/905015959880';
const staticContactDetails = [
  { value: 'info@aboutalebeducation.com', href: 'mailto:info@aboutalebeducation.com' },
  { value: 'AboutalebEducation@gmail.com', href: 'mailto:AboutalebEducation@gmail.com' },
] as const;

const fallbackSocialLinks: PublicSocialLink[] = staticFooterLinks.map((link) => ({
  id: link.url,
  platform: link.en,
  labelAr: link.ar,
  labelEn: link.en,
  labelTr: link.tr,
  url: link.url,
  iconKey: link.en.toLowerCase(),
}));

const fallbackContactDetails: PublicContact[] = staticContactDetails.map((detail) => ({
  key: detail.value,
  value: detail.value,
}));

export function normalizeCatalogSearch(value: string) {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('tr').replaceAll('ı', 'i');
}

function useSectionReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
      !window.IntersectionObserver
    ) {
      setIsRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isRevealed };
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
    signIn: 'تسجيل الدخول',
    signOut: 'تسجيل الخروج',
    dashboard: 'لوحة التحكم',
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
    loading: 'جار تحميل الجامعات…',
    loadError: 'تعذر تحميل الجامعات.',
    retry: 'إعادة المحاولة',
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
    backToTop: 'العودة إلى أعلى الصفحة',
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
    signIn: 'Sign in',
    signOut: 'Sign out',
    dashboard: 'Dashboard',
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
    loading: 'Loading universities…',
    loadError: 'Unable to load universities.',
    retry: 'Retry',
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
    backToTop: 'Back to top',
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
    signIn: 'Giriş yap',
    signOut: 'Çıkış yap',
    dashboard: 'Yönetim paneli',
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
    loading: 'Üniversiteler yükleniyor…',
    loadError: 'Üniversiteler yüklenemedi.',
    retry: 'Tekrar dene',
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
    backToTop: 'Sayfanın başına dön',
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
      <strong className="stat-value">{displayValue}</strong>
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
  const auth = useAuth();
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [showAllUniversities, setShowAllUniversities] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const servicesReveal = useSectionReveal<HTMLDivElement>();
  const stepsReveal = useSectionReveal<HTMLOListElement>();
  const statsReveal = useSectionReveal<HTMLElement>();
  const t = copy[language];
  const universitiesQuery = useQuery({
    queryKey: ['public-universities'],
    queryFn: getPublicUniversities,
  });
  const testimonialsQuery = useQuery({
    queryKey: ['public-testimonials'],
    queryFn: getPublicTestimonials,
  });
  const socialQuery = useQuery({
    queryKey: ['public-social-links'],
    queryFn: getPublicSocialLinks,
  });
  const contactQuery = useQuery({ queryKey: ['public-contact'], queryFn: getPublicContact });
  const usingUniversityFallback = Boolean(universitiesQuery.error && !universitiesQuery.data);
  const universities: PublicUniversity[] = universitiesQuery.data?.items ?? fallbackUniversities;
  const socialLinks = socialQuery.data?.items ?? fallbackSocialLinks;
  const contactDetails = contactQuery.data?.items ?? fallbackContactDetails;
  const whatsappValue = contactQuery.data?.items.find(
    (item) => item.key === 'contact_whatsapp',
  )?.value;
  const steps: ReadonlyArray<readonly [string, string]> = t.steps;
  const stats: ReadonlyArray<readonly [string, string]> = [
    ['+50', t.universitiesCount],
    ['+1500', t.students],
    ['100%', t.admission],
    ['+8', t.experience],
  ];
  const direction = language === 'ar' ? 'rtl' : 'ltr';
  const showEnrollCta = auth.isPending || auth.user?.role !== 'ADMIN';

  useEffect(() => {
    const updateBackToTopVisibility = () => setShowBackToTop(window.scrollY > 400);
    updateBackToTopVisibility();
    window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateBackToTopVisibility);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }

  async function handleSignOut() {
    await auth.logout.mutateAsync();
    setMenuOpen(false);
  }
  const filteredUniversities = useMemo(
    () =>
      universities.filter(
        (university) =>
          normalizeCatalogSearch(
            university[language === 'ar' ? 'nameAr' : language === 'tr' ? 'nameTr' : 'nameEn'],
          ).includes(normalizeCatalogSearch(search)) &&
          (!city || university.city === city),
      ),
    [city, language, search, universities],
  );
  const shownUniversities = showAllUniversities
    ? filteredUniversities
    : filteredUniversities.slice(0, 8);

  return (
    <div className="public-site" dir={direction} lang={language}>
      <header className="topbar">
        <Link className="brand" to="/" aria-label="Abou-Taleb Education">
          <img src={publicAsset('images/logo.png')} alt="" />
          <span>
            Abou-Taleb <strong>Education</strong>
          </span>
        </Link>
        <nav className={menuOpen ? 'open' : undefined} aria-label="Primary navigation">
          {[
            ['#home', t.home],
            ['#universities', t.universities],
            ['#services', t.services],
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
          {showEnrollCta && (
            <a className="button button-small" href="#enroll">
              {t.apply}
            </a>
          )}
          {!auth.isPending &&
            (auth.user ? (
              <>
                {auth.user.role === 'ADMIN' && (
                  <Link className="button header-account-action" to="/admin/orders">
                    {t.dashboard}
                  </Link>
                )}
                <button
                  className="button header-account-action"
                  type="button"
                  onClick={() => void handleSignOut()}
                  disabled={auth.logout.isPending}
                >
                  {t.signOut}
                </button>
              </>
            ) : (
              <Link className="button header-account-action" to="/login">
                {t.signIn}
              </Link>
            ))}
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
          <div className="hero-art" aria-hidden="true">
            <span className="hero-art-orbit hero-art-orbit-large" />
            <span className="hero-art-orbit hero-art-orbit-small" />
            <span className="hero-art-arc" />
            <span className="hero-art-spark" />
          </div>
          <div className="hero-content">
            <p className="hero-badge">{t.badge}</p>
            <h1>
              {t.titleBefore} <span>{t.titleAccent}</span> {t.titleAfter}
            </h1>
            <p>{t.description}</p>
            <div className="hero-actions">
              {showEnrollCta && (
                <a className="button" href="#enroll">
                  {t.consult}
                </a>
              )}
              <a className="button button-outline" href="#services">
                {t.discover}
              </a>
            </div>
          </div>
        </section>

        <section ref={statsReveal.ref} className="stats" aria-label="Company statistics">
          {statsReveal.isRevealed &&
            stats.map(([value, label]) => <AnimatedStat key={label} value={value} label={label} />)}
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
          {universitiesQuery.isPending ? (
            <p role="status">{t.loading}</p>
          ) : filteredUniversities.length ? (
            <>
              {usingUniversityFallback && (
                <p className="catalog-fallback" role="status">
                  {t.loadError}
                </p>
              )}
              <div className="university-grid">
                {shownUniversities.map((university) => (
                  <article className="university-card" key={university.id}>
                    <div className="university-logo">
                      <img
                        src={university.imageUrl}
                        alt={`${university[language === 'ar' ? 'nameAr' : language === 'tr' ? 'nameTr' : 'nameEn']} logo`}
                        loading="lazy"
                        width="180"
                        height="100"
                        onError={(event) => {
                          if (event.currentTarget.dataset.fallbackApplied === 'true') return;
                          event.currentTarget.dataset.fallbackApplied = 'true';
                          event.currentTarget.src = publicAsset('images/logo.png');
                        }}
                      />
                    </div>
                    <h3>
                      {
                        university[
                          language === 'ar' ? 'nameAr' : language === 'tr' ? 'nameTr' : 'nameEn'
                        ]
                      }
                    </h3>
                    <span>
                      {cityLabels[language][university.city as keyof typeof cityLabels.en] ??
                        university.city}
                    </span>
                  </article>
                ))}
              </div>
            </>
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
          <div
            ref={servicesReveal.ref}
            className={`service-grid reveal-group${servicesReveal.isRevealed ? ' is-revealed' : ''}`}
          >
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
          <ol
            ref={stepsReveal.ref}
            className={`steps-list reveal-group${stepsReveal.isRevealed ? ' is-revealed' : ''}`}
          >
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

      {testimonialsQuery.data?.items.length ? (
        <section className="content-section testimonials" aria-labelledby="testimonials-title">
          <div className="section-heading">
            <h2 id="testimonials-title">
              {language === 'ar'
                ? 'آراء طلابنا'
                : language === 'tr'
                  ? 'Öğrenci yorumları'
                  : 'Student stories'}
            </h2>
          </div>
          <div className="service-grid">
            {testimonialsQuery.data.items.map((item) => (
              <article className="service-card" key={item.id}>
                <h3>
                  {
                    item[
                      language === 'ar'
                        ? 'clientNameAr'
                        : language === 'tr'
                          ? 'clientNameTr'
                          : 'clientNameEn'
                    ]
                  }
                </h3>
                <p>
                  {item[language === 'ar' ? 'quoteAr' : language === 'tr' ? 'quoteTr' : 'quoteEn']}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
      <section className="contact" id="contact">
        <div>
          <p>{t.catalog}</p>
          <h2>{t.ready}</h2>
          <span>{t.readyDescription}</span>
        </div>
        <div className="contact-links">
          {socialLinks.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
              {link[language === 'ar' ? 'labelAr' : language === 'tr' ? 'labelTr' : 'labelEn'] ||
                link.platform}
            </a>
          ))}
          {contactDetails
            .filter((item) => item.value && item.key !== 'contact_whatsapp')
            .map((item) => (
              <a
                className="contact-detail"
                key={item.key}
                href={item.value.includes('@') ? `mailto:${item.value}` : undefined}
              >
                {item.value}
              </a>
            ))}
        </div>
      </section>
      <a
        className="whatsapp"
        href={
          whatsappValue ? `https://wa.me/${whatsappValue.replace(/\D/g, '')}` : staticWhatsappUrl
        }
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
      >
        <img src={publicAsset('images/whatsapp-svgrepo-com.svg')} alt="" />
      </a>
      {showBackToTop && (
        <button
          className="back-to-top"
          type="button"
          onClick={scrollToTop}
          aria-label={t.backToTop}
        >
          <span aria-hidden="true">↑</span>
        </button>
      )}
    </div>
  );
}

function NotFoundPage() {
  const [searchParams] = useSearchParams();
  const { language, setLanguage } = useLanguage();
  const queryLang = searchParams.get('lang');

  useEffect(() => {
    if (queryLang === 'ar' || queryLang === 'en' || queryLang === 'tr') {
      setLanguage(queryLang);
    }
  }, [queryLang, setLanguage]);

  const t = copy[language];
  return (
    <main className="not-found" dir={language === 'ar' ? 'rtl' : 'ltr'} lang={language}>
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
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<Navigate to="orders" replace />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="orders/:orderId" element={<AdminOrderDetailPage />} />
        <Route path="universities" element={<AdminUniversityPage />} />
        <Route path="testimonials" element={<AdminManagedContentPage mode="testimonials" />} />
        <Route path="contact-social" element={<AdminManagedContentPage mode="contact-social" />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
