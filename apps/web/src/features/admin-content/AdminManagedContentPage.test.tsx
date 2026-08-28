import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { AdminManagedContentPage } from './AdminManagedContentPage.js';
import { LanguageProvider } from '../i18n/LanguageContext.js';

const query = { isPending: false, error: null, data: { items: [], total: 0 }, refetch: vi.fn() };
const mutation = { mutate: vi.fn(), isPending: false };
vi.mock('@tanstack/react-query', () => ({
  useQuery: () => query,
  useMutation: () => mutation,
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
}));

describe('AdminManagedContentPage', () => {
  afterEach(() => cleanup());
  it('keeps testimonial publication disabled until consent is checked', () => {
    render(
      <LanguageProvider>
        <AdminManagedContentPage />
      </LanguageProvider>,
    );
    const consent = screen.getByRole('checkbox', { name: 'Client consent confirmed' });
    const publish = consent.parentElement?.nextElementSibling?.querySelector('input');
    expect(publish).toBeDisabled();
  });
  it('renders all required testimonial content fields', () => {
    render(
      <LanguageProvider>
        <AdminManagedContentPage />
      </LanguageProvider>,
    );

    expect(screen.getByRole('textbox', { name: 'Arabic client name' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'English client name' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Turkish client name' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Arabic quote' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'English quote' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Turkish quote' })).toBeInTheDocument();
  });
  it('renders localized social controls', () => {
    render(
      <LanguageProvider>
        <AdminManagedContentPage mode="contact-social" />
      </LanguageProvider>,
    );
    fireEvent.change(screen.getByRole('combobox', { name: 'Language' }), {
      target: { value: 'tr' },
    });
    expect(screen.getByRole('heading', { name: 'İletişim ve sosyal' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Kaydet' })).toBeInTheDocument();
  });
});
