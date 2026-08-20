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
    save: 'حفظ',
    consent: 'تم تأكيد موافقة العميل',
    publish: 'منشور',
    archive: 'أرشفة',
    error: 'تعذر حفظ المحتوى.',
  },
  en: {
    save: 'Save',
    consent: 'Client consent confirmed',
    publish: 'Published',
    archive: 'Archive',
    error: 'Unable to save content.',
  },
  tr: {
    save: 'Kaydet',
    consent: 'Müşteri onayı doğrulandı',
    publish: 'Yayınlandı',
    archive: 'Arşivle',
    error: 'İçerik kaydedilemedi.',
  },
} as const;
const empty = {
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
      <form onSubmit={submit} className="content-form">
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
          type="submit"
          disabled={create.isPending || (form.isPublished && !form.consentConfirmed)}
        >
          {t.save}
        </button>
      </form>
      {error ? <p role="alert">{error}</p> : null}
      {query.isPending ? <p role="status">Loading…</p> : null}
      {query.data?.items.map((item) => (
        <article key={item.id} className="admin-order-row">
          <span>{item.clientNameEn}</span>
          <button
            type="button"
            disabled={archive.isPending}
            onClick={() => archive.mutate(item.id)}
          >
            {t.archive}
          </button>
        </article>
      ))}
    </>
  );
}
