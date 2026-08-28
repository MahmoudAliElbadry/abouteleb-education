import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../auth/auth-client.js';
import { ImageUploadField } from './ImageUploadField.js';
import {
  archiveTestimonial,
  createTestimonial,
  getAdminTestimonials,
} from './managed-content-client.js';
import type { AdminLanguage } from './AdminManagedContentPage.js';
const copy = {
  ar: {
    title: 'إضافة رأي عميل',
    nameAr: 'اسم العميل بالعربية',
    nameEn: 'اسم العميل بالإنجليزية',
    nameTr: 'اسم العميل بالتركية',
    quoteAr: 'رأي العميل بالعربية',
    quoteEn: 'رأي العميل بالإنجليزية',
    quoteTr: 'رأي العميل بالتركية',
    save: 'حفظ',
    consent: 'تم تأكيد موافقة العميل',
    publish: 'منشور',
    archive: 'أرشفة',
    error: 'تعذر حفظ المحتوى.',
    image: 'صورة رسالة العميل',
  },
  en: {
    title: 'Add testimonial',
    nameAr: 'Arabic client name',
    nameEn: 'English client name',
    nameTr: 'Turkish client name',
    quoteAr: 'Arabic quote',
    quoteEn: 'English quote',
    quoteTr: 'Turkish quote',
    save: 'Save',
    consent: 'Client consent confirmed',
    publish: 'Published',
    archive: 'Archive',
    error: 'Unable to save content.',
    image: 'Client message screenshot',
  },
  tr: {
    title: 'Referans ekle',
    nameAr: 'Arapça müşteri adı',
    nameEn: 'İngilizce müşteri adı',
    nameTr: 'Türkçe müşteri adı',
    quoteAr: 'Arapça yorum',
    quoteEn: 'İngilizce yorum',
    quoteTr: 'Türkçe yorum',
    save: 'Kaydet',
    consent: 'Müşteri onayı doğrulandı',
    publish: 'Yayınlandı',
    archive: 'Arşivle',
    error: 'İçerik kaydedilemedi.',
    image: 'Müşteri mesajı ekran görüntüsü',
  },
} as const;
type TestimonialForm = {
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
};
const empty: TestimonialForm = {
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
export function TestimonialsAdminSection({ language }: { language: AdminLanguage }) {
  const t = copy[language];
  const client = useQueryClient();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const query = useQuery({ queryKey: ['admin-testimonials'], queryFn: getAdminTestimonials });
  const create = useMutation({
    mutationFn: createTestimonial,
    onSuccess: () => {
      setError('');
      setForm(empty);
      void client.invalidateQueries({ queryKey: ['admin-testimonials'] });
      void client.invalidateQueries({ queryKey: ['public-testimonials'] });
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
    setError('');
    if (isUploading) return;
    if (form.isPublished && !form.consentConfirmed) {
      setError(t.error);
      return;
    }
    create.mutate(form);
  };
  return (
    <>
      <form onSubmit={submit} className="content-form admin-content-form">
        <h2>{t.title}</h2>
        <div className="content-form-grid">
          {(['clientNameAr', 'clientNameEn', 'clientNameTr'] as const).map((key) => (
            <label key={key}>
              {t[key.replace('clientName', 'name') as 'nameAr' | 'nameEn' | 'nameTr']}
              <input
                aria-label={t[key.replace('clientName', 'name') as 'nameAr' | 'nameEn' | 'nameTr']}
                required
                value={form[key]}
                onChange={(event) => setForm({ ...form, [key]: event.target.value })}
              />
            </label>
          ))}
        </div>
        <div className="content-form-grid">
          {(['quoteAr', 'quoteEn', 'quoteTr'] as const).map((key) => (
            <label key={key}>
              {t[key]}
              <textarea
                aria-label={t[key]}
                required
                rows={4}
                value={form[key]}
                onChange={(event) => setForm({ ...form, [key]: event.target.value })}
              />
            </label>
          ))}
        </div>
        <ImageUploadField
          value={form.imageUrl}
          onChange={(url) => setForm({ ...form, imageUrl: url })}
          onUploadingChange={setIsUploading}
          label={t.image}
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={form.consentConfirmed}
            onChange={(event) => setForm({ ...form, consentConfirmed: event.target.checked })}
          />
          {t.consent}
        </label>
        <label className="checkbox-label">
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
          disabled={isUploading || create.isPending || (form.isPublished && !form.consentConfirmed)}
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
