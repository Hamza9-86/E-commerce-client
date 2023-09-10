import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../utils/axiosClient";

export const fetchCategories = createAsyncThunk("api/categories", async () => {
  try {
    const response = await axiosClient.get("/categories?populate=image");
    return response.data.data; //ye data action.payload me jaega in reducer
  } catch (error) {
    return Promise.reject(error);
  }
});
const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    categories: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    }); //jo data milega usse apni state change kr lenge categories ki
    //categories yani jo initial state banaya hua h empty array wo change hoga
  },
});

export default categorySlice.reducer;
