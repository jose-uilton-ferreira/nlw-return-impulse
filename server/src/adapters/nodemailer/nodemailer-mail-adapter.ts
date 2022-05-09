import nodemailer from 'nodemailer';
import { MailAdapter, MailAdapterData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "697fe1e485d538",
    pass: "23e5c70301f85d"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendEmail({ subject, body }: MailAdapterData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'José Uilton <programasuilton@gmail.com>',
      subject,
      html: body,
    });
  }
}