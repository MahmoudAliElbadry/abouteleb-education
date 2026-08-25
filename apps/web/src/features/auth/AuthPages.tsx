import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ApiError } from './auth-client.js';
import { authCopy, type AuthLanguage } from './auth-copy.js';
import { useAuth } from './useAuth.js';
import { useLanguage } from '../i18n/LanguageContext.js';

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

function errorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}

function AuthShell({
  language,
  setLanguage,
  title,
  children,
}: {
  language: AuthLanguage;
  setLanguage: (language: AuthLanguage) => void;
  title: string;
  children: React.ReactNode;
}) {
  const t = authCopy[language];
  return (
    <main
      className="account-page auth-page"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      lang={language}
    >
      <div className="auth-toolbar">
        <Link to="/" className="brand brand-dark">
          <img src={publicAsset('images/logo.png')} alt="" />
          <span>
            Abou-Taleb <strong>Education</strong>
          </span>
        </Link>
        <select
          aria-label="Language"
          value={language}
          onChange={(event) => setLanguage(event.target.value as AuthLanguage)}
        >
          <option value="ar">العربية</option>
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
        </select>
      </div>
      <section className="auth-card">
        <h1>{title}</h1>
        {children}
        <Link to="/" className="auth-back">
          {t.back}
        </Link>
      </section>
    </main>
  );
}

function useAuthLanguage() {
  const [searchParams] = useSearchParams();
  const { language, setLanguage } = useLanguage();
  const queryLang = searchParams.get('lang');

  useEffect(() => {
    if (queryLang === 'ar' || queryLang === 'en' || queryLang === 'tr') {
      setLanguage(queryLang);
    }
  }, [queryLang, setLanguage]);

  return [language, setLanguage] as const;
}

function AuthError({ error, fallback }: { error: unknown; fallback: string }) {
  return error ? (
    <p className="form-error" role="alert">
      {errorMessage(error, fallback)}
    </p>
  ) : null;
}

export function LoginPage() {
  const [language, setLanguage] = useAuthLanguage();
  const t = authCopy[language];
  const auth = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState(params.get('email') ?? '');
  const [password, setPassword] = useState('');
  const redirectParam = params.get('redirect');
  async function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const { user } = await auth.login.mutateAsync({ email, password });
      const fallback = user.role === 'ADMIN' ? '/admin' : '/';
      navigate(redirectParam ?? fallback);
    } catch {
      /* rendered below */
    }
  }
  return (
    <AuthShell language={language} setLanguage={setLanguage} title={t.loginTitle}>
      <form onSubmit={submit} className="auth-form">
        <label>
          {t.email}
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />
        </label>
        <label>
          {t.password}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
          />
        </label>
        <AuthError error={auth.login.error} fallback={t.error} />
        <button className="button" type="submit" disabled={auth.login.isPending}>
          {t.signIn}
        </button>
      </form>
      <p className="auth-links">
        <Link to="/forgot-password">{t.forgot}</Link> · {t.noAccount}{' '}
        <Link to="/register">{t.signUp}</Link>
      </p>
    </AuthShell>
  );
}

export function RegisterPage() {
  const [language, setLanguage] = useAuthLanguage();
  const t = authCopy[language];
  const auth = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    consentAccepted: false,
  });
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!form.consentAccepted) return;
    try {
      await auth.register.mutateAsync(form);
      navigate(`/verify-email?email=${encodeURIComponent(form.email)}`);
    } catch {
      /* rendered below */
    }
  }
  return (
    <AuthShell language={language} setLanguage={setLanguage} title={t.registerTitle}>
      <form onSubmit={submit} className="auth-form">
        <label>
          {t.fullName}
          <input
            value={form.fullName}
            onChange={(event) => setForm({ ...form, fullName: event.target.value })}
            required
            autoComplete="name"
          />
        </label>
        <label>
          {t.email}
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            required
            autoComplete="email"
          />
        </label>
        <label>
          {t.password}
          <input
            type="password"
            minLength={8}
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            required
            autoComplete="new-password"
          />
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={form.consentAccepted}
            onChange={(event) => setForm({ ...form, consentAccepted: event.target.checked })}
            required
          />
          {t.consent}
        </label>
        {!form.consentAccepted && <p className="form-error">{t.consentRequired}</p>}
        <AuthError error={auth.register.error} fallback={t.error} />
        <button
          className="button"
          type="submit"
          disabled={auth.register.isPending || !form.consentAccepted}
        >
          {t.signUp}
        </button>
      </form>
      <p className="auth-links">
        {t.haveAccount} <Link to="/login">{t.signIn}</Link>
      </p>
    </AuthShell>
  );
}

