import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../auth/auth-client.js';
import {
  archiveTestimonial,
  createTestimonial,
  getAdminTestimonials,
} from './managed-content-client.js';
import type { AdminLanguage } from './AdminManagedContentPage.js';
const copy = {
  ar: {
    title: 'إضافة رأي عميل',
    save: 'حفظ',
    consent: 'تم تأكيد موافقة العميل',
    publish: 'منشور',
    archive: 'أرشفة',
    error: 'تعذر حفظ المحتوى.',
    image: 'صورة رسالة العميل (رابط https)',
  },
  en: {
    title: 'Add testimonial',
    save: 'Save',
    consent: 'Client consent confirmed',
    publish: 'Published',
    archive: 'Archive',
    error: 'Unable to save content.',
    image: 'Client message screenshot (HTTPS URL)',
  },
  tr: {
    title: 'Referans ekle',
    save: 'Kaydet',
    consent: 'Müşteri onayı doğrulandı',
    publish: 'Yayınlandı',
    archive: 'Arşivle',
    error: 'İçerik kaydedilemedi.',
    image: 'Müşteri mesajı ekran görüntüsü (HTTPS URL)',
  },
} as const;
const empty: {
  clientNameAr: string;
  clientNameEn: string;
  clientNameTr: string;
  quoteAr: string;
  quoteEn: string;
  quoteTr: string;
  imageUrl: string | null;
  consentConfirmed: boolean;
  isPublished: boolean;
  sortOrder: number;
} = {
  clientNameAr: '-',
  clientNameEn: '',
  clientNameTr: '-',
  quoteAr: '-',
  quoteEn: '',
  quoteTr: '-',
  imageUrl: null,
  consentConfirmed: false,
  isPublished: false,
  sortOrder: 0,
};
export function TestimonialsAdminSection({ language }: { language: AdminLanguage }) {
  const t = copy[language];
  const client = useQueryClient();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');
  const query = useQuery({ queryKey: ['admin-testimonials'], queryFn: getAdminTestimonials });
  const create = useMutation({
    mutationFn: createTestimonial,
    onSuccess: () => {
      setError('');
      void client.invalidateQueries({ queryKey: ['admin-testimonials'] });
    },
    onError: (reason) => setError(reason instanceof ApiError ? reason.message : t.error),
  });
  const archive = useMutation({
    mutationFn: archiveTestimonial,
    onSuccess: () => void client.invalidateQueries({ queryKey: ['admin-testimonials'] }),
    onError: (reason) => setError(reason instanceof ApiError ? reason.message : t.error),
  });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (form.isPublished && !form.consentConfirmed) return;
    create.mutate(form);
  };
  return (
    <>
      <form onSubmit={submit} className="content-form admin-content-form">
        <h2>{t.title}</h2>
        <input
          aria-label="English name"
          required
          value={form.clientNameEn}
          onChange={(event) => setForm({ ...form, clientNameEn: event.target.value })}
        />
        <textarea
          aria-label="English quote"
          required
          value={form.quoteEn}
          onChange={(event) => setForm({ ...form, quoteEn: event.target.value })}
        />
        <label>
          {t.image}
          <input
            aria-label={t.image}
            type="url"
            placeholder="https://..."
            value={form.imageUrl ?? ''}
            onChange={(event) => setForm({ ...form, imageUrl: event.target.value || null })}
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={form.consentConfirmed}
            onChange={(event) => setForm({ ...form, consentConfirmed: event.target.checked })}
          />
          {t.consent}
        </label>
        <label>
          <input
            type="checkbox"
            disabled={!form.consentConfirmed}
            checked={form.isPublished}
            onChange={(event) => setForm({ ...form, isPublished: event.target.checked })}
          />
          {t.publish}
        </label>
        <button
          className="button"
          type="submit"
          disabled={create.isPending || (form.isPublished && !form.consentConfirmed)}
        >
          {t.save}
        </button>
      </form>
      {error ? <p role="alert">{error}</p> : null}
      {query.isPending ? <p role="status">Loading…</p> : null}
      <div className="admin-order-table admin-content-list">
        {query.data?.items.map((item) => (
          <article key={item.id} className="admin-order-row">
            <span>{item.clientNameEn}</span>
            <button
              className="button button-small button-danger"
              type="button"
              disabled={archive.isPending}
              onClick={() => archive.mutate(item.id)}
            >
              {t.archive}
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
