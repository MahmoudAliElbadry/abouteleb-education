import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth.js';

export function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { user, isPending } = useAuth();
  if (isPending)
    return (
      <main className="account-page">
        <p>Loading…</p>
      </main>
    );
  if (!user) {
    const redirect = `${location.pathname}${location.search}`;
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirect)}`} replace />;
  }
  return children;
}

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, isPending } = useAuth();
  if (isPending)
    return (
      <main className="account-page">
        <p>Loading…</p>
      </main>
    );
  if (!user) return <Navigate to="/login?redirect=%2Fadmin%2Forders" replace />;
  if (user.role !== 'ADMIN') return <Navigate to="/" replace />;
  return children;
}