export function VerifyEmailPage() {
  const [language, setLanguage] = useAuthLanguage();
  const t = authCopy[language];
  const auth = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState(params.get('email') ?? '');
  const [code, setCode] = useState('');
  async function submit(event: FormEvent) {
    event.preventDefault();
    try {
      await auth.verifyEmail.mutateAsync({ email, code });
      navigate(`/login?email=${encodeURIComponent(email)}`);
    } catch {
      /* rendered below */
    }
  }
  return (
    <AuthShell language={language} setLanguage={setLanguage} title={t.verifyTitle}>
      <p>{t.verifyDescription}</p>
      <form onSubmit={submit} className="auth-form">
        <label>
          {t.email}
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          {t.code}
          <input
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            required
          />
        </label>
        <AuthError error={auth.verifyEmail.error} fallback={t.error} />
        <button className="button" type="submit" disabled={auth.verifyEmail.isPending}>
          {t.submit}
        </button>
      </form>
      <button
        className="text-button"
        type="button"
        onClick={() => auth.resendVerification.mutate(email)}
        disabled={auth.resendVerification.isPending}
      >
        {t.resend}
      </button>
    </AuthShell>
  );
}

export function ForgotPasswordPage() {
  const [language, setLanguage] = useAuthLanguage();
  const t = authCopy[language];
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  async function submit(event: FormEvent) {
    event.preventDefault();
    try {
      await auth.forgotPassword.mutateAsync(email);
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch {
      /* rendered below */
    }
  }
  return (
    <AuthShell language={language} setLanguage={setLanguage} title={t.forgotTitle}>
      <form onSubmit={submit} className="auth-form">
        <label>
          {t.email}
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <AuthError error={auth.forgotPassword.error} fallback={t.error} />
        <button className="button" type="submit" disabled={auth.forgotPassword.isPending}>
          {t.submit}
        </button>
      </form>
    </AuthShell>
  );
}

export function ResetPasswordPage() {
  const [language, setLanguage] = useAuthLanguage();
  const t = authCopy[language];
  const auth = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [form, setForm] = useState({ email: params.get('email') ?? '', code: '', newPassword: '' });
  async function submit(event: FormEvent) {
    event.preventDefault();
    try {
      await auth.resetPassword.mutateAsync(form);
      navigate('/login');
    } catch {
      /* rendered below */
    }
  }
  return (
    <AuthShell language={language} setLanguage={setLanguage} title={t.resetTitle}>
      <form onSubmit={submit} className="auth-form">
        <label>
          {t.email}
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            required
          />
        </label>
        <label>
          {t.code}
          <input
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            value={form.code}
            onChange={(event) => setForm({ ...form, code: event.target.value })}
            required
          />
        </label>
        <label>
          {t.newPassword}
          <input
            type="password"
            minLength={8}
            value={form.newPassword}
            onChange={(event) => setForm({ ...form, newPassword: event.target.value })}
            required
            autoComplete="new-password"
          />
        </label>
        <AuthError error={auth.resetPassword.error} fallback={t.error} />
        <button className="button" type="submit" disabled={auth.resetPassword.isPending}>
          {t.submit}
        </button>
      </form>
    </AuthShell>
  );
}
