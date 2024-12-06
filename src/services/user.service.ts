import { User, Response } from '@/types';
import { axios } from '@/utils/custom-axios';

const API_URL = 'http://localhost:5000';

const getAll = () => {
  return axios.get<Response<User[]>>(`${API_URL}/user`);
};

export const userService = {
  getAll,
};
