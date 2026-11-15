import { env } from "../config/env";
import type { MailMessage } from "./mailer";

const layout = (title: string, body: string) => `
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;background:#f6f3ec;padding:32px 16px;font-family:Manrope,Arial,sans-serif;color:#24251f">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto">
      <tr>
        <td style="padding:0 0 20px">
          <div style="font-size:20px;font-weight:800;letter-spacing:-0.03em">Списком</div>
        </td>
      </tr>
      <tr>
        <td style="background:#ffffff;border:1px solid #e5e0d5;border-radius:20px;padding:32px">
          <h1 style="margin:0 0 16px;font-size:26px;line-height:1.2;letter-spacing:-0.03em">${title}</h1>
          ${body}
        </td>
      </tr>
      <tr>
        <td style="padding:20px 4px 0;color:#77786f;font-size:12px;line-height:1.6">
          Это письмо отправлено автоматически. Если вы не запрашивали его, просто проигнорируйте.
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const welcomeEmail = (email: string): MailMessage => ({
  to: email,
  subject: "Добро пожаловать в Списком",
  text: `Здравствуйте! Ваш аккаунт в Списком создан. Откройте приложение: ${env.APP_URL}`,
  html: layout(
    "Добро пожаловать",
    `<p style="margin:0 0 18px;color:#5f6157;line-height:1.7">Аккаунт создан. Теперь можно собрать все дела в одном спокойном списке.</p>
     <a href="${env.APP_URL}" style="display:inline-block;background:#2f5d4a;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:12px;font-weight:700">Открыть Списком</a>`,
  ),
});

export const resetPasswordEmail = (email: string, link: string): MailMessage => ({
  to: email,
  subject: "Сброс пароля в Списком",
  text: `Чтобы задать новый пароль, перейдите по ссылке: ${link}. Ссылка действует один час.`,
  html: layout(
    "Сброс пароля",
    `<p style="margin:0 0 18px;color:#5f6157;line-height:1.7">Вы запросили новый пароль. Ссылка действует один час и может быть использована один раз.</p>
     <a href="${link}" style="display:inline-block;background:#2f5d4a;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:12px;font-weight:700">Задать новый пароль</a>
     <p style="margin:20px 0 0;color:#8a8b81;font-size:13px;line-height:1.6">Если вы не запрашивали сброс, ничего делать не нужно.</p>`,
  ),
});
