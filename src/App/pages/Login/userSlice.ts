import { createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { getUserList } from '../../services/userService';
import { IUser } from '../../types/user';
import { RootState } from '../../store';

export interface IUsersList {
  isLoadingUsers: boolean;
  userList?: IUser[];
 
}
const initialState: IUsersList = { isLoadingUsers: false };
export const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    start: (state) => {
      return {
        ...state,
        isLoadingUsers: true,
      };
    },
    success: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        ...action.payload,
        isLoadingUsers: false,
      };
    },
    error: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoadingUsers: false,
      };
    },
  },
});
export const fetchUsers = () => async (dispatch: any) => {
  dispatch(start());
  try {
    const userLists = await getUserList();
    dispatch(success({userList : userLists}));
  } catch (err:any) {
    dispatch(error(err));
  }
};
export const { start, success, error } = userListSlice.actions;
export const selectUserLists = (state: RootState) => state.user;
export const usersListReducer = userListSlice.reducer;