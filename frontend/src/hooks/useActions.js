import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as userActions from '../store/user/user.actions'
import { userSlice } from "../store/user/user.slice"
import { filesSlice } from "../store/files/files.slice"
import { uploaderSlice } from "../store/uploader/uploader.slice"

const rootActions = {
    ...userActions,
    ...userSlice.actions,
    ...filesSlice.actions,
    ...uploaderSlice.actions,
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions, dispatch)
        , [dispatch])
}