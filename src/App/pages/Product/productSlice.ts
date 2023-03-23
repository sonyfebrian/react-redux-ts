import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toastError,toastSuccess } from '../../components/ToastifyConfig';
import { IProductForm, IProductState,IUpdateProductActionProps,ApiStatus } from '../../types/product';
import { createProductApi, deleteProductApi, updateProductApi, getProductList } from '../../services/productService';



const initialState: IProductState = {
    list: [],
    listStatus: ApiStatus.ideal,
    createProductFormStatus: ApiStatus.ideal,
    updateProductFormStatus: ApiStatus.ideal,
  };
  
  export const getProductListAction = createAsyncThunk(
    "user/getProductListAction",
    async () => {
      const response = await getProductList();
      return response.data;
    }
  );
  
  export const createProductAction = createAsyncThunk(
    "user/createProductAction",
    async (data: IProductForm) => {
      const response = await createProductApi(data);
      return response.data;
    }
  );
  
  export const deleteProductAction = createAsyncThunk(
    "user/deleteProductAction",
    async (id: number) => {
      await deleteProductApi(id);
      return id;
    }
  );
  
  export const updateProductAction = createAsyncThunk(
    "user/updateProductAction",
    async ({ id, data }: IUpdateProductActionProps) => {
      const response = await updateProductApi(id, data);
      return response.data;
    }
  );
  
  const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      resetCreateListStatus: (state) => {
        state.createProductFormStatus = ApiStatus.ideal;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(getProductListAction.pending, (state) => {
        state.listStatus = ApiStatus.loading;
      });
      builder.addCase(getProductListAction.fulfilled, (state, action) => {
        state.listStatus = ApiStatus.ideal;
        state.list = action.payload;
      });
      builder.addCase(getProductListAction.rejected, (state) => {
        state.listStatus = ApiStatus.error;
      });
      builder.addCase(createProductAction.pending, (state) => {
        state.createProductFormStatus = ApiStatus.loading;
      });
      builder.addCase(createProductAction.fulfilled, (state) => {
        state.createProductFormStatus = ApiStatus.success;
        toastSuccess("User created");
      });
      builder.addCase(createProductAction.rejected, (state) => {
        state.createProductFormStatus = ApiStatus.error;
        toastSuccess("Error while creating user");
      });
      builder.addCase(deleteProductAction.fulfilled, (state, action) => {
        const newList = state.list.filter((x) => x.id !== action.payload);
        state.list = newList;
      });
      builder.addCase(updateProductAction.pending, (state) => {
        state.updateProductFormStatus = ApiStatus.loading;
      });
      builder.addCase(updateProductAction.fulfilled, (state) => {
        state.updateProductFormStatus = ApiStatus.ideal;
        toastSuccess("User updated");
      });
      builder.addCase(updateProductAction.rejected, (state) => {
        state.updateProductFormStatus = ApiStatus.error;
        toastError("Error while updating user");
      });
    },
  });
  
  export default productSlice.reducer;
  export const { resetCreateListStatus } = productSlice.actions;
  