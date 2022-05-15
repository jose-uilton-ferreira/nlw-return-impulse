export interface MailAdapterData {
  subject: string;
  type: string;
  comment: string;
  screenshot?: string;
}

export interface MailAdapter {
  sendEmail: (data: MailAdapterData) => Promise<void>;
}