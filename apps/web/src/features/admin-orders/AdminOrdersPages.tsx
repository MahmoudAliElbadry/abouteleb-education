import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
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
    specialization: 'التخصص',
    assignedAdmin: 'معرف المسؤول',
    sort: 'ترتيب حسب',
    createdAt: 'تاريخ الإنشاء',
    updatedAt: 'آخر تحديث',
    ascending: 'تصاعدي',
    descending: 'تنازلي',
    order: 'اتجاه الترتيب',
    loading: 'جارٍ التحميل…',
    reference: 'المرجع',
    client: 'العميل',
    updated: 'محدث',
    retry: 'إعادة المحاولة',
    permissionError: 'ليس لديك صلاحية لعرض هذه البيانات.',
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
    specialization: 'Specialization',
    assignedAdmin: 'Admin ID',
    sort: 'Sort by',
    createdAt: 'Created',
    updatedAt: 'Updated',
    ascending: 'Ascending',
    descending: 'Descending',
    order: 'Order direction',
    loading: 'Loading…',
    reference: 'Reference',
    client: 'Client',
    updated: 'Updated',
    retry: 'Try again',
    permissionError: 'You do not have permission to view this data.',
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
    specialization: 'Bölüm',
    assignedAdmin: 'Yönetici kimliği',
    sort: 'Sıralama',
    createdAt: 'Oluşturulma',
    updatedAt: 'Güncelleme',
    ascending: 'Artan',
    descending: 'Azalan',
    order: 'Yön',
    loading: 'Yükleniyor…',
    reference: 'Referans',
    client: 'Müşteri',
    updated: 'Güncellendi',
    retry: 'Tekrar dene',
    permissionError: 'Bu verileri görüntüleme izniniz yok.',
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
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status') ?? '';
  const specialization = searchParams.get('specialization') ?? '';
  const assignedAdminId = searchParams.get('assignedAdminId') ?? '';
  const search = searchParams.get('search') ?? '';
  const sort = searchParams.get('sort') ?? 'createdAt';
  const order = searchParams.get('order') ?? 'desc';
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);
  function updateFilter(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set('page', '1');
    setSearchParams(next);
  }
  const metrics = useQuery({ queryKey: ['admin', 'metrics'], queryFn: getAdminMetrics });
  const orders = useQuery({
    queryKey: ['admin', 'orders', { status, specialization, assignedAdminId, search, sort, order, page }],
    queryFn: () => getAdminOrders({ status, specialization, assignedAdminId, search, sort, order, page, pageSize: 20 }),
    retry: false,
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
          onChange={(event) => updateFilter('search', event.target.value)}
          placeholder={t.search}
        />
        <select
          value={status}
          onChange={(event) => updateFilter('status', event.target.value)}
        >
          <option value="">{t.all}</option>
          {statusList.map((item) => (
            <option key={item} value={item}>
              {t.statuses[item]}
            </option>
          ))}
        </select>
        <select aria-label={t.specialization} value={specialization} onChange={(event) => updateFilter('specialization', event.target.value)}>
          <option value="">{t.specialization}</option>
          {(['medicine', 'dentistry', 'pharmacy', 'engineering', 'business'] as const).map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <input aria-label={t.assignedAdmin} value={assignedAdminId} onChange={(event) => updateFilter('assignedAdminId', event.target.value)} placeholder={t.assignedAdmin} />
        <select aria-label={t.sort} value={sort} onChange={(event) => updateFilter('sort', event.target.value)}>
          <option value="createdAt">{t.createdAt}</option>
          <option value="updatedAt">{t.updatedAt}</option>
        </select>
        <select aria-label={t.order} value={order} onChange={(event) => updateFilter('order', event.target.value)}>
          <option value="desc">{t.descending}</option>
          <option value="asc">{t.ascending}</option>
        </select>
      </section>
      {orders.isPending ? <p role="status">{t.loading}</p> : null}
      {orders.error ? (
        <div className="form-error" role="alert">
          <p>{orders.error instanceof ApiError && orders.error.status === 403 ? t.permissionError : message(orders.error, t.error)}</p>
          <button type="button" onClick={() => void orders.refetch()}>{t.retry}</button>
        </div>
      ) : orders.data?.items.length ? (
        <div className="admin-order-table">
          <div className="admin-order-row admin-order-heading">
            <span>{t.reference}</span>
            <span>{t.client}</span>
            <span>{t.status}</span>
            <span>{t.updated}</span>
            <span />
          </div>
          {orders.data.items.map((order) => (
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
        <p className="empty-state">{orders.data ? t.noData : null}</p>
      )}
      {orders.data && (
        <div className="pagination">
          <button type="button" disabled={page <= 1} onClick={() => updateFilter('page', String(page - 1))}>
            ←
          </button>
          <span>
            {page} / {Math.max(1, Math.ceil(orders.data.total / orders.data.pageSize))}
          </span>
          <button
            type="button"
            disabled={page >= Math.ceil(orders.data.total / orders.data.pageSize)}
            onClick={() => updateFilter('page', String(page + 1))}
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
