import { useState } from 'react';
import type { FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../auth/auth-client.js';
import {
  archiveTestimonial,
  createSocialLink,
  createTestimonial,
  getAdminContact,
  getAdminSocialLinks,
  getAdminTestimonials,
  updateContact,
  updateSocialLink,
  updateTestimonial,
} from './managed-content-client.js';

type Language = 'ar' | 'en' | 'tr';
const copy = {
  ar: {
    testimonials: 'آراء العملاء',
    social: 'الروابط الاجتماعية',
    contact: 'بيانات التواصل',
    add: 'إضافة',
    save: 'حفظ',
    retry: 'إعادة المحاولة',
    loading: 'جار التحميل…',
    error: 'تعذر تحميل المحتوى.',
    consent: 'تم تأكيد موافقة العميل',
    publish: 'منشور',
    hide: 'مسودة',
    archive: 'أرشفة',
    up: 'تحريك لأعلى',
    down: 'تحريك لأسفل',
    url: 'الرابط',
    icon: 'الأيقونة',
    value: 'القيمة',
    noData: 'لا توجد بيانات.',
  },
  en: {
    testimonials: 'Testimonials',
    social: 'Social links',
    contact: 'Contact details',
    add: 'Add',
    save: 'Save',
    retry: 'Retry',
    loading: 'Loading…',
    error: 'Unable to load content.',
    consent: 'Client consent confirmed',
    publish: 'Published',
    hide: 'Draft',
    archive: 'Archive',
    up: 'Move up',
    down: 'Move down',
    url: 'URL',
    icon: 'Icon',
    value: 'Value',
    noData: 'No records.',
  },
  tr: {
    testimonials: 'Referanslar',
    social: 'Sosyal bağlantılar',
    contact: 'İletişim bilgileri',
    add: 'Ekle',
    save: 'Kaydet',
    retry: 'Tekrar dene',
    loading: 'Yükleniyor…',
    error: 'İçerik yüklenemedi.',
    consent: 'Müşteri onayı doğrulandı',
    publish: 'Yayınlandı',
    hide: 'Taslak',
    archive: 'Arşivle',
    up: 'Yukarı taşı',
    down: 'Aşağı taşı',
    url: 'URL',
    icon: 'Simge',
    value: 'Değer',
    noData: 'Kayıt yok.',
  },
} as const;
const emptyTestimonial = {
  clientNameAr: '',
  clientNameEn: '',
  clientNameTr: '',
  quoteAr: '',
  quoteEn: '',
  quoteTr: '',
  imageUrl: null,
  consentConfirmed: false,
  isPublished: false,
  sortOrder: 0,
};

function ErrorState({
  message,
  retry,
  label,
}: {
  message: string;
  retry: () => void;
  label: string;
}) {
  return (
    <div role="alert">
      <p>{message}</p>
      <button type="button" onClick={retry}>
        {label}
      </button>
    </div>
  );
}

export function AdminManagedContentPage({
  section = 'testimonials',
}: {
  section?: 'testimonials' | 'social' | 'contact';
}) {
  const [language, setLanguage] = useState<Language>('en');
  const t = copy[language];
  const client = useQueryClient();
  const testimonials = useQuery({
    queryKey: ['admin-testimonials'],
    queryFn: getAdminTestimonials,
    enabled: section === 'testimonials',
  });
  const social = useQuery({
    queryKey: ['admin-social'],
    queryFn: getAdminSocialLinks,
    enabled: section === 'social',
  });
  const contact = useQuery({
    queryKey: ['admin-contact'],
    queryFn: getAdminContact,
    enabled: section === 'contact',
  });
  const [form, setForm] = useState(emptyTestimonial);
  const [socialForm, setSocialForm] = useState({
    platform: '',
    labelAr: '',
    labelEn: '',
    labelTr: '',
    url: '',
    iconKey: 'instagram',
    isVisible: true,
    sortOrder: 0,
  });
  const [error, setError] = useState('');
  type MutationInput = { type: string; id?: string; value: Record<string, unknown> };
  const mutation = useMutation<unknown, unknown, MutationInput>({
    mutationFn: (input: MutationInput) =>
      input.type === 'testimonial'
        ? input.id
          ? updateTestimonial(input.id, input.value as Parameters<typeof updateTestimonial>[1])
          : createTestimonial(input.value as Parameters<typeof createTestimonial>[0])
        : input.id
          ? updateSocialLink(input.id, input.value as Parameters<typeof updateSocialLink>[1])
          : createSocialLink(input.value as Parameters<typeof createSocialLink>[0]),
    onSuccess: () => {
      setError('');
      void client.invalidateQueries();
    },
  });
  const contactMutation = useMutation({
    mutationFn: ({ key, value }: { key: string; value: string }) => updateContact(key, value),
    onSuccess: () => void client.invalidateQueries(),
  });
  const archiveMutation = useMutation({
    mutationFn: archiveTestimonial,
    onSuccess: () => void client.invalidateQueries({ queryKey: ['admin-testimonials'] }),
  });
  const submitTestimonial = (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (form.isPublished && !form.consentConfirmed) return;
    mutation.mutate(
      { type: 'testimonial', value: form },
      { onError: (e) => setError(e instanceof ApiError ? e.message : t.error) },
    );
  };
  const submitSocial = (event: FormEvent) => {
    event.preventDefault();
    mutation.mutate(
      { type: 'social', value: socialForm },
      { onError: (e) => setError(e instanceof ApiError ? e.message : t.error) },
    );
  };
  const query = section === 'testimonials' ? testimonials : section === 'social' ? social : contact;
  const heading = t[section];
  return (
    <main className="admin-page">
      <header>
        <h1>{heading}</h1>
        <select
          aria-label="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
        >
          <option value="ar">العربية</option>
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
        </select>
      </header>
      {query.isPending ? <p role="status">{t.loading}</p> : null}
      {query.error ? (
        <ErrorState message={t.error} label={t.retry} retry={() => void query.refetch()} />
      ) : null}
      {error ? <p role="alert">{error}</p> : null}
      {section === 'testimonials' && (
        <>
          <form onSubmit={submitTestimonial} className="content-form">
            <input
              aria-label="English name"
              required
              value={form.clientNameEn}
              onChange={(e) => setForm({ ...form, clientNameEn: e.target.value })}
              placeholder="English name"
            />
            <textarea
              aria-label="English quote"
              required
              value={form.quoteEn}
              onChange={(e) => setForm({ ...form, quoteEn: e.target.value })}
            />
            <label>
              <input
                type="checkbox"
                checked={form.consentConfirmed}
                onChange={(e) => setForm({ ...form, consentConfirmed: e.target.checked })}
              />
              {t.consent}
            </label>
            <label>
              <input
                type="checkbox"
                disabled={!form.consentConfirmed}
                checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
              />
              {t.publish}
            </label>
            <button
              type="submit"
              disabled={mutation.isPending || (form.isPublished && !form.consentConfirmed)}
            >
              {t.save}
            </button>
          </form>
          {testimonials.data?.items.map((item) => (
            <article key={item.id} className="admin-order-row">
              <span>{item.clientNameEn}</span>
              <span>{item.isPublished ? t.publish : t.hide}</span>
              <button
                type="button"
                onClick={() => window.confirm(t.archive) && archiveMutation.mutate(item.id)}
              >
                {t.archive}
              </button>
            </article>
          ))}
        </>
      )}
      {section === 'social' && (
        <>
          <form onSubmit={submitSocial} className="content-form">
            <input
              aria-label="Platform"
              required
              value={socialForm.platform}
              onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })}
            />
            <input
              aria-label={t.url}
              type="url"
              required
              value={socialForm.url}
              onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })}
            />
            <input
              aria-label={t.icon}
              required
              value={socialForm.iconKey}
              onChange={(e) => setSocialForm({ ...socialForm, iconKey: e.target.value })}
            />
            <button type="submit">{t.save}</button>
          </form>
          {social.data?.items.map((item, index) => (
            <article key={item.id} className="admin-order-row">
              <span>{item.platform}</span>
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.url}
              </a>
              <button
                type="button"
                onClick={() => index && updateSocialLink(item.id, { sortOrder: index - 1 })}
              >
                {t.up}
              </button>
              <button
                type="button"
                onClick={() => updateSocialLink(item.id, { sortOrder: index + 1 })}
              >
                {t.down}
              </button>
            </article>
          ))}
        </>
      )}
      {section === 'contact' && (
        <div>
          {(contact.data?.items ?? []).map((item) => (
            <form
              key={item.key}
              onSubmit={(e) => {
                e.preventDefault();
                contactMutation.mutate(item);
              }}
              className="content-form"
            >
              <label>
                {item.key}
                <input
                  aria-label={item.key}
                  value={item.value}
                  onChange={(e) => {
                    if (contact.data) item.value = e.target.value;
                  }}
                />
              </label>
              <button type="submit">{t.save}</button>
            </form>
          ))}
        </div>
      )}
    </main>
  );
}
