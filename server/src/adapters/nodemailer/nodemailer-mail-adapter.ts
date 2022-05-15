import Email from 'email-templates';
import { MailAdapter, MailAdapterData } from "../mail-adapter";

const email = new Email({
  transport: {
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '697fe1e485d538',
      pass: '23e5c70301f85d'
    }
  },

  send: true,

  message: {
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'José Uilton <programasuilton@gmail.com>',
  },
  preview: {
    open: { 
      app: 'microsoft-edge-dev'
    }
  }
});

// const transport = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "697fe1e485d538",
//     pass: "23e5c70301f85d"
//   }
// });

export class NodemailerMailAdapter implements MailAdapter {
  async sendEmail({ subject, type, comment, screenshot }: MailAdapterData) {
    await email.send({
      template: 'feedback',
      locals: {
        subject,
        type,
        comment,
        screenshot
      },
    });
  }
}