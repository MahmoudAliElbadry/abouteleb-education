import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth.js';
import { EnrollmentSection } from '../enrollment/EnrollmentSection.js';
import { clientOrderErrorMessage, getClientOrders } from '../client-orders/client-orders.js';
import { useLanguage, type Language } from '../i18n/LanguageContext.js';

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const STATUS_LABEL_KEY = {
  NEW: 'statusNew',
  CONTACTED: 'statusContacted',
  WAITING_FOR_CLIENT: 'statusWaiting',
  IN_PROGRESS: 'statusInProgress',
  COMPLETED: 'statusCompleted',
  REJECTED: 'statusRejected',
  CANCELLED: 'statusCancelled',
} as const;

const STATUS_BADGE_CLASS = {
  NEW: 'order-badge-new',
  CONTACTED: 'order-badge-neutral',
  WAITING_FOR_CLIENT: 'order-badge-waiting',
  IN_PROGRESS: 'order-badge-active',
  COMPLETED: 'order-badge-done',
  REJECTED: 'order-badge-muted',
  CANCELLED: 'order-badge-muted',
} as const;

const ACTIVE_STATUSES = new Set(['NEW', 'CONTACTED', 'WAITING_FOR_CLIENT', 'IN_PROGRESS']);

const copy = {
  ar: {
    home: 'الرئيسية',
    signOut: 'تسجيل الخروج',
    eyebrow: 'حسابي',
    title: 'مرحباً بك،',
    subtitle: 'تابع طلبات القبول الخاصة بك، راجع تحديثات الحالة، وتواصل مع مستشارك في أي وقت.',
    verified: 'البريد الإلكتروني موثق',
    unverified: 'البريد الإلكتروني غير موثق',
    statTotal: 'الإجمالي',
    statActive: 'نشطة',
    statCompleted: 'مكتملة',
    requestsTitle: 'طلبات القبول الخاصة بي',
    submitted: 'تاريخ الإرسال',
    loading: 'جارٍ تحميل طلباتك…',
    error: 'تعذر تحميل طلباتك.',
    retry: 'إعادة المحاولة',
    empty: 'لا توجد طلبات قبول حتى الآن.',
    emptyCta: 'ابدأ طلباً جديداً',
    statusNew: 'جديد',
    statusContacted: 'تم التواصل',
    statusWaiting: 'بانتظار ردك',
    statusInProgress: 'قيد المعالجة',
    statusCompleted: 'مكتمل',
    statusRejected: 'مرفوض',
    statusCancelled: 'ملغى',
    flowTitle: 'كيف يسير طلبك؟',
    flowIntro: 'يمكنك متابعة كل تحديث من سجل الحالة داخل طلبك.',
    flowNew: 'جديد — استلمنا طلبك وهو بانتظار المراجعة.',
    flowContacted: 'تم التواصل — بدأ المستشار التواصل معك.',
    flowProcessing: 'بانتظار ردك أو قيد المعالجة — نحتاج معلومات منك أو نعمل على طلبك.',
    flowFinished: 'مكتمل — انتهت معالجة طلبك بنجاح.',
    flowTerminal: 'قد يُغلق الطلب أيضاً بحالة مرفوض أو ملغى عند الحاجة.',
  },
  en: {
    home: 'Home',
    signOut: 'Sign out',
    eyebrow: 'My account',
    title: 'Welcome back,',
    subtitle:
      'Track your admission requests, review status updates, and reach your consultant anytime.',
    verified: 'Email verified',
    unverified: 'Email not verified',
    statTotal: 'Total',
    statActive: 'Active',
    statCompleted: 'Completed',
    requestsTitle: 'My admission requests',
    submitted: 'Submitted',
    loading: 'Loading your requests…',
    error: 'Unable to load your requests.',
    retry: 'Try again',
    empty: 'You do not have any admission requests yet.',
    emptyCta: 'Start a new application',
    statusNew: 'New',
    statusContacted: 'Contacted',
    statusWaiting: 'Waiting for you',
    statusInProgress: 'In progress',
    statusCompleted: 'Completed',
    statusRejected: 'Rejected',
    statusCancelled: 'Cancelled',
    flowTitle: 'How does your order progress?',
    flowIntro: 'You can follow every update in the status history inside your order.',
    flowNew: 'New — we received your request and it is awaiting review.',
    flowContacted: 'Contacted — your consultant has started contacting you.',
    flowProcessing: 'Waiting for you or in progress — we need information or are processing it.',
    flowFinished: 'Completed — your request has finished processing successfully.',
    flowTerminal: 'A request may also close as rejected or cancelled when necessary.',
  },
  tr: {
    home: 'Ana sayfa',
    signOut: 'Çıkış yap',
    eyebrow: 'Hesabım',
    title: 'Tekrar hoş geldiniz,',
    subtitle:
      'Başvuru taleplerinizi takip edin, durum güncellemelerini görün ve danışmanınıza her an ulaşın.',
    verified: 'E-posta doğrulandı',
    unverified: 'E-posta doğrulanmadı',
    statTotal: 'Toplam',
    statActive: 'Aktif',
    statCompleted: 'Tamamlandı',
    requestsTitle: 'Başvuru taleplerim',
    submitted: 'Gönderildi',
    loading: 'Talepleriniz yükleniyor…',
    error: 'Talepleriniz yüklenemedi.',
    retry: 'Tekrar dene',
    empty: 'Henüz başvuru talebiniz yok.',
    emptyCta: 'Yeni başvuru başlat',
    statusNew: 'Yeni',
    statusContacted: 'İletişim kuruldu',
    statusWaiting: 'Yanıtınız bekleniyor',
    statusInProgress: 'İşlemde',
    statusCompleted: 'Tamamlandı',
    statusRejected: 'Reddedildi',
    statusCancelled: 'İptal edildi',
    flowTitle: 'Başvurunuz nasıl ilerler?',
    flowIntro: 'Her güncellemeyi başvurunuzun durum geçmişinden takip edebilirsiniz.',
    flowNew: 'Yeni — başvurunuzu aldık ve incelemeyi bekliyor.',
    flowContacted: 'İletişim kuruldu — danışmanınız sizinle iletişime geçmeye başladı.',
    flowProcessing:
      'Yanıtınız bekleniyor veya işlemde — bilgi bekliyor ya da başvurunuzu işliyoruz.',
    flowFinished: 'Tamamlandı — başvurunuz başarıyla sonuçlandı.',
    flowTerminal: 'Gerektiğinde başvuru reddedilmiş veya iptal edilmiş olarak da kapanabilir.',
  },
} as const satisfies Record<Language, Record<string, string>>;

