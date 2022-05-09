export interface MailAdapterData {
  subject: string;
  body: string;
}

export interface MailAdapter {
  sendEmail: (data: MailAdapterData) => Promise<void>;
}