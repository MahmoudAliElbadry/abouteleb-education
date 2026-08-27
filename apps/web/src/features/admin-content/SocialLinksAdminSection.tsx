import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { SocialIconKey } from '@abou/contracts';
import { ApiError } from '../auth/auth-client.js';
import {
  archiveSocialLink,
  createSocialLink,
  getAdminSocialLinks,
  restoreSocialLink,
  updateSocialLink,
  type ManagedSocialLink,
} from './managed-content-client.js';
import type { AdminLanguage } from './AdminManagedContentPage.js';
const copy = {
  ar: {
    save: 'حفظ',
    error: 'تعذر حفظ المحتوى.',
    edit: 'تعديل',
    remove: 'إزالة',
    restore: 'استعادة',
    cancel: 'إلغاء',
  },
  en: {
    save: 'Save',
    error: 'Unable to save content.',
    edit: 'Edit',
    remove: 'Remove',
    restore: 'Restore',
    cancel: 'Cancel',
  },
  tr: {
    save: 'Kaydet',
    error: 'İçerik kaydedilemedi.',
    edit: 'Düzenle',
    remove: 'Kaldır',
    restore: 'Geri yükle',
    cancel: 'İptal',
  },
} as const;
type SocialLinkForm = {
  platform: string;
  labelAr: string;
  labelEn: string;
  labelTr: string;
  url: string;
  iconKey: SocialIconKey;
  isVisible: boolean;
  sortOrder: number;
};
const empty: SocialLinkForm = {
  platform: '',
  labelAr: '-',
  labelEn: '-',
  labelTr: '-',
  url: '',
  iconKey: 'instagram',
  isVisible: true,
  sortOrder: 0,
};
export function SocialLinksAdminSection({ language }: { language: AdminLanguage }) {
  const t = copy[language];
  const client = useQueryClient();
  const [form, setForm] = useState<SocialLinkForm>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const query = useQuery({ queryKey: ['admin-social'], queryFn: getAdminSocialLinks });
  const save = useMutation({
    mutationFn: () => (editingId ? updateSocialLink(editingId, form) : createSocialLink(form)),
    onSuccess: () => {
      setError('');
      setForm(empty);
      setEditingId(null);
      void client.invalidateQueries({ queryKey: ['admin-social'] });
    },
    onError: (reason) => setError(reason instanceof ApiError ? reason.message : t.error),
  });
  const reorder = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<ManagedSocialLink> }) =>
      updateSocialLink(id, input),
    onSuccess: () => void client.invalidateQueries({ queryKey: ['admin-social'] }),
    onError: (reason) => setError(reason instanceof ApiError ? reason.message : t.error),
  });
  const archive = useMutation({
    mutationFn: archiveSocialLink,
    onSuccess: () => void client.invalidateQueries({ queryKey: ['admin-social'] }),
    onError: (reason) => setError(reason instanceof ApiError ? reason.message : t.error),
  });
  const restore = useMutation({
    mutationFn: restoreSocialLink,
    onSuccess: () => void client.invalidateQueries({ queryKey: ['admin-social'] }),
    onError: (reason) => setError(reason instanceof ApiError ? reason.message : t.error),
  });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    save.mutate();
  };
  function edit(item: ManagedSocialLink) {
    setEditingId(item.id);
    setForm({
      platform: item.platform,
      labelAr: item.labelAr,
      labelEn: item.labelEn,
      labelTr: item.labelTr,
      url: item.url,
      iconKey: item.iconKey,
      isVisible: item.isVisible,
      sortOrder: item.sortOrder,
    });
  }
  function cancelEdit() {
    setEditingId(null);
    setForm(empty);
  }
  const active = query.data?.items.filter((item) => !item.archivedAt) ?? [];
  const archived = query.data?.items.filter((item) => item.archivedAt) ?? [];
  return (
    <>
      <form onSubmit={submit} className="content-form compact-content-form">
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
        <div className="form-actions">
          <button className="button" type="submit" disabled={save.isPending}>
            {t.save}
          </button>
          {editingId ? (
            <button className="button button-outline" type="button" onClick={cancelEdit}>
              {t.cancel}
            </button>
          ) : null}
        </div>
      </form>
      {error ? <p role="alert">{error}</p> : null}
      <div className="admin-order-table admin-content-list">
        {active.map((item, index) => (
          <article key={item.id} className="admin-order-row">
            <span>{item.platform}</span>
            <button
              className="button button-small button-outline"
              type="button"
              disabled={reorder.isPending || index === 0}
              onClick={() => reorder.mutate({ id: item.id, input: { sortOrder: index - 1 } })}
            >
              Move up
            </button>
            <button
              className="button button-small button-outline"
              type="button"
              disabled={reorder.isPending}
              onClick={() => reorder.mutate({ id: item.id, input: { sortOrder: index + 1 } })}
            >
              Move down
            </button>
            <button className="button button-small" type="button" onClick={() => edit(item)}>
              {t.edit}
            </button>
            <button
              className="button button-small button-danger"
              type="button"
              disabled={archive.isPending}
              onClick={() => archive.mutate(item.id)}
            >
              {t.remove}
            </button>
          </article>
        ))}
        {archived.map((item) => (
          <article key={item.id} className="admin-order-row">
            <span>{item.platform}</span>
            <span />
            <span />
            <span />
            <button
              className="button button-small button-outline"
              type="button"
              disabled={restore.isPending}
              onClick={() => restore.mutate(item.id)}
            >
              {t.restore}
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
