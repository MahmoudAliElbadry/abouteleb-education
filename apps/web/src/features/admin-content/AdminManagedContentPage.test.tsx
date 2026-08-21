import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { AdminManagedContentPage } from './AdminManagedContentPage.js';

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
    render(<AdminManagedContentPage />);
    const consent = screen.getByRole('checkbox', { name: 'Client consent confirmed' });
    const publish = consent.parentElement?.nextElementSibling?.querySelector('input');
    expect(publish).toBeDisabled();
  });
  it('renders localized social controls', () => {
    render(<AdminManagedContentPage section="social" />);
    fireEvent.change(screen.getByRole('combobox', { name: 'Language' }), {
      target: { value: 'tr' },
    });
    expect(screen.getByRole('heading', { name: 'Sosyal bağlantılar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Kaydet' })).toBeInTheDocument();
  });
});
