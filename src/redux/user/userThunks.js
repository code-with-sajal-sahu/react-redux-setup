import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllRecipes = createAsyncThunk("user/get-recipes", async () => {
  try {

    const response = await fetch("https://dummyjson.com/recipes")
    const result = await response.json();
    return result;

  } catch (error) {
    console.error("Error getAllRecipes: ", error)
  }
});
