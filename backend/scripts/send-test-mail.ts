import { env } from "../src/config/env";
import { sendMail } from "../src/lib/mailer";

const recipient = process.argv[2]?.trim();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!recipient || !emailPattern.test(recipient)) {
  console.error("Укажите email: npm run mail:test -- you@gmail.com");
  process.exit(1);
}

if (!env.RESEND_API_KEY && !env.SMTP_HOST) {
  console.error("Почта не настроена. Добавьте RESEND_API_KEY в backend/.env");
  process.exit(1);
}

const provider = env.RESEND_API_KEY ? "Resend" : "SMTP";

sendMail({
  to: recipient,
  subject: "Проверка почты Списком",
  text: "Почта работает. Это тестовое письмо из локального Списком.",
  html: `<div style="margin:0;background:#f6f3ec;padding:32px 16px;font-family:Arial,sans-serif;color:#24251f">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e5e0d5;border-radius:20px;padding:32px">
      <h1 style="margin:0 0 12px;font-size:24px">Почта работает</h1>
      <p style="margin:0;color:#5f6157;line-height:1.7">Это тестовое письмо из локального Списком. Можно возвращаться к задачам.</p>
    </div>
  </div>`,
})
  .then(() => {
    console.info(`${provider}: тестовое письмо отправлено на ${recipient}`);
  })
  .catch((error: unknown) => {
    console.error(`${provider}: не удалось отправить письмо`, error);
    process.exit(1);
  });
