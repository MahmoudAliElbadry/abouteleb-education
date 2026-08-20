import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { EnrollmentSection } from './EnrollmentSection.js';

vi.mock('../auth/useAuth.js', () => ({
  useAuth: () => ({ user: null, isPending: false }),
}));

describe('EnrollmentSection', () => {
  it('locks the form for signed-out visitors and offers sign in', () => {
    render(
      <MemoryRouter>
        <EnrollmentSection language="en" />
      </MemoryRouter>,
    );

    expect(
      screen.getByText('The form is available to signed-in clients only.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign in to unlock the form' })).toHaveAttribute(
      'href',
      '/login?redirect=%2F%23enroll',
    );
    expect(screen.getByRole('group')).toBeDisabled();
  });
});
