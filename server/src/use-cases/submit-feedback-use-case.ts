import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository, FeedbacksRepositoryData } from "../repositories/feedbacks-repository";

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(data: FeedbacksRepositoryData) {
    const { type, comment, screenshot } = data;

    if (!type) {
      throw new Error('Argument "type" is missing.');
    }

    if (!comment) {
      throw new Error('Argument "comment" is missing.')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    });

    await this.mailAdapter.sendEmail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo de feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" style="max-width: 100%;" />` : '',
        `</div>`
      ].join('')
    });
  }
}