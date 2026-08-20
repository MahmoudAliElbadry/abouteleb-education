import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App, normalizeCatalogSearch } from './App.js';

vi.mock('@tanstack/react-query', async () => {
  const actual =
    await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query');
  return {
    ...actual,
    useQuery: (options: { queryKey?: string[] }) => ({
      isPending: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
      data:
        options.queryKey?.[0] === 'public-universities'
          ? {
              items: Array.from({ length: 41 }, (_, index) => ({
                id: `university-${index}`,
                slug: `university-${index}`,
                nameAr: `جامعة ${index}`,
                nameEn: `University ${index}`,
                nameTr: `Üniversite ${index}`,
                city: index % 2 ? 'Ankara' : 'Istanbul',
                imageUrl: 'https://example.com/logo.png',
                featured: index < 3,
                sortOrder: index,
              })),
            }
          : { items: [] },
    }),
  };
});

describe('App', () => {
  afterEach(cleanup);

  function renderApp(initialEntry = '/') {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={[initialEntry]}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  }

  it('renders the foundation landing page from a direct URL', () => {
    renderApp();

    expect(screen.getByRole('link', { name: 'Abou-Taleb Education' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /مستقبلك الدراسي/i })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(12);
    fireEvent.click(screen.getByRole('button', { name: 'عرض المزيد من الجامعات' }));
    expect(screen.getAllByRole('article')).toHaveLength(45);
  });

  it('renders the login page from a direct URL', () => {
    renderApp('/login');

    expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeInTheDocument();
  });

  it('keeps every public navigation link pointed at an existing section', () => {
    renderApp();

    screen
      .getByRole('navigation')
      .querySelectorAll('a[href^="#"]')
      .forEach((link) => {
        expect(document.getElementById(link.getAttribute('href')!.slice(1))).toBeInTheDocument();
      });
  });

  it.each([
    ['/missing?lang=ar', 'الصفحة غير موجودة'],
    ['/missing?lang=en', 'Page not found'],
    ['/missing?lang=tr', 'Sayfa bulunamadı'],
  ])('renders a localized not-found state for %s', (path, heading) => {
    renderApp(path);

    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
  });

  it('normalizes Turkish dotted and dotless I search input', () => {
    expect(normalizeCatalogSearch('İstanbul')).toBe('istanbul');
    expect(normalizeCatalogSearch('istanbul')).toBe('istanbul');
    expect(normalizeCatalogSearch('Istanbul')).toBe('istanbul');
  });
});
