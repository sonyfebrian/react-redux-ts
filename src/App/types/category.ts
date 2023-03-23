export interface ICategory {
    id: number;
    name: string;
  }

export enum ApiStatus {
    "loading",
    "ideal",
    "success",
    "error",
  }
  export interface ICategoryState {
    list: ICategory[];
    listStatus: ApiStatus;
    createCategoryFormStatus: ApiStatus;
    updateCategoryFormStatus: ApiStatus;
  }

  export interface ICategoryForm {
    name: string;
  }

  export interface IUpdateCategoryActionProps {
    id: number;
    data: ICategoryForm;
  }
  