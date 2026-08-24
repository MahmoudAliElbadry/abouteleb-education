import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { AdminUniversityPage } from './AdminUniversityPage.js';
import { LanguageProvider } from '../i18n/LanguageContext.js';

function renderPage() {
  return render(
    <LanguageProvider>
      <AdminUniversityPage />
    </LanguageProvider>,
  );
}

const mocks = vi.hoisted(() => ({
  query: {
    isPending: false,
    error: null as unknown,
    data: {
      items: [
        {
          id: 'u1',
          slug: 'example',
          nameAr: 'جامعة',
          nameEn: 'Example University',
          nameTr: 'Örnek',
          summaryAr: 'ملخص',
          summaryEn: 'Summary',
          summaryTr: 'Özet',
          city: 'Istanbul',
          imageUrl: 'https://aboutalebeducation.com/u.png',
          websiteUrl: null,
          featured: false,
          isPublished: true,
          archivedAt: null,
          sortOrder: 0,
          createdAt: '',
          updatedAt: '',
        },
      ],
      total: 1,
      page: 1,
      pageSize: 20,
    },
    refetch: vi.fn(),
  },
  mutation: { mutate: vi.fn(), isPending: false },
}));
vi.mock('@tanstack/react-query', () => ({
  useQuery: () => mocks.query,
  useMutation: () => mocks.mutation,
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
}));

describe('AdminUniversityPage', () => {
  afterEach(() => cleanup());
  it('renders university records and allows editing', () => {
    renderPage();
    expect(screen.getByText('Example University')).toBeInTheDocument();
    const form = screen.getByRole('heading', { name: 'Add university' }).closest('form');
    const toolbar = screen.getByPlaceholderText('Search').closest('section');
    expect(
      (form?.compareDocumentPosition(toolbar as Node) ?? 0) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    fireEvent.change(screen.getByRole('combobox', { name: 'Language' }), {
      target: { value: 'ar' },
    });
    expect(screen.getByText('جامعة')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('combobox', { name: 'Language' }), {
      target: { value: 'tr' },
    });
    expect(screen.getByText('Örnek')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('combobox', { name: 'Language' }), {
      target: { value: 'en' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(screen.getByRole('heading', { name: 'Edit' })).toBeInTheDocument();
  });
  it('rejects a non-HTTPS image URL before mutation', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Add university' }));
    for (const [label, value] of [
      ['Slug', 'example'],
      ['Arabic name', 'جامعة'],
      ['English name', 'Example University'],
      ['Turkish name', 'Örnek'],
      ['Arabic summary', 'ملخص'],
      ['English summary', 'Summary'],
      ['Turkish summary', 'Özet'],
      ['City', 'Istanbul'],
    ] as const) {
      fireEvent.change(screen.getByLabelText(label), { target: { value } });
    }
    fireEvent.change(screen.getByLabelText('HTTPS image URL'), {
      target: { value: 'http://example.com/u.png' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(screen.getByRole('alert')).toHaveTextContent('The URL must start with https://.');
    expect(mocks.mutation.mutate).not.toHaveBeenCalled();
  });
});
