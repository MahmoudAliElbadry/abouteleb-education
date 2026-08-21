import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ApiError } from '../auth/auth-client.js';
import {
  archiveUniversity,
  createUniversity,
  getAdminUniversities,
  restoreUniversity,
  updateUniversity,
  type ManagedUniversity,
  type UniversityInput,
} from './university-client.js';

const copy = {
  ar: {
    title: 'إدارة الجامعات',
    search: 'بحث',
    all: 'كل الحالات',
    published: 'منشورة',
    draft: 'مسودة',
    create: 'إضافة جامعة',
    edit: 'تعديل',
    archive: 'أرشفة',
    restore: 'استعادة',
    save: 'حفظ',
    cancel: 'إلغاء',
    retry: 'إعادة المحاولة',
    loading: 'جارٍ التحميل…',
    error: 'تعذر تحميل الجامعات.',
    noData: 'لا توجد جامعات.',
    slug: 'الرابط المختصر',
    nameAr: 'الاسم بالعربية',
    nameEn: 'الاسم بالإنجليزية',
    nameTr: 'الاسم بالتركية',
    summaryAr: 'الملخص بالعربية',
    summaryEn: 'الملخص بالإنجليزية',
    summaryTr: 'الملخص بالتركية',
    city: 'المدينة',
    imageUrl: 'رابط الصورة HTTPS',
    websiteUrl: 'الموقع الإلكتروني HTTPS',
    featured: 'مميزة',
    isPublished: 'منشورة',
    sortOrder: 'ترتيب العرض',
    confirmArchive: 'هل تريد أرشفة هذه الجامعة؟',
    invalidUrl: 'يجب أن يبدأ الرابط بـ https://.',
  },
  en: {
    title: 'University management',
    search: 'Search',
    all: 'All statuses',
    published: 'Published',
    draft: 'Draft',
    create: 'Add university',
    edit: 'Edit',
    archive: 'Archive',
    restore: 'Restore',
    save: 'Save',
    cancel: 'Cancel',
    retry: 'Try again',
    loading: 'Loading…',
    error: 'Unable to load universities.',
    noData: 'No universities found.',
    slug: 'Slug',
    nameAr: 'Arabic name',
    nameEn: 'English name',
    nameTr: 'Turkish name',
    summaryAr: 'Arabic summary',
    summaryEn: 'English summary',
    summaryTr: 'Turkish summary',
    city: 'City',
    imageUrl: 'HTTPS image URL',
    websiteUrl: 'HTTPS website URL',
    featured: 'Featured',
    isPublished: 'Published',
    sortOrder: 'Display order',
    confirmArchive: 'Archive this university?',
    invalidUrl: 'The URL must start with https://.',
  },
  tr: {
    title: 'Üniversite yönetimi',
    search: 'Ara',
    all: 'Tüm durumlar',
    published: 'Yayınlandı',
    draft: 'Taslak',
    create: 'Üniversite ekle',
    edit: 'Düzenle',
    archive: 'Arşivle',
    restore: 'Geri yükle',
    save: 'Kaydet',
    cancel: 'İptal',
    retry: 'Tekrar dene',
    loading: 'Yükleniyor…',
    error: 'Üniversiteler yüklenemedi.',
    noData: 'Üniversite bulunamadı.',
    slug: 'Kısa ad',
    nameAr: 'Arapça ad',
    nameEn: 'İngilizce ad',
    nameTr: 'Türkçe ad',
    summaryAr: 'Arapça özet',
    summaryEn: 'İngilizce özet',
    summaryTr: 'Türkçe özet',
    city: 'Şehir',
    imageUrl: 'HTTPS görsel URL',
    websiteUrl: 'HTTPS web sitesi URL',
    featured: 'Öne çıkan',
    isPublished: 'Yayınlandı',
    sortOrder: 'Görüntüleme sırası',
    confirmArchive: 'Bu üniversite arşivlensin mi?',
    invalidUrl: 'URL https:// ile başlamalıdır.',
  },
} as const;
type Language = keyof typeof copy;
const emptyForm: UniversityInput = {
  slug: '',
  nameAr: '',
  nameEn: '',
  nameTr: '',
  summaryAr: '',
  summaryEn: '',
  summaryTr: '',
  city: '',
  imageUrl: '',
  websiteUrl: null,
  featured: false,
  isPublished: false,
  sortOrder: 0,
};

