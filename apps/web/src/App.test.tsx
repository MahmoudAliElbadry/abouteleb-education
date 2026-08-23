import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App, normalizeCatalogSearch } from './App.js';
import { LanguageProvider } from './features/i18n/LanguageContext.js';

const queryState = vi.hoisted(() => ({
  universityRequestFailed: false,
  authUser: null as {
    id: string;
    email: string;
    role: 'CLIENT' | 'ADMIN';
    emailVerified: boolean;
    fullName: string | null;
  } | null,
}));

vi.mock('@tanstack/react-query', async () => {
  const actual =
    await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query');
  return {
    ...actual,
    useQuery: (options: { queryKey?: string[] }) => {
      const universityRequest = options.queryKey?.[0] === 'public-universities';
      const authRequest = options.queryKey?.[0] === 'auth';
      const socialRequest = options.queryKey?.[0] === 'public-social-links';
      const contactRequest = options.queryKey?.[0] === 'public-contact';
      return {
        isPending: false,
        isError: universityRequest && queryState.universityRequestFailed,
        error:
          universityRequest && queryState.universityRequestFailed ? new Error('offline') : null,
        refetch: vi.fn(),
        data: universityRequest
          ? queryState.universityRequestFailed
            ? undefined
            : {
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
          : authRequest
            ? queryState.authUser
              ? { user: queryState.authUser }
              : null
            : socialRequest
              ? {
                  items: [
                    {
                      id: 'whatsapp',
                      platform: 'WhatsApp',
                      labelAr: 'واتساب',
                      labelEn: 'WhatsApp',
                      labelTr: 'WhatsApp',
                      url: 'https://wa.me/905015959880',
                      iconKey: 'whatsapp',
                    },
                  ],
                }
              : contactRequest
                ? {
                    items: [
                      { key: 'contact_email_primary', value: 'info@aboutalebeducation.com' },
                      { key: 'contact_email_secondary', value: 'AboutalebEducation@gmail.com' },
                      { key: 'contact_whatsapp', value: '+90 501 595 98 80' },
                    ],
                  }
                : { items: [] },
      };
    },
  };
});

describe('App', () => {
  afterEach(() => {
    queryState.universityRequestFailed = false;
    queryState.authUser = null;
    vi.unstubAllGlobals();
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
    window.localStorage?.clear();
    cleanup();
  });

  function renderApp(initialEntry = '/') {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <LanguageProvider>
          <MemoryRouter initialEntries={[initialEntry]}>
            <App />
          </MemoryRouter>
        </LanguageProvider>
      </QueryClientProvider>,
    );
  }

  it('renders the foundation landing page from a direct URL', () => {
    renderApp();

    expect(screen.getByRole('link', { name: 'Abou-Taleb Education' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Your academic future in/i })).toBeInTheDocument();
    expect(document.querySelectorAll('.stat-value')).toHaveLength(4);
    expect(screen.getAllByRole('article')).toHaveLength(12);
    fireEvent.click(screen.getByRole('button', { name: 'Show more universities' }));
    expect(screen.getAllByRole('article')).toHaveLength(45);
  });

  it.each([
    ['/login', 'Welcome back'],
    ['/register', 'Start your journey'],
    ['/verify-email', 'Verify your email'],
    ['/forgot-password', 'Reset your password'],
    ['/reset-password', 'Choose a new password'],
  ])('renders the shared auth shell from %s', (path, heading) => {
    renderApp(path);

    expect(document.querySelector('.auth-page')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back home' })).toHaveAttribute('href', '/');
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

  it('shows sign in to visitors and admin controls to administrators', () => {
    renderApp();
    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/login');

    cleanup();
    queryState.authUser = {
      id: 'admin-1',
      email: 'admin@example.com',
      role: 'ADMIN',
      emailVerified: true,
      fullName: 'Admin',
    };
    renderApp();

    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute(
      'href',
      '/admin/orders',
    );
    expect(screen.getByRole('button', { name: 'Sign out' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Apply now' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Get a free consultation' })).not.toBeInTheDocument();
  });

  it('places universities before services and renders the static footer details', () => {
    renderApp();

    expect(
      [...screen.getByRole('navigation').querySelectorAll('a')].map((link) =>
        link.getAttribute('href'),
      ),
    ).toEqual(['#home', '#universities', '#services', '#steps', '#contact']);
    const whatsappLinks = screen.getAllByRole('link', { name: 'WhatsApp' });
    expect(whatsappLinks[0]).toHaveAttribute('href', 'https://wa.me/905015959880');
    expect(screen.queryByRole('link', { name: '+90 501 595 98 80' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'info@aboutalebeducation.com' })).toHaveAttribute(
      'href',
      'mailto:info@aboutalebeducation.com',
    );
    expect(screen.getByRole('link', { name: 'AboutalebEducation@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:AboutalebEducation@gmail.com',
    );
    expect(whatsappLinks[1]).toHaveAttribute('href', 'https://wa.me/905015959880');
    expect(whatsappLinks[1]!.querySelector('img')).toHaveAttribute(
      'src',
      '/images/whatsapp-svgrepo-com.svg',
    );
  });

  it('sends the hero consultation CTA to enrolment and returns to the top after scrolling', () => {
    const scrollTo = vi.fn();
    vi.stubGlobal('scrollTo', scrollTo);
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 401 });
    renderApp();

    expect(screen.getByRole('link', { name: 'Get a free consultation' })).toHaveAttribute(
      'href',
      '#enroll',
    );
    fireEvent.click(screen.getByRole('button', { name: 'Back to top' }));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
  });

  it('reveals the services and process content immediately when reduced motion is preferred', () => {
    renderApp();

    expect(document.querySelector('#services .reveal-group')).toHaveClass('is-revealed');
    expect(document.querySelector('#steps .reveal-group')).toHaveClass('is-revealed');
  });

  it('uses a dedicated fixed-circle hook for the locked enrolment badge', () => {
    renderApp();

    expect(document.querySelector('.enrollment-lock')).toHaveClass('is-circle');
  });

  it('falls back to the bundled catalogue when the public universities request fails', () => {
    queryState.universityRequestFailed = true;
    renderApp();

    expect(screen.getByRole('status')).toHaveTextContent('Unable to load universities.');
    expect(screen.getByText('Acıbadem Mehmet Ali Aydınlar Üniversitesi')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
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

  it('uses the local image fallback after a catalog image error', () => {
    renderApp();
    const image = screen.getAllByRole('img')[1] as HTMLImageElement;
    fireEvent.error(image);
    expect(image.src).toContain('/images/logo.png');
  });
});
