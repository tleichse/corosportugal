import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Runs on-demand (not statically prerendered) so it can call the Resend
// API at request time — see astro.config.mjs's Vercel adapter.
export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();

  const name = String(data.get('name') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const message = String(data.get('message') ?? '').trim();
  const consent = data.get('consent');
  const redirectTo = String(data.get('redirectTo') ?? '/contactos');
  // Honeypot: a hidden field real users never fill in; bots that
  // autofill every field will trip it. No visible CAPTCHA needed.
  const honeypot = String(data.get('company') ?? '').trim();

  if (honeypot) {
    // Silently pretend success to avoid tipping off the bot.
    return redirect(`${redirectTo}?sent=1`);
  }

  if (!name || !email || !message || !consent) {
    return redirect(`${redirectTo}?error=1`);
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const toEmail = import.meta.env.CONTACT_FORM_TO_EMAIL;

  if (!apiKey || !toEmail) {
    console.error(
      'Contact form submitted but RESEND_API_KEY / CONTACT_FORM_TO_EMAIL are not configured.'
    );
    return redirect(`${redirectTo}?error=1`);
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      // Must be a verified sending domain in Resend — see README.
      from: 'Coros Portugal <site@corosportugal.pt>',
      to: toEmail,
      replyTo: email,
      subject: `Novo contacto do site — ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
    });
  } catch (error) {
    console.error('Failed to send contact form email', error);
    return redirect(`${redirectTo}?error=1`);
  }

  return redirect(`${redirectTo}?sent=1`);
};
