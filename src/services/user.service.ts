import config from '@/config/config';
import { User, Response } from '@/types';
import { axios } from '@/utils/custom-axios';

const API_URL = config.API_URL;

export type CreateUserDto = {
  name: string;
  username: string;
  password: string;
  email: string;
  role: string;
};

export type CreateAdminDto = {
  userId: number;
};

export type CreateWriterDto = {
  penname: string;
  userId: number;
  bio: string;
};

export type CreateGuestDto = {
  userId: number;
};

export type CreateCommunityManagerDto = {
  userId: number;
};

export type CreateArticleManagerDto = {
  userId: number;
  section: string;
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

const createAdmin = (createAdminDto: CreateAdminDto) => {
  return axios.post<Response<void>>(`${API_URL}/user/admin`, createAdminDto);
};

const createWriter = (createWriterDto: CreateWriterDto) => {
  return axios.post<Response<void>>(`${API_URL}/user/writer`, createWriterDto);
};

const createGuest = (createGuestDto: CreateGuestDto) => {
  return axios.post<Response<void>>(`${API_URL}/user/guest`, createGuestDto);
};

const createCommunityManager = (
  createCommunityManagerDto: CreateCommunityManagerDto,
) => {
  return axios.post<Response<void>>(
    `${API_URL}/user/community-manager`,
    createCommunityManagerDto,
  );
};

const createArticleManager = (
  createArticleManagerDto: CreateArticleManagerDto,
) => {
  return axios.post<Response<void>>(
    `${API_URL}/user/article-manager`,
    createArticleManagerDto,
  );
};

const isAdmin = (userId: number) => {
  return axios.get<Response<boolean>>(`${API_URL}/user/${userId}/admin`);
};

const isCommunityManager = (userId: number) => {
  return axios.get<Response<boolean>>(
    `${API_URL}/user/${userId}/community-manager`,
  );
};

const isArticleManager = (userId: number) => {
  return axios.get<Response<boolean>>(
    `${API_URL}/user/${userId}/article-manager`,
  );
};

const isWriter = (userId: number) => {
  return axios.get<Response<boolean>>(`${API_URL}/user/${userId}/writer`);
};

export const userService = {
  getAll,
  getById,
  create,
  createAdmin,
  createWriter,
  createGuest,
  createCommunityManager,
  createArticleManager,
  isAdmin,
  isCommunityManager,
  isArticleManager,
  isWriter,
};
