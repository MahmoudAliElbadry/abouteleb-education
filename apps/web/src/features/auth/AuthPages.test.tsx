import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ApiError } from './auth-client.js';
import { LoginPage } from './AuthPages.js';
import { LanguageProvider } from '../i18n/LanguageContext.js';

const authState = vi.hoisted(() => ({ current: {} as ReturnTypeShape }));

type MutationShape = {
  error: Error | null;
  isPending: boolean;
  mutateAsync: ReturnType<typeof vi.fn>;
};

type ReturnTypeShape = {
  login: MutationShape;
  resendVerification: MutationShape;
};

vi.mock('./useAuth.js', () => ({ useAuth: () => authState.current }));

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{`${location.pathname}${location.search}`}</div>;
}

describe('LoginPage', () => {
  afterEach(() => cleanup());

  it('sends a fresh OTP and opens verification after an unverified-account login error', async () => {
    const resendVerification = vi.fn().mockResolvedValue({ message: 'sent' });
    authState.current = {
      login: {
        error: new ApiError('EMAIL_NOT_VERIFIED', 403, 'Verify your email before signing in'),
        isPending: false,
        mutateAsync: vi.fn(),
      },
      resendVerification: {
        error: null,
        isPending: false,
        mutateAsync: resendVerification,
      },
    };

    render(
      <LanguageProvider>
        <MemoryRouter initialEntries={['/login?email=student%40example.com']}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify-email" element={<LocationProbe />} />
          </Routes>
        </MemoryRouter>
      </LanguageProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Verify your account' }));

    await waitFor(() => expect(resendVerification).toHaveBeenCalledWith('student@example.com'));
    expect(screen.getByTestId('location')).toHaveTextContent(
      '/verify-email?email=student%40example.com&lang=en',
    );
  });
});
