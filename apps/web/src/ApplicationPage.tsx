import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '';
type User = { id: string; email: string; emailVerified: boolean; fullName: string | null };
type Order = {
  id: string;
  reference: string;
  specializationLabel: string;
  status: string;
  submittedAt: string;
};

function csrfToken() {
  return (
    document.cookie
      .split('; ')
      .find((value) => value.startsWith('abou_csrf='))
      ?.split('=')[1] ?? ''
  );
}

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}/api/v1${path}`, {
    credentials: 'include',
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options?.headers ?? {}) },
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: { message?: string };
    } | null;
    throw new Error(body?.error?.message ?? 'Something went wrong. Please try again.');
  }
  return response.status === 204 ? (undefined as T) : (response.json() as Promise<T>);
}

export function ApplicationPage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [form, setForm] = useState({ fullName: '', phoneNumber: '', specialization: 'medicine' });

  const loadOrders = async () => {
    const response = await api<{ orders: Order[] }>('/orders');
    setOrders(response.orders);
  };
  useEffect(() => {
    api<{ user: User }>('/auth/session')
      .then(async ({ user: sessionUser }) => {
        setUser(sessionUser);
        await loadOrders();
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  const signIn = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      const response = await api<{ user: User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setUser(response.user);
      await loadOrders();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to sign in');
    }
  };
  const submitOrder = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      await api('/orders', {
        method: 'POST',
        headers: { 'X-CSRF-Token': csrfToken() },
        body: JSON.stringify(form),
      });
      await loadOrders();
      setForm({ fullName: '', phoneNumber: '', specialization: 'medicine' });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to submit your request');
    }
  };

  if (loading)
    return (
      <main className="account-page">
        <p>Loading your application requests…</p>
      </main>
    );
  if (!user)
    return (
      <main className="account-page">
        <Link to="/">← Back home</Link>
        <h1>Sign in to continue</h1>
        <p>Application requests are available only to verified client accounts.</p>
        <form onSubmit={signIn}>
          <label>
            Email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
            />
          </label>
          <label>
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
            />
          </label>
          {error && <p role="alert">{error}</p>}
          <button className="button" type="submit">
            Sign in
          </button>
        </form>
      </main>
    );
  return (
    <main className="account-page">
      <Link to="/">← Back home</Link>
      <h1>Application Requests</h1>
      <p>Signed in as {user.email}</p>
      {!user.emailVerified ? (
        <p role="alert">Verify your email before creating an application request.</p>
      ) : (
        <form onSubmit={submitOrder}>
          <label>
            Full name
            <input
              value={form.fullName}
              onChange={(event) => setForm({ ...form, fullName: event.target.value })}
              required
            />
          </label>
          <label>
            Phone number
            <input
              value={form.phoneNumber}
              onChange={(event) => setForm({ ...form, phoneNumber: event.target.value })}
              required
            />
          </label>
          <label>
            Specialization
            <select
              value={form.specialization}
              onChange={(event) => setForm({ ...form, specialization: event.target.value })}
            >
              <option value="medicine">Medicine</option>
              <option value="dentistry">Dentistry</option>
              <option value="pharmacy">Pharmacy</option>
              <option value="engineering">Engineering</option>
              <option value="business">Business Administration</option>
            </select>
          </label>
          {error && <p role="alert">{error}</p>}
          <button className="button" type="submit">
            Submit application request
          </button>
        </form>
      )}
      <section>
        <h2>Your requests</h2>
        {orders.length ? (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <strong>{order.reference}</strong> — {order.specializationLabel}{' '}
                <span>{order.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No application requests yet.</p>
        )}
      </section>
    </main>
  );
}
