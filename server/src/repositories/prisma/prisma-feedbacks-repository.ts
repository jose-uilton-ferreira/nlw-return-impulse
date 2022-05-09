import { prisma } from "../../prisma";
import { FeedbacksRepository, FeedbacksRepositoryData } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: FeedbacksRepositoryData) {
    const { type, comment, screenshot } = data;

    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    });
  }
}