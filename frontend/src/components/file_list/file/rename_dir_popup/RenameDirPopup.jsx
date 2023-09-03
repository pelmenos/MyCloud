import './RenameDirPopup.css'
import React, { useState } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { usePatchFolderMutation } from '../../../../store/api/api'
import { useSelector } from 'react-redux'

const RenameDirPopup = () => {
    const [dirName, setDirName] = useState('')
    const { popupRenameDisplay, popupRenameId } = useSelector(state => state.files)
    const { AuthTokens } = useSelector(state => state.user)
    const { setPopupRename } = useActions()
    const [patchFolderQuery] = usePatchFolderMutation()

    function patchFolder() {
        patchFolderQuery({ name: dirName, token: AuthTokens.access, id: popupRenameId })
            .then((response) => {
                setPopupRename({ display: 'none', id: null })
                setDirName('')
            })

    }

    return (
        <div className='popup fade' onClick={(e) => setPopupRename({ display: 'none', id: null })} style={{ display: popupRenameDisplay }}>
            <div className='popup_content' onClick={(e) => e.stopPropagation()}>
                <div className='popup_header'>
                    <div className='popup_title'>Изменить название папки</div>
                    <div className='popup_close' onClick={(e) => setPopupRename({ display: 'none', id: null })}>X</div>
                </div>
                <input className='popup_input' type='text' placeholder='Введите новое название папки...' value={dirName} onChange={(e) => setDirName(e.target.value)}></input>
                <button className="popup_submit" onClick={() => patchFolder()}>Переименовать</button>
            </div>
        </div>
    )
}

export default RenameDirPopup