import nodemailer from "nodemailer";

import { env } from "../config/env";

export interface MailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
}

const sendWithResend = async (message: MailMessage) => {
  if (!env.RESEND_API_KEY) {
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: [message.to],
      subject: message.subject,
      html: message.html,
      text: message.text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend ответил статусом ${response.status}`);
  }

  return true;
};

const sendWithSmtp = async (message: MailMessage) => {
  if (!env.SMTP_HOST) {
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth:
      env.SMTP_USER && env.SMTP_PASSWORD
        ? {
            user: env.SMTP_USER,
            pass: env.SMTP_PASSWORD,
          }
        : undefined,
  });

  await transporter.sendMail({
    from: env.MAIL_FROM,
    to: message.to,
    subject: message.subject,
    html: message.html,
    text: message.text,
  });

  return true;
};

export const sendMail = async (message: MailMessage) => {
  if (await sendWithResend(message)) {
    return;
  }

  if (await sendWithSmtp(message)) {
    return;
  }

  console.info(`Письмо для ${message.to}: ${message.subject}`);
  console.info(message.text);
};
