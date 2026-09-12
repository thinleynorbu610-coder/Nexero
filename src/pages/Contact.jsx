import { useState } from 'react';
import { Github, Linkedin, Mail, CheckCircle2 } from 'lucide-react';
import Reveal from '../components/Reveal';
import TextReveal from '../components/TextReveal';
import Button from '../components/Button';
import PageGlow from '../components/PageGlow';
import './contact.css';

const initialForm = { name: '', email: '', subject: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Enter your name.';
  if (!values.email.trim()) {
    errors.email = 'Enter your email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.subject.trim()) errors.subject = 'Enter a subject.';
  if (!values.message.trim()) {
    errors.message = 'Enter a message.';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.';
  }
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) {
      setErrors((err) => ({ ...err, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setValues(initialForm);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero page-hero">
        <PageGlow />
        <div className="container">
          <Reveal>
            <p className="eyebrow">Contact</p>
          </Reveal>
          <TextReveal as="h1" className="h-display contact-hero__title" delay={0.08} inView={false}>
            {"Let’s Build Something Meaningful."}
          </TextReveal>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container contact-grid">
          <Reveal className="contact-info">
            <p className="body-lg contact-info__desc">
              Tell us a bit about what you&rsquo;re working on. We usually reply
              within one to two business days.
            </p>

            <div className="contact-info__block">
              <p className="label">Email</p>
              <a href="mailto:hello@nexora.example" className="link-underline">
                hello@nexora.example
              </a>
            </div>

            <div className="contact-info__block">
              <p className="label">Social</p>
              <div className="contact-info__social">
                <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="Nexora on GitHub">
                  <Github size={18} /> GitHub
                </a>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="Nexora on LinkedIn">
                  <Linkedin size={18} /> LinkedIn
                </a>
                <a href="mailto:hello@nexora.example" aria-label="Email Nexora">
                  <Mail size={18} /> Email
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="contact-form-wrap">
            {submitted ? (
                <div className="contact-success" role="status">
                  <CheckCircle2 size={40} />
                  <h3 className="h-md">Message sent.</h3>
                  <p className="body-md">
                    Thanks for reaching out — we&rsquo;ll get back to you shortly.
                  </p>
                  <Button as="button" variant="ghost" onClick={() => setSubmitted(false)} icon={false}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form
                  className="contact-form"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="contact-form__field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <span className="contact-form__error" id="name-error">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="contact-form__field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <span className="contact-form__error" id="email-error">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="contact-form__field">
                    <label htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={values.subject}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                    />
                    {errors.subject && (
                      <span className="contact-form__error" id="subject-error">
                        {errors.subject}
                      </span>
                    )}
                  </div>

                  <div className="contact-form__field">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={values.message}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <span className="contact-form__error" id="message-error">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <Button as="button" type="submit" variant="primary" icon={false} className="contact-form__submit">
                    Send Message
                  </Button>
                </form>
              )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
