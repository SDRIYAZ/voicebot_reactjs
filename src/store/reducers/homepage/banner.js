import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import urls from "../../../urls/urls";
// import BraneGet from "../../../library/BraneGet";


export const getHomepageBanner = createAsyncThunk(
  "getHomepageBanner",
  async (object, { getState, rejectWithValue }) => {
    console.log(getState());
    try {
      const { BASE_URL } = urls;
      const { data } = await axios.get(`${BASE_URL}/homepage_banner`);
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const bannerSlice = createSlice({
  name: "homepage_banner_slice",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  extraReducers: {
    [getHomepageBanner.pending]: (state, action) => {
      state.loading = true;
    },
    [getHomepageBanner.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getHomepageBanner.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default bannerSlice;