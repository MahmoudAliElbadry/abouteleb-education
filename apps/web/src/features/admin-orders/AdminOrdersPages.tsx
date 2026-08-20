import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { OrderStatusValue } from '@abou/contracts';
import { ApiError } from '../auth/auth-client.js';
import { useAuth } from '../auth/useAuth.js';
import {
  addInternalNote,
  assignAdmin,
  getAdminMetrics,
  getAdminOrder,
  getAdminOrders,
  transitionAdminOrder,
} from './admin-client.js';

type Language = 'ar' | 'en' | 'tr';
const labels = {
  ar: {
    title: 'لوحة الطلبات',
    total: 'كل الطلبات',
    search: 'بحث',
    all: 'كل الحالات',
    open: 'فتح',
    detail: 'تفاصيل الطلب',
    assign: 'تعيين لي',
    unassign: 'إلغاء التعيين',
    status: 'تغيير الحالة',
    message: 'رسالة للعميل (اختياري)',
    save: 'حفظ',
    notes: 'ملاحظات داخلية',
    notePlaceholder: 'اكتب ملاحظة للفريق',
    add: 'إضافة',
    history: 'سجل الحالات',
    responses: 'ردود العميل',
    back: 'العودة للطلبات',
    noData: 'لا توجد طلبات.',
    error: 'تعذر تحميل البيانات.',
    statuses: {
      NEW: 'جديد',
      CONTACTED: 'تم التواصل',
      WAITING_FOR_CLIENT: 'بانتظار العميل',
      IN_PROGRESS: 'قيد التنفيذ',
      COMPLETED: 'مكتمل',
      REJECTED: 'مرفوض',
      CANCELLED: 'ملغى',
    },
  },
  en: {
    title: 'Order dashboard',
    total: 'All orders',
    search: 'Search',
    all: 'All statuses',
    open: 'Open',
    detail: 'Order detail',
    assign: 'Assign to me',
    unassign: 'Unassign',
    status: 'Change status',
    message: 'Client message (optional)',
    save: 'Save',
    notes: 'Internal notes',
    notePlaceholder: 'Write a note for the team',
    add: 'Add note',
    history: 'Status history',
    responses: 'Client responses',
    back: 'Back to orders',
    noData: 'No orders found.',
    error: 'Unable to load the data.',
    statuses: {
      NEW: 'New',
      CONTACTED: 'Contacted',
      WAITING_FOR_CLIENT: 'Waiting for client',
      IN_PROGRESS: 'In progress',
      COMPLETED: 'Completed',
      REJECTED: 'Rejected',
      CANCELLED: 'Cancelled',
    },
  },
  tr: {
    title: 'Başvuru paneli',
    total: 'Tüm başvurular',
    search: 'Ara',
    all: 'Tüm durumlar',
    open: 'Aç',
    detail: 'Başvuru detayı',
    assign: 'Bana ata',
    unassign: 'Atamayı kaldır',
    status: 'Durumu değiştir',
    message: 'Müşteri mesajı (isteğe bağlı)',
    save: 'Kaydet',
    notes: 'Dahili notlar',
    notePlaceholder: 'Ekip için not yazın',
    add: 'Not ekle',
    history: 'Durum geçmişi',
    responses: 'Müşteri yanıtları',
    back: 'Başvurulara dön',
    noData: 'Başvuru bulunamadı.',
    error: 'Veriler yüklenemedi.',
    statuses: {
      NEW: 'Yeni',
      CONTACTED: 'İletişim kuruldu',
      WAITING_FOR_CLIENT: 'Müşteri bekleniyor',
      IN_PROGRESS: 'Devam ediyor',
      COMPLETED: 'Tamamlandı',
      REJECTED: 'Reddedildi',
      CANCELLED: 'İptal edildi',
    },
  },
} as const;
const statusList: OrderStatusValue[] = [
  'NEW',
  'CONTACTED',
  'WAITING_FOR_CLIENT',
  'IN_PROGRESS',
  'COMPLETED',
  'REJECTED',
  'CANCELLED',
];
const transitions: Record<OrderStatusValue, OrderStatusValue[]> = {
  NEW: ['CONTACTED', 'REJECTED', 'CANCELLED'],
  CONTACTED: ['WAITING_FOR_CLIENT', 'IN_PROGRESS'],
  WAITING_FOR_CLIENT: ['IN_PROGRESS'],
  IN_PROGRESS: ['COMPLETED', 'REJECTED', 'CANCELLED'],
  COMPLETED: [],
  REJECTED: [],
  CANCELLED: [],
};
function message(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}

