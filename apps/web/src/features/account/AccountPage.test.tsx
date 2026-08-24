import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AccountPage } from './AccountPage.js';
import { LanguageProvider } from '../i18n/LanguageContext.js';

const mocks = vi.hoisted(() => ({
  createOrder: vi.fn(),
  session: {
    user: {
      id: 'client-1',
      email: 'client@example.com',
      role: 'CLIENT' as const,
      emailVerified: true,
      fullName: 'Client Name',
    },
    isPending: false,
    logout: { mutateAsync: vi.fn(), isPending: false },
  },
  query: {
    isPending: false,
    isError: false,
    data: {
      items: [] as Array<{
        id: string;
        reference: string;
        specializationLabel: string;
        status: string;
        submittedAt: string;
        statusHistory: Array<{
          fromStatus: string | null;
          toStatus: string;
          clientVisibleMessage: string | null;
          createdAt: string;
        }>;
      }>,
      total: 0,
      page: 1,
      pageSize: 50,
    },
    error: null as unknown,
    refetch: vi.fn(),
  },
}));

vi.mock('../auth/useAuth.js', () => ({ useAuth: () => mocks.session }));
vi.mock('../auth/auth-client.js', () => ({ createOrder: mocks.createOrder }));
vi.mock('@tanstack/react-query', () => ({ useQuery: () => mocks.query }));

describe('AccountPage', () => {
  afterEach(() => {
    cleanup();
    mocks.createOrder.mockReset();
  });

  it('renders the profile overview, requests, and enrollment form', () => {
    mocks.query.data = {
      items: [
        {
          id: 'order-1',
          reference: 'ATE-2026-TEST',
          specializationLabel: 'Medicine',
          status: 'NEW',
          submittedAt: '2026-08-20T00:00:00.000Z',
          statusHistory: [],
        },
      ],
      total: 1,
      page: 1,
      pageSize: 50,
    };

    render(
      <MemoryRouter>
        <LanguageProvider>
          <AccountPage />
        </LanguageProvider>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /Welcome back, Client Name/ })).toBeInTheDocument();
    expect(screen.getByText('client@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email verified')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Start your admission request' }),
    ).toBeInTheDocument();
    expect(screen.getByText('ATE-2026-TEST')).toBeInTheDocument();
  });
});
