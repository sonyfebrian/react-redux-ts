import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toastError,toastSuccess } from '../../components/ToastifyConfig';
import { IProductListForm, IProductListState, IUpdateProductListActionProps, ApiStatus} from '../../types/productList';
import { createProductListApi, deleteProductListApi, updateProductListApi, getProductLists } from '../../services/productService';




const initialState: IProductListState = {
    list: [],
    listStatus: ApiStatus.ideal,
    createProductListFormStatus: ApiStatus.ideal,
    updateProductListFormStatus: ApiStatus.ideal,
  };
  
  export const getProductListsAction = createAsyncThunk(
    "user/getProductListsAction",
    async () => {
      const response = await getProductLists();
      return response.data;
    }
  );
  
  export const createProductListAction = createAsyncThunk(
    "user/createProductListAction",
    async (data: IProductListForm) => {
      const response = await createProductListApi(data);
      return response.data;
    }
  );
  
  export const deleteProductListAction = createAsyncThunk(
    "user/deleteProducListAction",
    async (id: number) => {
      await deleteProductListApi(id);
      return id;
    }
  );
  
  export const updateProductListAction = createAsyncThunk(
    "user/updateProductListAction",
    async ({ id, data }: IUpdateProductListActionProps) => {
      const response = await updateProductListApi(id, data);
      return response.data;
    }
  );
  
  const productListSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
      resetCreateListStatus: (state) => {
        state.createProductListFormStatus = ApiStatus.ideal;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(getProductListsAction.pending, (state) => {
        state.listStatus = ApiStatus.loading;
      });
      builder.addCase(getProductListsAction.fulfilled, (state, action) => {
        state.listStatus = ApiStatus.ideal;
        state.list = action.payload;
      });
      builder.addCase(getProductListsAction.rejected, (state) => {
        state.listStatus = ApiStatus.error;
      });
      builder.addCase(createProductListAction.pending, (state) => {
        state.createProductListFormStatus = ApiStatus.loading;
      });
      builder.addCase(createProductListAction.fulfilled, (state) => {
        state.createProductListFormStatus = ApiStatus.success;
        toastSuccess("User created");
      });
      builder.addCase(createProductListAction.rejected, (state) => {
        state.createProductListFormStatus = ApiStatus.error;
        toastSuccess("Error while creating user");
      });
      builder.addCase(deleteProductListAction.fulfilled, (state, action) => {
        const newList = state.list.filter((x) => x.id !== action.payload);
        state.list = newList;
      });
      builder.addCase(updateProductListAction.pending, (state) => {
        state.updateProductListFormStatus = ApiStatus.loading;
      });
      builder.addCase(updateProductListAction.fulfilled, (state) => {
        state.updateProductListFormStatus = ApiStatus.ideal;
        toastSuccess("User updated");
      });
      builder.addCase(updateProductListAction.rejected, (state) => {
        state.updateProductListFormStatus = ApiStatus.error;
        toastError("Error while updating user");
      });
    },
  });
  
  export default productListSlice.reducer;
  export const { resetCreateListStatus } = productListSlice.actions;
  