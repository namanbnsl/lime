import { render } from '@react-email/render';
import { SendVerificationRequestParams } from 'next-auth/providers';
import { createTransport } from 'nodemailer';
import { Email } from './email';

export async function sendVerificationRequest(
  params: SendVerificationRequestParams
) {
  const { identifier, url, provider } = params;
  const { host } = new URL(url);

  const transport = createTransport(provider.server);

  const emailHtml = render(<Email validationLink={url} />);

  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: emailHtml
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
  }
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
