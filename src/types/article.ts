export enum ArticleStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export type Article = {
  id: number;
  articleManagerId: number;
  writerPenname: string;
  title: string;
  content: string;
  createdAt: Date;
  submittedAt: Date;
  publishedAt: Date;
  status: ArticleStatus;
};
