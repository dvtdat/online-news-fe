export type Comment = {
  articleId: number;
  id: number;
  guestId: number;
  content: string;
  isApproved: boolean;
  createdAt: Date;
};
