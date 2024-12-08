import config from '@/config/config';
import { Article, Response } from '@/types';
import { axios } from '@/utils/custom-axios';

const API_URL = config.API_URL;

export type CreateArticleDto = {
  articleManagerId: number;
  writerPenname: string;
  title: string;
  content: string;
};

const getAll = () => {
  return axios.get<Response<Article[]>>(`${API_URL}/article`);
};

const getById = (articleId: number) => {
  return axios.get<Response<Article>>(`${API_URL}/article/${articleId}`);
};

const getAllTagAssignToArticle = (articleId: number) => {
  return axios.get<Response<number[]>>(`${API_URL}/article/${articleId}/tag`);
};

const create = (createArticleDto: CreateArticleDto) => {
  return axios.post<Response<Article>>(`${API_URL}/article`, createArticleDto);
};

const assignTag = (articleId: number, tagId: number) => {
  return axios.post<void>(`${API_URL}/article/tag`, { articleId, tagId });
};

const removeTag = (articleId: number, tagId: number) => {
  return axios.post<void>(`${API_URL}/article/tag/delete`, {
    articleId,
    tagId,
  });
};

const remove = (articleId: number) => {
  return axios.delete<void>(`${API_URL}/article/${articleId}`);
};

export const articleService = {
  getAll,
  create,
  assignTag,
  remove,
  getById,
  getAllTagAssignToArticle,
  removeTag,
};
