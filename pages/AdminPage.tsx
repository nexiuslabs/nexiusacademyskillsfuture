import React, { useEffect, useMemo, useState } from 'react';
import { ExternalLink, LockKeyhole, LogOut, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';

type SessionState =
  | { status: 'loading' }
  | { status: 'authenticated'; username: string }
  | { status: 'unauthenticated' };

type LeadCaptureRow = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: string | null;
  company_name: string | null;
  department_or_designation: string | null;
  lead_flow: string | null;
  age_band: string | null;
  preferred_intake: string | null;
  cohort_code: string | null;
  course_slug: string | null;
  intent: string | null;
  source_tag: string | null;
  page_path: string | null;
};

const sessionEndpoint = '/.netlify/functions/admin-session';
const loginEndpoint = '/.netlify/functions/admin-login';
const logoutEndpoint = '/.netlify/functions/admin-logout';

const AdminPage: React.FC = () => {
  const [session, setSession] = useState<SessionState>({ status: 'loading' });
  const [username, setUsername] = useState('hello@nexiuslabs.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leads, setLeads] = useState<LeadCaptureRow[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadsError, setLeadsError] = useState<string | null>(null);

  const shortcuts = useMemo(
    () => [
      { label: 'Agentic AI Course', href: '/courses/agentic-ai' },
      { label: 'Accountants Course', href: '/courses/agentic-ai-accountants' },
      { label: 'Supabase Dashboard', href: 'https://supabase.com/dashboard/project/mjqucyoobkwvzcrordfg' },
      { label: 'Netlify Deploys', href: 'https://app.netlify.com/projects/nexiusacademysfc/deploys' },
    ],
    []
  );

  const loadSession = async () => {
    try {
      const response = await fetch(sessionEndpoint, {
        credentials: 'include',
        cache: 'no-store',
      });

      if (!response.ok) {
        setSession({ status: 'unauthenticated' });
        return;
      }

      const data = await response.json();
      setSession({ status: 'authenticated', username: data.username });
    } catch (_error) {
      setSession({ status: 'unauthenticated' });
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  useEffect(() => {
    const loadLeads = async () => {
      if (session.status !== 'authenticated') return;

      setLeadsLoading(true);
      setLeadsError(null);

      const { data, error } = await supabase
        .from('lead_captures')
        .select(
          'id, created_at, full_name, email, phone, role, company_name, department_or_designation, lead_flow, age_band, preferred_intake, cohort_code, course_slug, intent, source_tag, page_path'
        )
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        setLeadsError(error.message);
        setLeadsLoading(false);
        return;
      }

      setLeads((data || []) as LeadCaptureRow[]);
      setLeadsLoading(false);
    };

    loadLeads();
  }, [session]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(loginEndpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError('Incorrect user ID or password.');
        return;
      }

      setPassword('');
      await loadSession();
    } catch (_error) {
      setError('Admin login is unavailable in this environment. Deploy to Netlify to use the secure login flow.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onLogout = async () => {
    await fetch(logoutEndpoint, {
      method: 'POST',
      credentials: 'include',
    });

    setSession({ status: 'unauthenticated' });
  };

  return (
    <>
      <SEO
        title="Admin | Nexius Academy"
        description="Secure admin access for Nexius Academy operations."
        canonical="/admin"
      />

      <div className="min-h-screen bg-[linear-gradient(180deg,#f7fafc_0%,#eef3fb_100%)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-xl font-bold text-accent">N</div>
              <span className="font-heading text-xl font-bold text-primary">
                Nexius<span className="text-accent">Academy</span>
              </span>
            </Link>
            {session.status === 'authenticated' && (
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                <LogOut size={16} />
                Log Out
              </button>
            )}
          </div>

          <div className="grid gap-8 lg:grid-cols-[420px,1fr]">
            <section className="rounded-[2rem] border border-white/70 bg-white p-8 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-bold text-accent">
                <ShieldCheck size={16} />
                Admin Access
              </div>
              <h1 className="mb-3 text-4xl font-heading font-bold text-primary">Academy Admin</h1>
              <p className="mb-8 text-gray-600">
                Secure access for internal operations, deployment shortcuts, and course administration.
              </p>

              {session.status === 'loading' ? (
                <div className="rounded-2xl border border-gray-100 bg-neutral p-5 text-sm text-gray-600">
                  Checking active session...
                </div>
              ) : session.status === 'authenticated' ? (
                <div className="rounded-2xl border border-teal-100 bg-teal-50 p-5 text-sm text-primary">
                  Signed in as <strong>{session.username}</strong>.
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <label className="block text-sm font-semibold text-primary">
                    User ID
                    <input
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-gray-900 outline-none transition-colors focus:border-primary"
                      autoComplete="username"
                    />
                  </label>
                  <label className="block text-sm font-semibold text-primary">
                    Password
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-gray-900 outline-none transition-colors focus:border-primary"
                      autoComplete="current-password"
                    />
                  </label>

                  {error && <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-bold text-white transition-colors hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <LockKeyhole size={18} />
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                  </button>
                </form>
              )}
            </section>

            <section className="rounded-[2rem] border border-white/70 bg-white p-8 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
              <div className="mb-8">
                <div className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-accent">Operations</div>
                <h2 className="mb-2 text-3xl font-heading font-bold text-primary">Quick Access</h2>
                <p className="text-gray-600">
                  Central entry point for managing the academy site and jumping into the related infrastructure.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {shortcuts.map((shortcut) => {
                  const isExternal = shortcut.href.startsWith('http');
                  const body = (
                    <>
                      <span className="font-bold text-primary">{shortcut.label}</span>
                      <span className="text-sm text-gray-500">{shortcut.href.replace('https://', '')}</span>
                    </>
                  );

                  return isExternal ? (
                    <a
                      key={shortcut.label}
                      href={shortcut.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[116px] flex-col justify-between rounded-2xl border border-gray-200 bg-neutral p-5 transition-colors hover:border-primary/30 hover:bg-white"
                    >
                      {body}
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                        Open
                        <ExternalLink size={15} />
                      </span>
                    </a>
                  ) : (
                    <Link
                      key={shortcut.label}
                      to={shortcut.href}
                      className="flex min-h-[116px] flex-col justify-between rounded-2xl border border-gray-200 bg-neutral p-5 transition-colors hover:border-primary/30 hover:bg-white"
                    >
                      {body}
                      <span className="mt-4 text-sm font-semibold text-accent">Open</span>
                    </Link>
                  );
                })}
              </div>

              {session.status === 'authenticated' && (
                <div className="mt-10">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-accent">Lead Capture</div>
                      <h3 className="text-2xl font-heading font-bold text-primary">lead_captures</h3>
                    </div>
                    <div className="rounded-full bg-neutral px-4 py-2 text-sm font-semibold text-gray-600">
                      {leads.length} rows
                    </div>
                  </div>

                  {leadsLoading ? (
                    <div className="rounded-2xl border border-gray-200 bg-neutral p-5 text-sm text-gray-600">
                      Loading lead captures...
                    </div>
                  ) : leadsError ? (
                    <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-700">{leadsError}</div>
                  ) : leads.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-neutral p-5 text-sm text-gray-600">
                      No rows returned from <code>lead_captures</code>.
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-2xl border border-gray-200">
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white text-sm">
                          <thead className="bg-neutral text-left text-xs uppercase tracking-wide text-gray-500">
                            <tr>
                              <th className="px-4 py-3 font-semibold">Created</th>
                              <th className="px-4 py-3 font-semibold">Name</th>
                              <th className="px-4 py-3 font-semibold">Email</th>
                              <th className="px-4 py-3 font-semibold">Company</th>
                              <th className="px-4 py-3 font-semibold">Flow</th>
                              <th className="px-4 py-3 font-semibold">Course</th>
                              <th className="px-4 py-3 font-semibold">Intake</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leads.map((lead) => (
                              <tr key={lead.id} className="border-t border-gray-100 align-top">
                                <td className="px-4 py-3 text-gray-600">
                                  {lead.created_at ? new Date(lead.created_at).toLocaleString() : '-'}
                                </td>
                                <td className="px-4 py-3">
                                  <div className="font-semibold text-primary">{lead.full_name || '-'}</div>
                                  <div className="text-xs text-gray-500">{lead.role || lead.department_or_designation || '-'}</div>
                                </td>
                                <td className="px-4 py-3 text-gray-700">
                                  <div>{lead.email || '-'}</div>
                                  <div className="text-xs text-gray-500">{lead.phone || '-'}</div>
                                </td>
                                <td className="px-4 py-3 text-gray-700">{lead.company_name || '-'}</td>
                                <td className="px-4 py-3">
                                  <div className="font-medium text-primary">{lead.lead_flow || '-'}</div>
                                  <div className="text-xs text-gray-500">{lead.intent || '-'}</div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="font-medium text-gray-800">{lead.course_slug || '-'}</div>
                                  <div className="text-xs text-gray-500">{lead.source_tag || '-'}</div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="text-gray-700">{lead.preferred_intake || '-'}</div>
                                  <div className="text-xs text-gray-500">{lead.cohort_code || '-'}</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
