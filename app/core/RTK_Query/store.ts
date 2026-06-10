import { configureStore } from "@reduxjs/toolkit";
import { coreApi } from "@/app/core/RTK_Query/core-api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [coreApi.reducerPath]: coreApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(coreApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
