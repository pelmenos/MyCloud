import './CreateDirPopup.css'
import React, { useState } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useCreateFolderMutation } from '../../../../store/api/api'
import { useSelector } from 'react-redux'

const Popup = () => {
    const [dirName, setDirName] = useState('')
    const { popupCreateDisplay, currentDir } = useSelector(state => state.files)
    const { AuthTokens } = useSelector(state => state.user)
    const { setPopupCreateDisplay } = useActions()

    const [createFolder] = useCreateFolderMutation()

    function submit() {
        createFolder({ name: dirName, token: AuthTokens.access, parent: currentDir.id })
            .then((response) => {
                setPopupCreateDisplay('none')
                setDirName('')
            })

    }

    return (
        <div className='popup fade' onClick={(e) => setPopupCreateDisplay('none')} style={{ display: popupCreateDisplay }}>
            <div className='popup_content' onClick={(e) => e.stopPropagation()}>
                <div className='popup_header'>
                    <div className='popup_title'>Создать новую папку</div>
                    <div className='popup_close' onClick={(e) => setPopupCreateDisplay('none')}>X</div>
                </div>
                <input className='popup_input' type='text' placeholder='Введите название папки...' value={dirName} onChange={(e) => setDirName(e.target.value)}></input>
                <button className="popup_submit" onClick={() => submit()}>Создать папку</button>
            </div>
        </div>
    )
}

export default Popup