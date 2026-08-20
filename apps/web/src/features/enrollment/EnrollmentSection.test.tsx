import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { EnrollmentSection } from './EnrollmentSection.js';

const mocks = vi.hoisted(() => ({
  createOrder: vi.fn(),
  session: { user: null as null | { email: string; emailVerified: boolean; fullName: string }, isPending: false },
}));

vi.mock('../auth/useAuth.js', () => ({
  useAuth: () => mocks.session,
}));

vi.mock('../auth/auth-client.js', () => ({
  createOrder: mocks.createOrder,
}));

function renderEnrollment() {
  render(
    <MemoryRouter>
      <EnrollmentSection language="en" />
    </MemoryRouter>,
  );
}

describe('EnrollmentSection', () => {
  afterEach(() => {
    cleanup();
    mocks.createOrder.mockReset();
    mocks.session = { user: null, isPending: false };
  });

  it('locks the form for signed-out visitors and offers sign in', () => {
    renderEnrollment();

    expect(
      screen.getByText('The form is available to signed-in clients only.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign in to unlock the form' })).toHaveAttribute(
      'href',
      '/login?redirect=%2Fapplications',
    );
    expect(screen.getByRole('group')).toBeDisabled();
  });

  it('keeps the form locked for an unverified client', () => {
    mocks.session = {
      user: { email: 'client@example.com', emailVerified: false, fullName: 'Client' },
      isPending: false,
    };
    renderEnrollment();

    expect(screen.getByText('Verify your email before submitting')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Verify email' })).toHaveAttribute(
      'href',
      '/verify-email?email=client%40example.com',
    );
    expect(screen.getByRole('group')).toBeDisabled();
  });

  it('requires enrollment consent before a verified client can submit', async () => {
    mocks.session = {
      user: { email: 'client@example.com', emailVerified: true, fullName: 'Client Name' },
      isPending: false,
    };
    mocks.createOrder.mockResolvedValue({ order: { reference: 'AB-123' } });
    renderEnrollment();

    const submit = screen.getByRole('button', { name: 'Submit request' });
    expect(submit).toBeDisabled();
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.change(screen.getByLabelText('Phone number'), { target: { value: '+905015959880' } });
    fireEvent.click(submit);

    await waitFor(() =>
      expect(mocks.createOrder).toHaveBeenCalledWith({
        fullName: 'Client Name',
        phoneNumber: '+905015959880',
        specialization: 'medicine',
      }),
    );
    expect(screen.getByRole('status')).toHaveTextContent('AB-123');
  });
});
