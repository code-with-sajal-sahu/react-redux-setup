import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({ serializableCheck: false });

    if (import.meta.env.MODE === "development") {
      import("redux-logger").then(({ createLogger }) => {
        middlewares.push(createLogger());
      });
    }

    return middlewares;
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat([logger]),
  devTools: import.meta.env.MODE !== "production",
});
const persistor = persistStore(store);

export { store, persistor };

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
