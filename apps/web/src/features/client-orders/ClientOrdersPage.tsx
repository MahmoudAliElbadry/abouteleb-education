import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { clientOrderErrorMessage, getClientOrders } from './client-orders.js';

const copy = {
  ar: {
    title: 'طلبات القبول الخاصة بي',
    loading: 'جارٍ تحميل طلباتك…',
    empty: 'لا توجد طلبات قبول حتى الآن.',
    error: 'تعذر تحميل طلباتك.',
    retry: 'إعادة المحاولة',
    submitted: 'تاريخ الإرسال',
    timeline: 'سجل الحالة',
    previous: 'السابق',
    next: 'التالي',
  },
  en: {
    title: 'My admission requests',
    loading: 'Loading your requests…',
    empty: 'You do not have any admission requests yet.',
    error: 'Unable to load your requests.',
    retry: 'Try again',
    submitted: 'Submitted',
    timeline: 'Status history',
    previous: 'Previous',
    next: 'Next',
  },
  tr: {
    title: 'Başvuru taleplerim',
    loading: 'Talepleriniz yükleniyor…',
    empty: 'Henüz başvuru talebiniz yok.',
    error: 'Talepleriniz yüklenemedi.',
    retry: 'Tekrar dene',
    submitted: 'Gönderildi',
    timeline: 'Durum geçmişi',
    previous: 'Önceki',
    next: 'Sonraki',
  },
} as const;

export function OrderHistoryList({ language = 'en' }: { language?: keyof typeof copy }) {
  const [page, setPage] = useState(1);
  const t = copy[language];
  const orders = useQuery({
    queryKey: ['client', 'orders', page],
    queryFn: () => getClientOrders(page),
  });

  return (
    <>
      {orders.isPending ? <p role="status">{t.loading}</p> : null}
      {orders.isError ? (
        <div role="alert">
          <p>{clientOrderErrorMessage(orders.error, t.error)}</p>
          <button type="button" onClick={() => void orders.refetch()}>
            {t.retry}
          </button>
        </div>
      ) : null}
      {orders.data && !orders.data.items.length ? <p>{t.empty}</p> : null}
      {orders.data?.items.length ? (
        <ul className="order-list">
          {orders.data.items.map((order) => (
            <li key={order.id}>
              <h2>{order.reference}</h2>
              <p>{order.specializationLabel}</p>
              <p>{order.status}</p>
              <p>
                {t.submitted}: {new Date(order.submittedAt).toLocaleDateString(language)}
              </p>
              <h3>{t.timeline}</h3>
              <ol>
                {order.statusHistory.map((entry) => (
                  <li key={`${entry.toStatus}-${entry.createdAt}`}>
                    {entry.toStatus}
                    {entry.clientVisibleMessage ? ` — ${entry.clientVisibleMessage}` : ''}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      ) : null}
      {orders.data && orders.data.total > orders.data.pageSize ? (
        <nav aria-label={t.title}>
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((current) => current - 1)}
          >
            {t.previous}
          </button>
          <button
            type="button"
            disabled={page * orders.data.pageSize >= orders.data.total}
            onClick={() => setPage((current) => current + 1)}
          >
            {t.next}
          </button>
        </nav>
      ) : null}
    </>
  );
}

export function ClientOrdersPage({ language = 'en' }: { language?: keyof typeof copy }) {
  const t = copy[language];
  return (
    <main className="account-page" dir={language === 'ar' ? 'rtl' : 'ltr'} lang={language}>
      <h1>{t.title}</h1>
      <OrderHistoryList language={language} />
    </main>
  );
}
