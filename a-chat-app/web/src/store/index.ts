import { configureStore } from "@reduxjs/toolkit";
import { rehydrateStore } from "./middleware/rehydrateStore";
// async apis
import { mainApi } from "./api";
//slices
import authSlice from "./slice/auth";
import alertSlice from "./slice/alert";
import chatSlice from "./slice/chat";
import friendSlice from "./slice/friend";
import roomSlice from "./slice/room";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    alert: alertSlice,
    chat: chatSlice,
    friend: friendSlice,
    room: roomSlice,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  preloadedState: { auth: rehydrateStore() },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});
