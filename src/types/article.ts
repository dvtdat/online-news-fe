export enum ArticleStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export type Article = {
  articleid: number;
  articleManagerId: number;
  writerpenname: string;
  title: string;
  content: string;
  createdat: Date;
  submittedat: Date;
  publishedat: Date;
  status: ArticleStatus;
};
