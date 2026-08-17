import { Link, Route, Routes } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { healthResponseSchema } from '@abou/contracts';

async function fetchHealth() {
  const response = await fetch('/api/v1/health');
  if (!response.ok) throw new Error('API health check failed');
  return healthResponseSchema.parse(await response.json());
}

function HomePage() {
  const health = useQuery({ queryKey: ['health'], queryFn: fetchHealth });

  return (
    <main className="page-shell">
      <header className="site-header">
        <p className="eyebrow">Abou-Taleb Education</p>
        <h1>Your academic future in Türkiye starts here.</h1>
        <p className="intro">
          The new React and Express foundation is ready for the public website, client accounts, and
          admin operations.
        </p>
        <div className="actions">
          <Link className="button primary" to="/universities">
            Explore universities
          </Link>
          <Link className="button secondary" to="/login">
            Client sign in
          </Link>
        </div>
        <p className="health-status" role="status">
          API status:{' '}
          {health.isPending ? 'checking…' : health.isError ? 'unavailable' : health.data.service}
        </p>
      </header>
    </main>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="page-shell">
      <Link to="/">← Back home</Link>
      <h1>{title}</h1>
      <p>This route is reserved for the next implementation phase.</p>
    </main>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/universities" element={<PlaceholderPage title="Universities" />} />
      <Route path="/login" element={<PlaceholderPage title="Client sign in" />} />
      <Route path="*" element={<PlaceholderPage title="Page not found" />} />
    </Routes>
  );
}
