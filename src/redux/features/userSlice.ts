import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";

interface iState {
  user: {
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}
const initialState: iState = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  errorMessage: null,
};

export const createUser = createAsyncThunk(
  "user/create",
  async ({ email, password }: { email: string; password: string }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);
export const userSignIn = createAsyncThunk(
  "user/logout",
  async ({ email, password }: { email: string; password: string }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser :(state,action:PayloadAction<string | null>)=>{
      state.user.email = action.payload
    },
    setLoading:(state,action:PayloadAction<boolean>)=>{
      state.isLoading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.email = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.error.message!;
      })
      .addCase(userSignIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.email = action.payload;
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.error.message!;
      });
  },
});
export const {setUser,setLoading} = userSlice.actions
export default userSlice.reducer;
