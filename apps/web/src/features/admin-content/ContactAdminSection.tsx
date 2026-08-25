import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ManagedContactKey } from '@abou/contracts';
import { ApiError } from '../auth/auth-client.js';
import { getAdminContact, updateContact } from './managed-content-client.js';
import type { AdminLanguage } from './AdminManagedContentPage.js';
const copy = {
  ar: { save: 'حفظ', error: 'تعذر حفظ المحتوى.' },
  en: { save: 'Save', error: 'Unable to save content.' },
  tr: { save: 'Kaydet', error: 'İçerik kaydedilemedi.' },
} as const;
const contactLabels: Record<AdminLanguage, Record<ManagedContactKey, string>> = {
  ar: {
    contact_phone: 'رقم الهاتف',
    contact_email_primary: 'البريد الإلكتروني الأساسي',
    contact_email_secondary: 'البريد الإلكتروني الثانوي',
    contact_whatsapp: 'رقم واتساب',
  },
  en: {
    contact_phone: 'Phone number',
    contact_email_primary: 'Primary email',
    contact_email_secondary: 'Secondary email',
    contact_whatsapp: 'WhatsApp number',
  },
  tr: {
    contact_phone: 'Telefon numarası',
    contact_email_primary: 'Birincil e-posta',
    contact_email_secondary: 'İkincil e-posta',
    contact_whatsapp: 'WhatsApp numarası',
  },
};
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
          className="content-form contact-form-row"
        >
          <label>
            {contactLabels[language][item.key]}
            <input
              aria-label={contactLabels[language][item.key]}
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
