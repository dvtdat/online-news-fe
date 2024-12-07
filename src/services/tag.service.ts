import config from '@/config/config';
import { Tag, Response } from '@/types';
import { axios } from '@/utils/custom-axios';

const API_URL = config.API_URL;
export type CreateTagDto = {
  name: string;
  description: string;
  articleManagerId: number;
};

const getAll = () => {
  return axios.get<Response<Tag[]>>(`${API_URL}/tag`);
};
const create = (createTagDto: CreateTagDto) => {
  return axios.post<Response<Tag>>(`${API_URL}/tag`, createTagDto);
};

const remove = (tagId: number) => {
  return axios.delete<Response<void>>(`${API_URL}/tag/${tagId}`);
};

export const tagService = {
  getAll,
  create,
  remove,
};
