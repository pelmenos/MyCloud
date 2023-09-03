import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/user.slice";
import { folderApi } from "./api/api";
import { filesSlice } from "./files/files.slice";
import { uploaderSlice } from "./uploader/uploader.slice";

const reducers = combineReducers({
    user: userSlice.reducer,
    files: filesSlice.reducer,
    uploader: uploaderSlice.reducer,
    [folderApi.reducerPath]: folderApi.reducer,
})

export const store = configureStore({
    reducer: reducers,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(folderApi.middleware),
}) 