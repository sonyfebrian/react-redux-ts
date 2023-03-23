export interface IProductList {
    id:number;
    plu: string;
    name: string;
  }

  export enum ApiStatus {
    "loading",
    "ideal",
    "success",
    "error",
  }

  export interface IProductListState {
    list: IProductList[];
    listStatus: ApiStatus;
    createProductListFormStatus: ApiStatus;
    updateProductListFormStatus: ApiStatus;
  }

  export interface IProductListForm {
    plu:string;
    name: string;
  }

  export interface IUpdateProductListActionProps {
    id: number;
    data: IProductListForm;
  }