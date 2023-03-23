export interface IProduct {
    id: number;
    product_id:number;
    code:string;
    name: string;
    qty:number;
    price:number;
  }

export enum ApiStatus {
    "loading",
    "ideal",
    "success",
    "error",
  }
  export interface IProductState {
    list: IProduct[];
    listStatus: ApiStatus;
    createProductFormStatus: ApiStatus;
    updateProductFormStatus: ApiStatus;
  }

  export interface IProductForm {
    name: string;
    code:string;
    qty:number;
    price:number;
  }

  export interface IUpdateProductActionProps {
    id: number;
    data: IProductForm;
  }
  