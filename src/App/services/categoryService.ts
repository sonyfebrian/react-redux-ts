import httpService from './httpService'
import {ApiCategory} from './ApiCategory';
import { ICategory, ICategoryForm } from '../types/category';

export const getCategoryList = async function () {
  return await httpService.get<ICategory[]>(ApiCategory.category);
};

export const createCategoryApi = async (data: ICategoryForm) => {
  return await httpService.post<ICategory>(ApiCategory.category, data);
};

export const deleteCategoryApi = async (id: number) => {
  const url = `${ApiCategory.category}/${id}`;
  return await httpService.delete(url);
};

export const updateCategoryApi = async (id: number, data: ICategoryForm) => {
  const url = `${ApiCategory.category}/${id}`;
  return await httpService.put(url, data);
};




