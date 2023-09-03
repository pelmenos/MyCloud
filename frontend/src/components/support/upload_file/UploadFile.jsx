import './UploadFile.css'
import { useRef } from 'react'
import { useActions } from '../../../hooks/useActions'


const UploadFile = () => {
    const filePiker = useRef(null)
    const { setUploadedFiles } = useActions()


    const handleChange = (e) => {
        const files = e.target.files
        setUploadedFiles(files)
        e.target.value = null

    }

    const handleClick = () => {
        filePiker.current.click()
    }

    return (
        <>
            <input className='hidden' ref={filePiker} type='file' multiple onChange={(e) => handleChange(e)}></input>
            <div className='upload_file_button' onClick={handleClick}>Upload files</div>
        </>
    )
}

export default UploadFile