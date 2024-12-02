import { configureStore } from "@reduxjs/toolkit";
import Settings from "./features/settings";
import Chat from "./features/chat";

export const makeStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      Settings,
      Chat,
    },
    preloadedState,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
