import { configureStore } from "@reduxjs/toolkit";
import stacksReducer from "./stacksSlice";
import componentsReducer from "./componentsSlice";

export const store = configureStore({
  reducer: {
    stacks: stacksReducer,
    components: componentsReducer,
  },
});
