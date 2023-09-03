import { createSlice } from "@reduxjs/toolkit";


export const filesSlice = createSlice({
    name: 'files',
    initialState: {
        previousDirs: [],
        currentDir: { id: '', name: "" },
        popupCreateDisplay: 'none',
        popupRenameDisplay: 'none',
        popupRenameId: null,
    },
    reducers: {
        setPopupCreateDisplay: (state, action) => {
            state.popupCreateDisplay = action.payload
        },
        setPopupRename: (state, action) => {
            state.popupRenameDisplay = action.payload.display
            state.popupRenameId = action.payload.id
        },
        setDir: (state, action) => {
            state.previousDirs.push({ ...state.currentDir })
            state.currentDir.id = action.payload.id
            state.currentDir.name = action.payload.name
        },
        setDirForCrumb: (state, action) => {
            state.previousDirs = state.previousDirs.slice(0, action.payload.prev_dir_id)
            state.currentDir.id = action.payload.id
            state.currentDir.name = action.payload.name
        },
        backDir: (state) => {
            let el = { ...state.previousDirs.pop() }
            state.currentDir.id = el.id
            state.currentDir.name = el.name
        },
    }
})