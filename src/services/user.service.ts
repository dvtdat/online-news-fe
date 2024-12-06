import { User, Response } from '@/types';
import { axios } from '@/utils/custom-axios';

const API_URL = 'http://localhost:5000';

export type CreateUserDto = {
  name: string;
  username: string;
  password: string;
  email: string;
  role: string;
};

const getAll = () => {
  return axios.get<Response<User[]>>(`${API_URL}/user`);
};

const getById = (userId: number) => {
  return axios.get<Response<User>>(`${API_URL}/user/${userId}`);
};

const create = (createUserDto: CreateUserDto) => {
  return axios.post<Response<User>>(`${API_URL}/user`, createUserDto);
};

export const userService = {
  getAll,
  getById,
  create,
};
