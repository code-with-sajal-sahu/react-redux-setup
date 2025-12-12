import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthState, IUserProfile } from "../../../types/redux";
import { login } from "./authService";

const initialState: IAuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
    setUser(state, action: PayloadAction<IUserProfile>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed";
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
