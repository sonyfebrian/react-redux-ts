import httpService from './httpService'
import { ApiProduct, ApiProductList} from './ApiProduct';
import { IProduct, IProductForm } from '../types/product';
import { IProductList, IProductListForm } from '../types/productList';

export const getProductList = async function () {
  return await httpService.get<IProduct[]>(ApiProduct.category);
};

export const createProductApi = async (data: IProductForm) => {
  return await httpService.post<IProduct>(ApiProduct.category, data);
};

export const deleteProductApi = async (id: number) => {
  const url = `${ApiProduct.category}/${id}`;
  return await httpService.delete(url);
};

export const updateProductApi = async (id: number, data: IProductForm) => {
  const url = `${ApiProduct.category}/${id}`;
  return await httpService.put(url, data);
};

//list product
export const getProductLists = async function () {
  return await httpService.get<IProductList[]>(ApiProductList.product);
};

export const createProductListApi = async (data: IProductListForm) => {
  return await httpService.post<IProductList>(ApiProductList.product, data);
};

export const deleteProductListApi = async (id: number) => {
  const url = `${ApiProductList.product}/${id}`;
  return await httpService.delete(url);
};

export const updateProductListApi = async (id: number, data: IProductListForm) => {
  const url = `${ApiProductList.product}/${id}`;
  return await httpService.put(url, data);
};




