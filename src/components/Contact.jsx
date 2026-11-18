import { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  Link as LinkIcon,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  User,
  AtSign,
  MessageSquare,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { contact } from '../data/portfolio';

const detailIcons = { mail: Mail, github: Github, linkedin: Linkedin, link: LinkIcon };

const initialState = { name: '', email: '', subject: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your full name.';
  else if (values.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';

  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address (e.g. name@example.com).';

  if (!values.subject.trim()) errors.subject = 'Please enter a subject.';

  if (!values.message.trim()) errors.message = 'Please write your message.';
  else if (values.message.trim().length < 10)
    errors.message = 'Message should be at least 10 characters.';

  return errors;
}

function Field({ id, label, icon: Icon, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-content-primary"
      >
        <Icon className="h-3.5 w-3.5 text-content-secondary" aria-hidden="true" />
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClasses = (hasError) =>
  `w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-content-primary placeholder:text-content-secondary/80 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
    hasError
      ? 'border-rose-500/60 focus:border-rose-400 focus:ring-rose-500/30'
      : 'border-white/10 focus:border-accent-primary/60 focus:ring-accent-primary/25'
  }`;

export default function Contact() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | demo | error
  const [serverError, setServerError] = useState('');
  const formRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Accept either a bare Formspree form ID ("xrgvwkqb") or a full endpoint URL.
  const endpoint = contact.formId
    ? `https://formspree.io/f/${contact.formId.trim()}`
    : (contact.formEndpoint || '').trim();
  const isConfigured = Boolean(endpoint);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    // Clear the field's error as soon as the user edits it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validate(values);
    const hasErrors = Object.values(validationErrors).some(Boolean);

    if (hasErrors) {
      setErrors(validationErrors);
      setStatus('idle');
      // Move focus to the first invalid field for keyboard users
      const firstInvalid = Object.keys(validationErrors).find((k) => validationErrors[k]);
      const el = formRef.current?.querySelector(`#${firstInvalid}`);
      el?.focus();
      return;
    }

    setErrors({});

    // No backend configured → be honest instead of faking success
    if (!isConfigured) {
      setStatus('demo');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

      setStatus('success');
      setValues(initialState);
    } catch (err) {
      setStatus('error');
      setServerError(
        'Something went wrong while sending your message. Please try again or email me directly.'
      );
      console.error('Contact form error:', err);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-bg-secondary/60 py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-accent-primary/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="section-container relative">
        <SectionHeading id="contact" heading={contact.heading} subtitle={contact.description} />

        <div className="mt-14 grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* LEFT — contact details */}
          <Reveal className="lg:col-span-2">
            <div className="glass-card h-full p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-content-primary">Get in touch</h3>
              <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                Feel to reach out directly through any of these channels — I usually reply as soon
                as I can.
              </p>

              <ul className="mt-6 space-y-3" role="list">
                {contact.details.map(({ id, label, value, href, icon }) => {
                  const Icon = detailIcons[icon] || LinkIcon;
                  const isPlaceholder = href === '#';
                  const Wrapper = isPlaceholder ? 'div' : 'a';
                  const wrapperProps = isPlaceholder
                    ? {}
                    : {
                        href,
                        target: href.startsWith('mailto:') ? undefined : '_blank',
                        rel: 'noopener noreferrer',
                      };

                  return (
                    <li key={id}>
                      <Wrapper
                        {...wrapperProps}
                        className={`group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 ${
                          isPlaceholder
                            ? 'cursor-default'
                            : 'hover:-translate-y-0.5 hover:border-accent-primary/40 hover:bg-accent-primary/5'
                        }`}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-accent-primary transition-colors group-hover:bg-accent-primary/10">
                          <Icon className="h-4.5 w-4.5 h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs font-medium uppercase tracking-wider text-content-secondary">
                            {label}
                          </span>
                          <span className="block truncate text-sm font-medium text-content-primary">
                            {value}
                          </span>
                        </span>
                      </Wrapper>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          {/* RIGHT — form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="glass-card p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-content-primary">Send a message</h3>

              <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Full Name" icon={User} error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={values.name}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={inputClasses(Boolean(errors.name))}
                    />
                  </Field>

                  <Field id="email" label="Email Address" icon={AtSign} error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                      value={values.email}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={inputClasses(Boolean(errors.email))}
                    />
                  </Field>
                </div>

                <Field id="subject" label="Subject" icon={MessageSquare} error={errors.subject}>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What would you like to discuss?"
                    value={values.subject}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    className={inputClasses(Boolean(errors.subject))}
                  />
                </Field>

                <Field id="message" label="Message" icon={Mail} error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project, opportunity or idea..."
                    value={values.message}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`${inputClasses(Boolean(errors.message))} resize-y`}
                  />
                </Field>

                {/* Status messages */}
                {status === 'success' && (
                  <motion.p
                    role="status"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {contact.formSuccessMessage}
                  </motion.p>
                )}

                {status === 'demo' && (
                  <motion.p
                    role="status"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {contact.formDemoMessage}
                  </motion.p>
                )}

                {status === 'error' && serverError && (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-300"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {serverError}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>

                {!isConfigured && (
                  <p className="text-xs leading-relaxed text-content-secondary">
                    Note: this form validates your input but does not send yet. Paste your
                    Formspree form ID into{' '}
                    <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-accent-primary">
                      contact.formId
                    </code>{' '}
                    in{' '}
                    <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-accent-primary">
                      src/data/portfolio.js
                    </code>{' '}
                    to enable real submissions.
                  </p>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
