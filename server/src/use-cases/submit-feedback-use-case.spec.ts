import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendEmail: sendEmailSpy }
);

describe('Submit feedback', () => {
  it('should be able submit a feedback', async() => {
    await expect(submitFeedbackUseCase.execute({
      type: 'BUG',
      comment: 'Deu ruim!!!',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalled();
  });

  it('shoud not be able submit a feedback with a invalid screenshot', async() => {
    await expect(submitFeedbackUseCase.execute({
      type: 'BUG',
      comment: 'Deu ruim!!!',
      screenshot: 'image.png'
    })).rejects.toThrow();
  });

  it('should not be able submit a feedback without type', async() => {
    await expect(submitFeedbackUseCase.execute({
      type: '',
      comment: 'Deu ruim!!!',
    })).rejects.toThrow();
  });

  it('should not be able submit a feedback without comment', async() => {
    await expect(submitFeedbackUseCase.execute({
      type: 'BUG',
      comment: ''
    })).rejects.toThrow();
  })
})