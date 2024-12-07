import config from '@/config/config';
import { Tag, Response } from '@/types';
import { axios } from '@/utils/custom-axios';

const API_URL = config.API_URL;

const getAll = () => {
  return axios.get<Response<Tag[]>>(`${API_URL}/tag`);
};
const create = (tag: Tag) => {
  return axios.post<Response<Tag>>(`${API_URL}/tag`, tag);
};

const remove = (tagId: number) => {
  return axios.delete<Response<void>>(`${API_URL}/tag/${tagId}`);
};

export const tagService = {
  getAll,
  create,
  remove,
};