export function AdminOrdersPage() {
  const [language, setLanguage] = useState<Language>('en');
  const t = labels[language];
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const metrics = useQuery({ queryKey: ['admin', 'metrics'], queryFn: getAdminMetrics });
  const orders = useQuery({
    queryKey: ['admin', 'orders', { status, search, page }],
    queryFn: () => getAdminOrders({ status, search, page, pageSize: 20 }),
  });
  return (
    <main className="admin-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <header className="admin-header">
        <div>
          <p className="eyebrow">Abou-Taleb Education</p>
          <h1>{t.title}</h1>
        </div>
        <label>
          Language{' '}
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value as Language)}
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
            <option value="tr">Türkçe</option>
          </select>
        </label>
      </header>
      <section className="admin-metrics">
        <article>
          <strong>{metrics.data?.total ?? '—'}</strong>
          <span>{t.total}</span>
        </article>
        {statusList.map((item) => (
          <article key={item}>
            <strong>{metrics.data?.counts[item] ?? '—'}</strong>
            <span>{t.statuses[item]}</span>
          </article>
        ))}
      </section>
      <section className="admin-toolbar">
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder={t.search}
        />
        <select
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
        >
          <option value="">{t.all}</option>
          {statusList.map((item) => (
            <option key={item} value={item}>
              {t.statuses[item]}
            </option>
          ))}
        </select>
      </section>
      {orders.error ? (
        <p className="form-error" role="alert">
          {message(orders.error, t.error)}
        </p>
      ) : orders.data?.orders.length ? (
        <div className="admin-order-table">
          <div className="admin-order-row admin-order-heading">
            <span>Reference</span>
            <span>Client</span>
            <span>Status</span>
            <span>Updated</span>
            <span />
          </div>
          {orders.data.orders.map((order) => (
            <div className="admin-order-row" key={order.id}>
              <span>
                <strong>{order.reference}</strong>
                <small>{order.specializationLabel}</small>
              </span>
              <span>
                {order.fullName}
                <small>{order.email}</small>
              </span>
              <span className={`status-badge status-${order.status.toLowerCase()}`}>
                {t.statuses[order.status]}
              </span>
              <span>{new Date(order.updatedAt).toLocaleDateString()}</span>
              <Link className="button button-small" to={`/admin/orders/${order.id}`}>
                {t.open}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-state">{t.noData}</p>
      )}
      {orders.data && (
        <div className="pagination">
          <button type="button" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>
            ←
          </button>
          <span>
            {page} / {orders.data.pagination.totalPages || 1}
          </span>
          <button
            type="button"
            disabled={page >= orders.data.pagination.totalPages}
            onClick={() => setPage((value) => value + 1)}
          >
            →
          </button>
        </div>
      )}
    </main>
  );
}

export function AdminOrderDetailPage() {
  const [language, setLanguage] = useState<Language>('en');
  const t = labels[language];
  const { orderId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const order = useQuery({
    queryKey: ['admin', 'order', orderId],
    queryFn: () => getAdminOrder(orderId!),
    enabled: Boolean(orderId),
  });
  const transition = useMutation({
    mutationFn: (input: { to: OrderStatusValue; clientVisibleMessage?: string }) =>
      transitionAdminOrder(orderId!, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'order', orderId] }),
  });
  const note = useMutation({
    mutationFn: (body: string) => addInternalNote(orderId!, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'order', orderId] }),
  });
  const assignment = useMutation({
    mutationFn: (id: string | null) => assignAdmin(orderId!, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'order', orderId] }),
  });
  const [nextStatus, setNextStatus] = useState<OrderStatusValue | ''>('');
  const [clientMessage, setClientMessage] = useState('');
  const [noteBody, setNoteBody] = useState('');
  if (order.isPending)
    return (
      <main className="admin-page">
        <p>Loading…</p>
      </main>
    );
  if (order.error || !order.data)
    return (
      <main className="admin-page">
        <p className="form-error">{message(order.error, t.error)}</p>
      </main>
    );
  const item = order.data.order;
  const options = transitions[item.status];
  async function saveStatus() {
    if (!nextStatus) return;
    await transition.mutateAsync({
      to: nextStatus,
      ...(clientMessage ? { clientVisibleMessage: clientMessage } : {}),
    });
    setNextStatus('');
    setClientMessage('');
  }
  async function saveNote() {
    if (!noteBody.trim()) return;
    await note.mutateAsync(noteBody.trim());
    setNoteBody('');
  }
  return (
    <main className="admin-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <header className="admin-header">
        <div>
          <button className="text-button" type="button" onClick={() => navigate('/admin/orders')}>
            ← {t.back}
          </button>
          <p className="eyebrow">{t.detail}</p>
          <h1>{item.reference}</h1>
        </div>
        <select value={language} onChange={(event) => setLanguage(event.target.value as Language)}>
          <option value="ar">العربية</option>
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
        </select>
      </header>
      <section className="admin-detail-grid">
        <article className="admin-panel">
          <h2>{item.fullName}</h2>
          <p>
            {item.email} · {item.phoneNumber}
          </p>
          <p>
            {item.specializationLabel} ·{' '}
            <span className={`status-badge status-${item.status.toLowerCase()}`}>
              {t.statuses[item.status]}
            </span>
          </p>
          <button
            className="button button-small"
            type="button"
            onClick={() =>
              assignment.mutate(item.assignedAdmin?.id === user?.id ? null : (user?.id ?? null))
            }
          >
            {item.assignedAdmin?.id === user?.id ? t.unassign : t.assign}
          </button>
        </article>
        <article className="admin-panel">
          <h2>{t.status}</h2>
          <select
            value={nextStatus}
            onChange={(event) => setNextStatus(event.target.value as OrderStatusValue)}
          >
            <option value="">{t.statuses[item.status]}</option>
            {options.map((value) => (
              <option key={value} value={value}>
                {t.statuses[value]}
              </option>
            ))}
          </select>
          <textarea
            value={clientMessage}
            onChange={(event) => setClientMessage(event.target.value)}
            placeholder={t.message}
            maxLength={2000}
          />
          <button
            className="button"
            type="button"
            disabled={!nextStatus || transition.isPending}
            onClick={saveStatus}
          >
            {t.save}
          </button>
          {transition.error && <p className="form-error">{message(transition.error, t.error)}</p>}
        </article>
      </section>
      <section className="admin-detail-grid">
        <article className="admin-panel">
          <h2>{t.history}</h2>
          <ol className="timeline">
            {item.statusHistory.map((entry) => (
              <li key={entry.id}>
                <strong>{t.statuses[entry.toStatus]}</strong>
                <small>{new Date(entry.createdAt).toLocaleString()}</small>
                {entry.clientVisibleMessage && <p>{entry.clientVisibleMessage}</p>}
              </li>
            ))}
          </ol>
        </article>
        <article className="admin-panel">
          <h2>{t.notes}</h2>
          <textarea
            value={noteBody}
            onChange={(event) => setNoteBody(event.target.value)}
            placeholder={t.notePlaceholder}
            maxLength={2000}
          />
          <button
            className="button"
            type="button"
            disabled={!noteBody.trim() || note.isPending}
            onClick={saveNote}
          >
            {t.add}
          </button>
          <ul className="internal-notes">
            {item.internalNotes.map((entry) => (
              <li key={entry.id}>
                <p>{entry.body}</p>
                <small>
                  {entry.admin?.email ?? 'Former admin'} ·{' '}
                  {new Date(entry.createdAt).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        </article>
      </section>
      <section className="admin-panel">
        <h2>{t.responses}</h2>
        {item.clientResponses.length ? (
          item.clientResponses.map((response) => (
            <p className="client-response" key={response.id}>
              {response.body}
              <small>{new Date(response.createdAt).toLocaleString()}</small>
            </p>
          ))
        ) : (
          <p>{t.noData}</p>
        )}
      </section>
    </main>
  );
}
