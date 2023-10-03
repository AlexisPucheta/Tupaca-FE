import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "./tasks/taskApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import modalReducer from "./modal/modalSlice"

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([taskApi.middleware]),
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
