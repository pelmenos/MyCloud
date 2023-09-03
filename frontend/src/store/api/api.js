import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../utils/Constants'
import { failureUploadFile, setUploadProgress, successUploadFile } from '../uploader/uploader.slice';
import axios from 'axios';


export const folderApi = createApi({
    reducerPath: 'folderApi',
    tagTypes: ['Folder', 'Files'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),
    endpoints: (builder) => ({
        getFolders: builder.query({
            query: (data) => ({
                url: 'folders/',
                headers: {
                    'Authorization': 'Bearer ' + data.token
                },
                params: { parent: data.dir_id }
            }),
            providesTags: ['Folder']
        }),
        createFolder: builder.mutation({
            query: (data) => ({
                body: data,
                url: 'folders/',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + data.token
                },
            }),
            invalidatesTags: ['Folder'],
        }),

        getFiles: builder.query({
            query: (data) => ({
                url: 'files/',
                headers: {
                    'Authorization': 'Bearer ' + data.token
                },
                params: { parent: data.dir_id }
            }),
            providesTags: ['Files']
        }),

        uploadFiles: builder.mutation({
            queryFn: async (file, { getState, dispatch }) => {
                const current_dir_id = getState().files.currentDir.id
                const token = getState().user.AuthTokens.access

                const formPayload = new FormData()
                formPayload.append('files', file.file)
                try {
                    let res = await axios({
                        baseURL: API_URL,
                        url: 'files/',
                        method: 'post',
                        data: formPayload,
                        params: { 'parent': current_dir_id },
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        },
                        onUploadProgress: progress => {
                            const { loaded, total } = progress
                            const percentageProgress = Math.floor((loaded / total) * 100)
                            dispatch(setUploadProgress({ id: file.id, progress: percentageProgress }))
                        },
                    })
                    dispatch(successUploadFile(file.id))
                    return { data: res.data }
                } catch (err) {
                    dispatch(failureUploadFile(file.id))
                    return {
                        error: {
                            status: err.response?.status,
                            data: err.response?.data || err.message,
                        },
                    }
                }
            },
            invalidatesTags: ['Files', 'Folder'],
        }),
        deleteFile: builder.mutation({
            query: (data) => ({
                url: `files/${data.id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + data.token,
                },
                params: { parent: data.dir_id },
            }),
            invalidatesTags: ['Files', 'Folder'],
        }),
        deleteFolder: builder.mutation({
            query: (data) => ({
                url: `folders/${data.id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + data.token,
                },
            }),
            invalidatesTags: ['Files', 'Folder'],
        }),
        patchFolder: builder.mutation({
            query: (data) => ({
                url: `folders/${data.id}`,
                method: 'PATCH',
                body: { name: data.name },
                headers: {
                    'Authorization': 'Bearer ' + data.token,
                },
            }),
            invalidatesTags: ['Files', 'Folder'],
        }),
    }),
})



export const { useGetFoldersQuery, useCreateFolderMutation,
    useGetFilesQuery, useUploadFilesMutation,
    useDeleteFileMutation, useDeleteFolderMutation,
    usePatchFolderMutation } = folderApi