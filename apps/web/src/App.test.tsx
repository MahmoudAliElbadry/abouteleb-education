import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App.js';

vi.mock('@tanstack/react-query', async () => {
  const actual =
    await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query');
  return {
    ...actual,
    useQuery: () => ({ isPending: false, isError: false, data: { service: 'api' } }),
  };
});

describe('App', () => {
  it('renders the foundation landing page', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Abou-Taleb Education' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /مستقبلك الدراسي/i })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(12);
    fireEvent.click(screen.getByRole('button', { name: 'عرض المزيد من الجامعات' }));
    expect(screen.getAllByRole('article')).toHaveLength(45);
  });
});