function statusLabel(t: Record<string, string>, status: string) {
  const key = STATUS_LABEL_KEY[status as keyof typeof STATUS_LABEL_KEY];
  return key ? t[key] : status;
}

function statusBadgeClass(status: string) {
  return STATUS_BADGE_CLASS[status as keyof typeof STATUS_BADGE_CLASS] ?? 'order-badge-neutral';
}

export function AccountPage() {
  const { language } = useLanguage();
  const { user, logout } = useAuth();
  const t = copy[language];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const orders = useQuery({
    queryKey: ['client', 'orders', 'account'],
    queryFn: () => getClientOrders(1, 50),
  });

  const items = orders.data?.items ?? [];
  const stats = {
    total: orders.data?.total ?? 0,
    active: items.filter((order) => ACTIVE_STATUSES.has(order.status)).length,
    completed: items.filter((order) => order.status === 'COMPLETED').length,
  };
  const userName = user?.fullName ?? user?.email ?? '';
  const userInitial = userName.trim().charAt(0).toUpperCase() || '?';

  return (
    <div className="account-page" dir={language === 'ar' ? 'rtl' : 'ltr'} lang={language}>
      <header className="topbar account-topbar">
        <Link className="brand" to="/" aria-label="Abou-Taleb Education">
          <img src={publicAsset('images/logo.png')} alt="" />
          <span>
            Abou-Taleb <strong>Education</strong>
          </span>
        </Link>
        <div className="header-actions">
          <Link className="header-account-action" to="/">
            {t.home}
          </Link>
          <button
            className="button button-outline header-account-action"
            type="button"
            onClick={() => void logout.mutateAsync()}
            disabled={logout.isPending}
          >
            {t.signOut}
          </button>
        </div>
      </header>

      <main className="account-main">
        <p className="account-eyebrow">{t.eyebrow}</p>
        <h1 className="account-heading">
          {t.title} {userName}
        </h1>
        <p className="account-subtitle">{t.subtitle}</p>

        <div className="account-cards">
          <article className="account-card account-card-profile">
            <div className="account-profile-head">
              <div className="account-avatar">{userInitial}</div>
              <div>
                <h2>{userName}</h2>
                <p className="account-email">{user?.email}</p>
              </div>
            </div>
            <p role="status" className="account-verify-status">
              {user?.emailVerified ? t.verified : t.unverified}
            </p>
            <div className="account-stats">
              <div>
                <strong>{stats.total}</strong>
                <span>{t.statTotal}</span>
              </div>
              <div>
                <strong>{stats.active}</strong>
                <span>{t.statActive}</span>
              </div>
              <div>
                <strong>{stats.completed}</strong>
                <span>{t.statCompleted}</span>
              </div>
            </div>
          </article>

          <article className="account-card account-card-requests">
            <div className="account-card-header">
              <h2>{t.requestsTitle}</h2>
              <span>
                {stats.total} {t.statTotal}
              </span>
            </div>

            {orders.isPending ? <p role="status">{t.loading}</p> : null}
            {orders.isError ? (
              <div role="alert" className="order-error">
                <p>{clientOrderErrorMessage(orders.error, t.error)}</p>
                <button type="button" onClick={() => void orders.refetch()}>
                  {t.retry}
                </button>
              </div>
            ) : null}

            {orders.data && items.length ? (
              <ul className="order-list">
                {items.map((order) => {
                  const expanded = expandedId === order.id;
                  return (
                    <li key={order.id} className="order-item">
                      <button
                        type="button"
                        className="order-item-toggle"
                        onClick={() => setExpandedId(expanded ? null : order.id)}
                        aria-expanded={expanded}
                      >
                        <span>
                          <strong>{order.reference}</strong>
                          <span className="order-item-meta">
                            {order.specializationLabel} · {t.submitted}:{' '}
                            {new Date(order.submittedAt).toLocaleDateString(language)}
                          </span>
                        </span>
                        <span className="order-item-status">
                          <span className={`order-badge ${statusBadgeClass(order.status)}`}>
                            {statusLabel(t, order.status)}
                          </span>
                          <span className={`order-chevron${expanded ? ' is-open' : ''}`}>▾</span>
                        </span>
                      </button>
                      {expanded ? (
                        <ol className="order-history">
                          {order.statusHistory.map((entry) => (
                            <li key={`${entry.toStatus}-${entry.createdAt}`}>
                              <strong>{statusLabel(t, entry.toStatus)}</strong>
                              <span>{new Date(entry.createdAt).toLocaleDateString(language)}</span>
                              {entry.clientVisibleMessage ? (
                                <p>{entry.clientVisibleMessage}</p>
                              ) : null}
                            </li>
                          ))}
                        </ol>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {orders.data && !items.length ? (
              <div className="order-empty">
                <p>{t.empty}</p>
                <a href="#enroll">{t.emptyCta}</a>
              </div>
            ) : null}
          </article>

          <article className="account-card account-card-status-flow">
            <h2>{t.flowTitle}</h2>
            <p>{t.flowIntro}</p>
            <ol>
              <li>{t.flowNew}</li>
              <li>{t.flowContacted}</li>
              <li>{t.flowProcessing}</li>
              <li>{t.flowFinished}</li>
            </ol>
            <p className="account-status-flow-note">{t.flowTerminal}</p>
          </article>

          <EnrollmentSection language={language} embedded />
        </div>
      </main>
    </div>
  );
}
