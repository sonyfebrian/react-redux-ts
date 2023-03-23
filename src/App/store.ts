import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import { authenticationReducer } from './pages/Login/loginSlice';
import categoryReducer from './pages/Category/categorySlice'
import { usersListReducer } from './pages/Login/userSlice'
import productReducer from './pages/Product/productSlice'
import productsReducer from './pages/ProductList/productListSlice'

 

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    category: categoryReducer,
    user:usersListReducer,
    product:productReducer,
    products:productsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
