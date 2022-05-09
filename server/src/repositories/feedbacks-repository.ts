export interface FeedbacksRepositoryData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbacksRepositoryData) => Promise<void>;
}