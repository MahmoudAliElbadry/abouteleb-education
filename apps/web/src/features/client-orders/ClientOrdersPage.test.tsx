import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { ClientOrdersPage } from './ClientOrdersPage.js';

const mocks = vi.hoisted(() => ({
  query: {
    isPending: false,
    isError: false,
    data: undefined as
      | undefined
      | {
          items: Array<{
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
          }>;
          total: number;
          page: number;
          pageSize: number;
        },
    error: null as unknown,
    refetch: vi.fn(),
  },
}));

vi.mock('@tanstack/react-query', () => ({ useQuery: () => mocks.query }));

describe('ClientOrdersPage', () => {
  afterEach(() => {
    cleanup();
    mocks.query = {
      isPending: false,
      isError: false,
      data: undefined,
      error: null,
      refetch: vi.fn(),
    };
  });

  it('renders an empty state', () => {
    mocks.query.data = { items: [], total: 0, page: 1, pageSize: 10 };
    render(<ClientOrdersPage />);

    expect(screen.getByText('You do not have any admission requests yet.')).toBeInTheDocument();
  });

  it('renders order status history for the signed-in client', () => {
    mocks.query.data = {
      items: [
        {
          id: 'order-1',
          reference: 'ATE-2026-TEST',
          specializationLabel: 'Medicine',
          status: 'IN_PROGRESS',
          submittedAt: '2026-08-20T00:00:00.000Z',
          statusHistory: [
            {
              fromStatus: 'NEW',
              toStatus: 'IN_PROGRESS',
              clientVisibleMessage: 'We are reviewing your documents.',
              createdAt: '2026-08-20T00:00:00.000Z',
            },
          ],
        },
      ],
      total: 1,
      page: 1,
      pageSize: 10,
    };
    render(<ClientOrdersPage />);

    expect(screen.getByRole('heading', { name: 'ATE-2026-TEST' })).toBeInTheDocument();
    expect(
      screen.getByText('We are reviewing your documents.', { exact: false }),
    ).toBeInTheDocument();
  });

  it('shows a retryable error state', () => {
    mocks.query.isError = true;
    mocks.query.error = new Error('Network unavailable');
    render(<ClientOrdersPage />);

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to load your requests.');
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(mocks.query.refetch).toHaveBeenCalledOnce();
  });
});
