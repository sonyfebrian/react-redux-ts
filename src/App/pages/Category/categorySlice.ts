import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toastError,toastSuccess } from '../../components/ToastifyConfig';
import { ICategoryForm , ICategoryState, IUpdateCategoryActionProps, ApiStatus} from '../../types/category';
import { createCategoryApi, deleteCategoryApi, updateCategoryApi, getCategoryList } from '../../services/categoryService';



const initialState: ICategoryState = {
  list: [],
  listStatus: ApiStatus.ideal,
  createCategoryFormStatus: ApiStatus.ideal,
  updateCategoryFormStatus: ApiStatus.ideal,
};

export const getCategoryListAction = createAsyncThunk(
  "user/getCategoryListAction",
  async () => {
    const response = await getCategoryList();
    return response.data;
  }
);

export const createCategoryAction = createAsyncThunk(
  "user/createCategoryAction",
  async (data: ICategoryForm) => {
    const response = await createCategoryApi(data);
    return response.data;
  }
);

export const deleteCategoryAction = createAsyncThunk(
  "user/deleteCategoryAction",
  async (id: number) => {
    await deleteCategoryApi(id);
    return id;
  }
);

export const updateCategoryAction = createAsyncThunk(
  "user/updateCategoryAction",
  async ({ id, data }: IUpdateCategoryActionProps) => {
    const response = await updateCategoryApi(id, data);
    return response.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCreateListStatus: (state) => {
      state.createCategoryFormStatus = ApiStatus.ideal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoryListAction.pending, (state) => {
      state.listStatus = ApiStatus.loading;
    });
    builder.addCase(getCategoryListAction.fulfilled, (state, action) => {
      state.listStatus = ApiStatus.ideal;
      state.list = action.payload;
    });
    builder.addCase(getCategoryListAction.rejected, (state) => {
      state.listStatus = ApiStatus.error;
    });
    builder.addCase(createCategoryAction.pending, (state) => {
      state.createCategoryFormStatus = ApiStatus.loading;
    });
    builder.addCase(createCategoryAction.fulfilled, (state) => {
      state.createCategoryFormStatus = ApiStatus.success;
      toastSuccess("User created");
    });
    builder.addCase(createCategoryAction.rejected, (state) => {
      state.createCategoryFormStatus = ApiStatus.error;
      toastSuccess("Error while creating user");
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      const newList = state.list.filter((x) => x.id !== action.payload);
      state.list = newList;
    });
    builder.addCase(updateCategoryAction.pending, (state) => {
      state.updateCategoryFormStatus = ApiStatus.loading;
    });
    builder.addCase(updateCategoryAction.fulfilled, (state) => {
      state.updateCategoryFormStatus = ApiStatus.ideal;
      toastSuccess("User updated");
    });
    builder.addCase(updateCategoryAction.rejected, (state) => {
      state.updateCategoryFormStatus = ApiStatus.error;
      toastError("Error while updating user");
    });
  },
});

export default categorySlice.reducer;
export const { resetCreateListStatus } = categorySlice.actions;
