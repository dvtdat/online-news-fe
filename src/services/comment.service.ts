import config from '@/config/config';
import { Comment } from '@/types';
import { axios } from '@/utils/custom-axios';

const API_URL = config.API_URL;

export type CreateCommentDto = {
  articleId: number;
  guestId: number;
  content: string;
};

export type UpvoteCommentDto = {
  articleId: number;
  commentId: number;
  guestId: number;
};

const getAll = () => {
  return axios.get<Comment[]>(`${API_URL}/comment`);
};
const create = (createCommentDto: CreateCommentDto) => {
  return axios.post<Comment>(`${API_URL}/comment`, createCommentDto);
};

const upvote = (upvoteCommentDto: UpvoteCommentDto) => {
  return axios.post<void>(`${API_URL}/comment/upvote`, upvoteCommentDto);
};

const addManagerToComment = (
  articleId: number,
  commentId: number,
  managerId: number,
) => {
  return axios.post<void>(`${API_URL}/comment/assign-manager`, {
    articleId,
    commentId,
    managerId,
  });
};

const remove = (commentId: number) => {
  return axios.delete<void>(`${API_URL}/comment/${commentId}`);
};

export const commentService = {
  getAll,
  create,
  upvote,
  addManagerToComment,
  remove,
};
