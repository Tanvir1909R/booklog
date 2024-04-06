import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from '../redux/features/userSlice'
import booksApi from "./api/booksApi";
import bookReducer from './features/bookSlice'

const store = configureStore({
  reducer: {
    user:userReducer,
    books:bookReducer,
    [booksApi.reducerPath]:booksApi.reducer,
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(booksApi.middleware)
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;
