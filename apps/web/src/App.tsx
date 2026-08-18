import { useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { universities } from './data/universities.js';
import { ApplicationPage } from './ApplicationPage.js';

type Language = 'ar' | 'en' | 'tr';

const copy = {
  ar: {
    language: 'العربية',
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
  },
  en: {
    language: 'English',
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
  },
  tr: {
    language: 'Türkçe',
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
          university.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) &&
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
            <span className="sr-only">Language</span>
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
          <Link className="button button-small" to="/applications">
            {t.apply}
          </Link>
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
          <path d="M27.2 4.8A15.5 15.5 0 0 0 2.9 23.5L1 31l7.7-2A15.5 15.5 0 1 0 27.2 4.8Zm-11.1 23a12.4 12.4 0 0 1-6.3-1.7l-.5-.3-4.6 1.2 1.2-4.5-.3-.5a12.4 12.4 0 1 1 10.5 5.8Zm6.8-9.3c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.7-.2-1 .2-.3.4-1.1 1.3-1.3 1.6-.2.3-.5.3-.9.1a10.2 10.2 0 0 1-3-1.9 11.2 11.2 0 0 1-2.1-2.6c-.2-.4 0-.6.1-.8l.6-.7c.2-.2.2-.4.3-.7.1-.2 0-.5 0-.7-.1-.2-1-2.3-1.3-3.1-.3-.8-.7-.7-1-.7h-.8c-.3 0-.7.1-1 .5-.4.4-1.4 1.4-1.4 3.5 0 2 1.5 4 1.7 4.3.2.3 2.9 4.4 7 6.2 1 .4 1.7.7 2.3.9 1 .3 1.9.3 2.6.2.8-.1 2.4-1 2.8-2 .3-1 .3-1.8.2-2-.1-.2-.3-.3-.7-.5Z" />
        </svg>
      </a>
    </div>
  );
}

function NotFoundPage() {
  return (
    <main className="not-found">
      <h1>Page not found</h1>
      <Link to="/">Return home</Link>
    </main>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicPage />} />
      <Route path="/applications" element={<ApplicationPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
