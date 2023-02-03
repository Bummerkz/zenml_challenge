import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "middleware/api";

const initialState = {
  stacks: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const getStacks = createAsyncThunk(
  "stacks/getStacks",
  async (thunkAPI) => {
    try {
      const response = await api.get("stacks", {});
      if (response.status === 200 && response.data) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const stackSlice = createSlice({
  name: "stacks",
  initialState,
  reducers: {},
  extraReducers: {
    [getStacks.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
      state.stacks = payload;
    },
  },
});

export const selectStacks = (state) => state.stacks.stacks;

export default stackSlice.reducer;
