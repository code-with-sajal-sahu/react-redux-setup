import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IUserProfile } from "../../../types/redux";
import { handleError } from "../../../utils";
import { getApiHandler, postApiHandler } from "../../../config/DataService";
import Api from "../../../config/Api";

// Example async login thunk
export const login = createAsyncThunk<
  { user: IUserProfile; token: string },
  { email: string; password: string },
  { rejectValue: unknown }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    // call real API
    const resp = await postApiHandler<{ user: IUserProfile; token: string }>(
      Api.LOGIN,
      credentials
    );
    if (resp?.status === 200) {
      return resp.data;
    }
    return rejectWithValue(resp);
  } catch (err: unknown) {
    const message = handleError(err);
    return rejectWithValue(message);
  }
});


export const getProfile = createAsyncThunk(
  "user/get-profile",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await getApiHandler<IUserProfile>(Api.PROFILE);
      if (resp?.status === 200) {
        return resp.data;
      }
      return rejectWithValue(resp);
    } catch (error: unknown) {
      const err = handleError(error);
      return rejectWithValue(err);
    }
  }
);