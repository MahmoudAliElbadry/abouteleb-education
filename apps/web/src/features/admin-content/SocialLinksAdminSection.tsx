import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../auth/auth-client.js';
import {
  createSocialLink,
  getAdminSocialLinks,
  updateSocialLink,
  type ManagedSocialLink,
} from './managed-content-client.js';
import type { AdminLanguage } from './AdminManagedContentPage.js';
const copy = {
  ar: { save: 'حفظ', error: 'تعذر حفظ المحتوى.' },
  en: { save: 'Save', error: 'Unable to save content.' },
  tr: { save: 'Kaydet', error: 'İçerik kaydedilemedi.' },
} as const;
const empty = {
  platform: '',
  labelAr: '-',
  labelEn: '-',
  labelTr: '-',
  url: '',
  iconKey: 'instagram' as const,
  isVisible: true,
  sortOrder: 0,
};
export function SocialLinksAdminSection({ language }: { language: AdminLanguage }) {
  const t = copy[language];
  const client = useQueryClient();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');
  const query = useQuery({ queryKey: ['admin-social'], queryFn: getAdminSocialLinks });
  const create = useMutation({
    mutationFn: createSocialLink,
    onSuccess: () => {
      setError('');
      void client.invalidateQueries({ queryKey: ['admin-social'] });
    },
    onError: (reason) => setError(reason instanceof ApiError ? reason.message : t.error),
  });
  const update = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<ManagedSocialLink> }) =>
      updateSocialLink(id, input),
    onSuccess: () => void client.invalidateQueries({ queryKey: ['admin-social'] }),
    onError: (reason) => setError(reason instanceof ApiError ? reason.message : t.error),
  });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    create.mutate(form);
  };
  return (
    <>
      <form onSubmit={submit} className="content-form">
        <input
          aria-label="Platform"
          required
          value={form.platform}
          onChange={(event) => setForm({ ...form, platform: event.target.value })}
        />
        <input
          aria-label="URL"
          type="url"
          required
          value={form.url}
          onChange={(event) => setForm({ ...form, url: event.target.value })}
        />
        <input
          aria-label="Icon"
          required
          value={form.iconKey}
          onChange={(event) =>
            setForm({ ...form, iconKey: event.target.value as typeof form.iconKey })
          }
        />
        <button type="submit" disabled={create.isPending}>
          {t.save}
        </button>
      </form>
      {error ? <p role="alert">{error}</p> : null}
      {query.data?.items.map((item, index) => (
        <article key={item.id} className="admin-order-row">
          <span>{item.platform}</span>
          <button
            type="button"
            disabled={update.isPending || index === 0}
            onClick={() => update.mutate({ id: item.id, input: { sortOrder: index - 1 } })}
          >
            Move up
          </button>
          <button
            type="button"
            disabled={update.isPending}
            onClick={() => update.mutate({ id: item.id, input: { sortOrder: index + 1 } })}
          >
            Move down
          </button>
        </article>
      ))}
    </>
  );
}