export function AdminUniversityPage() {
  const [language, setLanguage] = useState<Language>('en');
  const t = copy[language];
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [form, setForm] = useState<UniversityInput>(emptyForm);
  const [editing, setEditing] = useState<ManagedUniversity | null>(null);
  const [formError, setFormError] = useState('');
  const queryClient = useQueryClient();
  const universities = useQuery({
    queryKey: ['admin', 'universities', search, status],
    queryFn: () => getAdminUniversities({ search, isPublished: status }),
    retry: false,
  });
  const save = useMutation({
    mutationFn: () => (editing ? updateUniversity(editing.id, form) : createUniversity(form)),
    onSuccess: () => {
      setForm(emptyForm);
      setEditing(null);
      void queryClient.invalidateQueries({ queryKey: ['admin', 'universities'] });
    },
  });
  const archive = useMutation({
    mutationFn: (id: string) => archiveUniversity(id),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['admin', 'universities'] }),
  });
  const restore = useMutation({
    mutationFn: (id: string) => restoreUniversity(id),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['admin', 'universities'] }),
  });
  function submit(event: React.FormEvent) {
    event.preventDefault();
    setFormError('');
    if (
      !form.imageUrl.startsWith('https://') ||
      (form.websiteUrl && !form.websiteUrl.startsWith('https://'))
    ) {
      setFormError(t.invalidUrl);
      return;
    }
    save.mutate();
  }
  function edit(university: ManagedUniversity) {
    setEditing(university);
    setForm({ ...university, websiteUrl: university.websiteUrl });
  }
  return (
    <main className="admin-page" dir={language === 'ar' ? 'rtl' : 'ltr'} lang={language}>
      <header className="admin-header">
        <h1>{t.title}</h1>
        <select
          aria-label="Language"
          value={language}
          onChange={(event) => setLanguage(event.target.value as Language)}
        >
          <option value="ar">العربية</option>
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
        </select>
      </header>
      <section className="admin-toolbar">
        <input
          aria-label={t.search}
          placeholder={t.search}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          aria-label={t.all}
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="">{t.all}</option>
          <option value="true">{t.published}</option>
          <option value="false">{t.draft}</option>
        </select>
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setForm(emptyForm);
          }}
        >
          {t.create}
        </button>
      </section>
      {universities.isPending ? <p role="status">{t.loading}</p> : null}
      {universities.error ? (
        <div role="alert">
          <p>{universities.error instanceof ApiError ? universities.error.message : t.error}</p>
          <button type="button" onClick={() => void universities.refetch()}>
            {t.retry}
          </button>
        </div>
      ) : null}
      {!universities.isPending && universities.data && !universities.data.items.length ? (
        <p className="empty-state">{t.noData}</p>
      ) : null}
      <div className="admin-order-table">
        {universities.data?.items.map((university) => (
          <article key={university.id} className="admin-order-row">
            <span>
              <strong>{university.nameEn}</strong>
              <small>{university.slug}</small>
            </span>
            <span>{university.city}</span>
            <span>{university.isPublished ? t.published : t.draft}</span>
            <button type="button" onClick={() => edit(university)}>
              {t.edit}
            </button>
            {university.archivedAt ? (
              <button type="button" onClick={() => restore.mutate(university.id)}>
                {t.restore}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => window.confirm(t.confirmArchive) && archive.mutate(university.id)}
              >
                {t.archive}
              </button>
            )}
          </article>
        ))}
      </div>
      <form className="content-form" onSubmit={submit}>
        <h2>{editing ? t.edit : t.create}</h2>
        {(
          [
            'slug',
            'nameAr',
            'nameEn',
            'nameTr',
            'summaryAr',
            'summaryEn',
            'summaryTr',
            'city',
            'imageUrl',
            'websiteUrl',
          ] as const
        ).map((key) => (
          <label key={key}>
            {t[key]}
            <input
              value={form[key] ?? ''}
              onChange={(event) => setForm({ ...form, [key]: event.target.value })}
              required={key !== 'websiteUrl'}
            />
            {key === 'imageUrl' && form.imageUrl.startsWith('https://') ? (
              <img src={form.imageUrl} alt="" width="80" />
            ) : null}
          </label>
        ))}
        <label>
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) => setForm({ ...form, featured: event.target.checked })}
          />
          {t.featured}
        </label>
        <label>
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(event) => setForm({ ...form, isPublished: event.target.checked })}
          />
          {t.isPublished}
        </label>
        <label>
          {t.sortOrder}
          <input
            type="number"
            value={form.sortOrder}
            onChange={(event) => setForm({ ...form, sortOrder: Number(event.target.value) })}
          />
        </label>
        {formError ? <p role="alert">{formError}</p> : null}
        <button type="submit" disabled={save.isPending}>
          {t.save}
        </button>
        {editing ? (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setForm(emptyForm);
            }}
          >
            {t.cancel}
          </button>
        ) : null}
      </form>
    </main>
  );
}
