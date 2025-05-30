import config from '@/config/config';
import { User } from '@/types';
import { axios } from '@/utils/custom-axios';

import { CreateUserDto } from './user.service';

const API_URL = config.API_URL;

const login = (username: string, password: string) => {
  return axios.post<User>(`${API_URL}/auth/login`, {
    username,
    password,
  });
};

const signup = (createUserDto: CreateUserDto) => {
  return axios.post<User>(`${API_URL}/auth/signup`, createUserDto);
};

export const authService = {
  login,
  signup,
};
