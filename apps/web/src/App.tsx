import { useMemo, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { universities } from './data/universities.js';

type Language = 'ar' | 'en' | 'tr';

const copy = {
  ar: {
    language: 'العربية',
    home: 'الرئيسية',
    services: 'خدماتنا',
    universities: 'الجامعات',
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
    ready: 'هل أنت جاهز لبدء مستقبلك؟',
    readyDescription: 'تواصل معنا الآن، وسيتابع معك أحد مستشارينا التعليميين.',
    catalog: 'كتالوج الجامعات',
  },
  en: {
    language: 'English',
    home: 'Home',
    services: 'Services',
    universities: 'Universities',
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
    ready: 'Ready to start your future?',
    readyDescription: 'Contact us now and one of our educational consultants will guide you.',
    catalog: 'University catalog',
  },
  tr: {
    language: 'Türkçe',
    home: 'Ana sayfa',
    services: 'Hizmetlerimiz',
    universities: 'Üniversiteler',
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
    ready: 'Geleceğinize başlamaya hazır mısınız?',
    readyDescription: 'Şimdi iletişime geçin, eğitim danışmanlarımızdan biri size yardımcı olsun.',
    catalog: 'Üniversite kataloğu',
  },
} as const;

const cityLabels = {
  ar: { Istanbul: 'إسطنبول', Ankara: 'أنقرة', Kocaeli: 'كوجالي' },
  en: { Istanbul: 'Istanbul', Ankara: 'Ankara', Kocaeli: 'Kocaeli' },
  tr: { Istanbul: 'İstanbul', Ankara: 'Ankara', Kocaeli: 'Kocaeli' },
} as const;

function PublicPage() {
  const [language, setLanguage] = useState<Language>('ar');
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const t = copy[language];
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

  return (
    <div className="public-site" dir={direction} lang={language}>
      <header className="topbar">
        <Link className="brand" to="/" aria-label="Abou-Taleb Education">
          <img src="/logo.png" alt="" />
          <span>
            Abou-Taleb <strong>Education</strong>
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <a href="#home">{t.home}</a>
          <a href="#services">{t.services}</a>
          <a href="#universities">{t.universities}</a>
          <a href="#contact">{t.contact}</a>
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
          <a className="button button-small" href="#contact">
            {t.apply}
          </a>
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
          {[
            ['+50', t.universitiesCount],
            ['+1500', t.students],
            ['100%', t.admission],
            ['+8', t.experience],
          ].map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
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
            <label>
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
              {filteredUniversities.map((university) => (
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
        ◔
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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
