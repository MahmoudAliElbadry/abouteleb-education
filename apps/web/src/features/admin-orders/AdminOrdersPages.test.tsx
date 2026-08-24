import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AdminOrdersPage } from './AdminOrdersPages.js';
import { ApiError } from '../auth/auth-client.js';
import { LanguageProvider } from '../i18n/LanguageContext.js';

const mocks = vi.hoisted(() => ({
  metrics: {
    data: {
      total: 1,
      counts: {
        NEW: 1,
        CONTACTED: 0,
        WAITING_FOR_CLIENT: 0,
        IN_PROGRESS: 0,
        COMPLETED: 0,
        REJECTED: 0,
        CANCELLED: 0,
      },
    },
  },
  orders: {
    isPending: false,
    error: null as unknown,
    data: { items: [], total: 0, page: 1, pageSize: 20 },
    refetch: vi.fn(),
  },
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: ({ queryKey }: { queryKey: string[] }) =>
    queryKey[1] === 'metrics' ? mocks.metrics : mocks.orders,
}));

describe('AdminOrdersPage', () => {
  afterEach(() => {
    cleanup();
    mocks.orders = {
      isPending: false,
      error: null,
      data: { items: [], total: 0, page: 1, pageSize: 20 },
      refetch: vi.fn(),
    };
  });

  it('binds approved filters and renders a no-results state', () => {
    render(
      <LanguageProvider>
        <MemoryRouter>
          <AdminOrdersPage />
        </MemoryRouter>
      </LanguageProvider>,
    );

    fireEvent.change(screen.getByRole('combobox', { name: 'Specialization' }), {
      target: { value: 'medicine' },
    });
    expect(screen.getByRole('combobox', { name: 'Specialization' })).toHaveValue('medicine');
    expect(screen.getByText('No orders found.')).toBeInTheDocument();
  });

  it('renders a retryable permission error', () => {
    mocks.orders.error = new ApiError('FORBIDDEN', 403, 'Forbidden');
    render(
      <LanguageProvider>
        <MemoryRouter>
          <AdminOrdersPage />
        </MemoryRouter>
      </LanguageProvider>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      'You do not have permission to view this data.',
    );
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(mocks.orders.refetch).toHaveBeenCalledOnce();
  });
});
