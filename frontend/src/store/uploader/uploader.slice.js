import { createSlice } from "@reduxjs/toolkit";
import { modifyFiles } from "../../utils/Uploader.utils";


export const uploaderSlice = createSlice({
    name: 'uploader',
    initialState: {
        fileProgress: {},
        isDisplay: 'none',
    },
    reducers: {
        setUploadProgress: (state, action) => {
            state.fileProgress = {
                ...state.fileProgress,
                [action.payload.id]: {
                    ...state.fileProgress[action.payload.id],
                    progress: action.payload.progress,
                }
            }
        },
        setUploadedFiles: (state, action) => {
            state.fileProgress = {
                ...state.fileProgress,
                ...modifyFiles(state.fileProgress, action.payload)
            }
        },
        successUploadFile: (state, action) => {
            state.fileProgress = {
                ...state.fileProgress,
                [action.payload]: {
                    ...state.fileProgress[action.payload],
                    status: 1,
                },
            }
        },
        failureUploadFile: (state, action) => {
            state.fileProgress = {
                ...state.fileProgress,
                [action.payload]: {
                    ...state.fileProgress[action.payload],
                    status: 0,
                    progress: 0,
                },
            }
        },
        clearFileProgress: (state, action) => {
            state.fileProgress = {}
        },
        setDisplayUploader: (state, action) => {
            state.isDisplay = action.payload
        }
    }
})


export const {
    setUploadProgress,
    setUploadedFiles,
    successUploadFile,
    failureUploadFile,
    clearUploadedFiles
} = uploaderSlice.actions;