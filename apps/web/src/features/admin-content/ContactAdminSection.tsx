import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../auth/auth-client.js';
import { getAdminContact, updateContact } from './managed-content-client.js';
import type { AdminLanguage } from './AdminManagedContentPage.js';
const copy = {
  ar: { save: 'حفظ', error: 'تعذر حفظ المحتوى.' },
  en: { save: 'Save', error: 'Unable to save content.' },
  tr: { save: 'Kaydet', error: 'İçerik kaydedilemedi.' },
} as const;
export function ContactAdminSection({ language }: { language: AdminLanguage }) {
  const t = copy[language];
  const client = useQueryClient();
  const query = useQuery({ queryKey: ['admin-contact'], queryFn: getAdminContact });
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  useEffect(() => {
    if (query.data)
      setDrafts(Object.fromEntries(query.data.items.map((item) => [item.key, item.value])));
  }, [query.data]);
  const save = useMutation({
    mutationFn: ({ key, value }: { key: Parameters<typeof updateContact>[0]; value: string }) =>
      updateContact(key, value),
    onSuccess: () => {
      setError('');
      void client.invalidateQueries({ queryKey: ['admin-contact'] });
    },
    onError: (reason) => setError(reason instanceof ApiError ? reason.message : t.error),
  });
  return (
    <div>
      {error ? <p role="alert">{error}</p> : null}
      {query.data?.items.map((item) => (
        <form
          key={item.key}
          onSubmit={(event) => {
            event.preventDefault();
            save.mutate({ key: item.key, value: drafts[item.key] ?? item.value });
          }}
          className="content-form compact-content-form"
        >
          <label>
            {item.key}
            <input
              aria-label={item.key}
              value={drafts[item.key] ?? item.value}
              onChange={(event) => setDrafts({ ...drafts, [item.key]: event.target.value })}
            />
          </label>
          <button className="button button-small" type="submit" disabled={save.isPending}>
            {t.save}
          </button>
        </form>
      ))}
    </div>
  );
}
