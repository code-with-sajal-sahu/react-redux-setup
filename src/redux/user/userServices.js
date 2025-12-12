import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllRecipes = createAsyncThunk("user/get-recipes", async () => {
  try {
    const response = await fetch("https://dummyjson.com/recipes");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error getAllRecipes: ", error);
  }
});

// export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
//   try {
//     // call real API
//     const resp = await axios.post("/api/auth/login", credentials);
//     return resp.data;
//   } catch (err) {
//     const message = err?.response?.data?.message || err.message || "Login failed";
//     return rejectWithValue(message);
//   }
// });

// how to use
// const handleSubmit = async () => {
//   const resultAction = await dispatch(login({ email, password }));
//   if (login.fulfilled.match(resultAction)) {
//     // success
//   } else {
//     // handle error (resultAction.payload or error)
//   }
// };
