import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "middleware/api";

const initialState = {
  components: [],
  component: {},
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const getComponents = createAsyncThunk(
  "components/getComponents",
  async (thunkAPI) => {
    try {
      const response = await api.get("components", {});
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

export const getComponent = createAsyncThunk(
  "components/getComponent",
  async (thunkAPI, componentId) => {
    try {
      const response = await api.get(`components/${componentId}`, {});
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

export const componentsSlice = createSlice({
  name: "components",
  initialState,
  reducers: {},
  extraReducers: {
    [getComponents.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
      state.components = payload;
    },
    [getComponent.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
      state.component = payload;
    },
  },
});

export const selectComponents = (state) => state.components.components;
export const selectComponentsByIds = (componentIds) => (state) =>
  state.components.components.filter((component) =>
    componentIds.includes(component.id)
  );
  
export default componentsSlice.reducer;
